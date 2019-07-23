import * as React from 'react';
import ReactDOM from 'react-dom';
import './modalWindow.scss';
import Button from "../Button";
import {MODAL_TYPE} from "../../constants";
import {hideContextMenu, updateEditorState} from "../../actions";
import {connect} from "react-redux";
import {IModalWindow} from "../../types/interfaces";
import "./Draft.css";
import FunctionalEditor from "../FunctionalEditor";
import {convertToRaw} from "draft-js";

interface State {
    isShowTextarea: boolean;
}

class ModalWindow extends React.Component<IModalWindow> {
    state: State= {
        isShowTextarea: true
    };

    el: any = document.querySelector('#root');
    $textarea: any = React.createRef();
    $inputHeader: any = React.createRef();

    enterPressed = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            this.onClick();
        }
    };

    componentDidMount(): void {
        const { type } = this.props;

        if (type === MODAL_TYPE.ADD) {
      //      this.$textarea.current.focus();
        }

        document.addEventListener('keypress', this.enterPressed);
    }

    componentWillUnmount(): void {
        document.removeEventListener('keypress', this.enterPressed);
    }

    onBlur = () => {
        const { onBlur } = this.props;

        if (onBlur) {
            onBlur(false);
        }
    };

    onClick = () => {
        const { addTask, changeTask, type, id, isShowContextMenu, hideContextMenu, editorState } = this.props;

        const draftJsConfig = convertToRaw(editorState.getCurrentContent());
        const taskDescription = draftJsConfig.blocks[0].text || '';

        if ((type === MODAL_TYPE.CHANGE) && changeTask && id) {
           changeTask(id, this.$textarea.current.value())
        }

        if (addTask) {
            addTask(taskDescription, this.$inputHeader.current.value, draftJsConfig);
        }

        if (isShowContextMenu) {
            hideContextMenu();
        }
    };

    renderLayer() {
        return ReactDOM.createPortal(<div onClick={this.onBlur} className={"layer"} />, this.el);
    }

    render() {
        const { header, description, taskHeader, className, buttonLabel, draftJsConfig } = this.props;

        return (
            <React.Fragment>
                {this.renderLayer()}
                <div className={"modal__wrapper"}>
                    <div className={className}>
                            <h2>{header}</h2>
                            <p>Заголовок задачи:</p>
                            <input ref={this.$inputHeader} value={taskHeader} className="modal__input" type={"text"} />
                            <p>{description}</p>
                            <FunctionalEditor draftJsConfig={draftJsConfig} />
                            {/*<TextArea type={type} value={value} ref={this.$textarea} className={textAreaClassName} />*/}
                            <Button type={"form-apply"} onClick={this.onClick} content={ buttonLabel ? buttonLabel : "Добавить"} />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    updateEditorState: (data: any) => dispatch(updateEditorState(data)),
    hideContextMenu: () => dispatch(hideContextMenu())
});

const mapStateToProps = (state: any) => ({
    editorState: state.app.editorState,
    isShowContextMenu: state.app.isShowContextMenu,
    configDraftJs: state.app.configDraftJs
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalWindow);