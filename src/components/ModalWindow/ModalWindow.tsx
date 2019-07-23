import * as React from 'react';
import ReactDOM from 'react-dom';
import './modalWindow.scss';
import Button from "../Button";
import {MODAL_TYPE} from "../../constants";
import {hideContextMenu, hideModal, updateEditorState} from "../../actions";
import {connect} from "react-redux";
import {IModalWindow} from "../../types/interfaces";
import "./Draft.css";
import FunctionalEditor from "../FunctionalEditor";
import {convertToRaw} from "draft-js";

const settings = {
    [MODAL_TYPE.ADD]: {
        name: "Добавить задачу",
        buttonLabel: "Добавить",
        labelForDescription: "Добавьте описание: "
    },
    [MODAL_TYPE.CHANGE]: {
        name: "Просмотр задачи",
        buttonLabel: "Изменить",
        labelForDescription: "Описание задачи: "
    }
};

class ModalWindow extends React.Component<IModalWindow> {
    el: any = document.querySelector('#root');
    $textarea: any = React.createRef();
    $inputHeader: any = React.createRef();

    componentDidMount(): void {
        const { type } = this.props;

        if (type === MODAL_TYPE.ADD) {
      //      this.$textarea.current.focus();
        }
    }

    handleClick = () => {
        const { addTask, changeTask, type, id, isShowContextMenu, hideContextMenu, editorState, hideModal } = this.props;

        const draftJsConfig = convertToRaw(editorState.getCurrentContent());
        const taskDescription = draftJsConfig.blocks[0].text || '';

        hideModal();

        if ((type === MODAL_TYPE.CHANGE) && changeTask && id) {
           console.log(id, taskDescription, draftJsConfig);
           changeTask(id, this.$inputHeader.current.value, taskDescription, draftJsConfig);

           return;
        }

        if (addTask) {
            addTask(taskDescription, this.$inputHeader.current.value, draftJsConfig);
        }

        if (isShowContextMenu) {
            hideContextMenu();
        }
    };

    renderLayer() {
        const { hideModal } = this.props;

        return ReactDOM.createPortal(<div onClick={hideModal} className={"layer"} />, this.el);
    }

    render() {
        const { header, description, taskHeader, className, buttonLabel, draftJsConfig, type } = this.props;

        console.log(header);
        return (
            <React.Fragment>
                {this.renderLayer()}
                <div className={"modal__wrapper"}>
                    <div className={className}>
                            <h2>{settings[type].name}</h2>
                            <p>Заголовок задачи:</p>
                            <input ref={this.$inputHeader} defaultValue={header} className="modal__input" type={"text"} />
                            <p>{settings[type].labelForDescription}</p>
                            <FunctionalEditor draftJsConfig={draftJsConfig} />
                            <Button type={"form-apply"} onClick={this.handleClick} content={ settings[type].buttonLabel} />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    updateEditorState: (data: any) => dispatch(updateEditorState(data)),
    hideContextMenu: () => dispatch(hideContextMenu()),
    hideModal: () => dispatch(hideModal())
});

const mapStateToProps = (state: any) => ({
    editorState: state.app.editorState,
    isShowContextMenu: state.app.isShowContextMenu,
    configDraftJs: state.app.configDraftJs,
    type: state.modalWindow.type,
    header: state.task.header,
    draftJsConfig: state.task.draftJsConfig,
    id: state.task.id
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalWindow);