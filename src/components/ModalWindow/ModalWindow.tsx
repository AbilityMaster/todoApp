import * as React from 'react';
import ReactDOM from 'react-dom';
import './modalWindow.scss';
import Button from "../Button";
import TextArea from "../TextArea";
import {MODAL_TYPE} from "../../constants";
import {hideContextMenu, updateEditorState} from "../../actions";
import {connect} from "react-redux";

interface Props {
 addTask?(data: string): void;
 onBlur?(data: boolean): void;
 header?: string;
 description?: string;
 value?: string;
 type?: string;
 className?: string;
 textAreaClassName?: string;
 buttonLabel?: string;
 id?: string;
 changeTask?: (id: string, data: string) => void;
 editorState: any;
 updateEditorState: (data: any) => void;
 isShowContextMenu: boolean;
 hideContextMenu: () => void;
}

interface State {
    isShowTextarea: boolean;
}

class ModalWindow extends React.Component<Props> {

    state: State= {
        isShowTextarea: true
    };

    el: any;
    $textarea: any;

    constructor(props: Props) {
        super(props);
        this.el = document.querySelector('#root');
        this.$textarea = React.createRef();
    }

    enterPressed = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            this.onClick();
        }
    };

    componentDidMount(): void {
        const { type } = this.props;

        if (type === MODAL_TYPE.ADD) {
            this.$textarea.current.focus();
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
        const { addTask, changeTask, type, id, isShowContextMenu, hideContextMenu } = this.props;

        if ((type === MODAL_TYPE.CHANGE) && changeTask && id) {
           changeTask(id, this.$textarea.current.value())
        }

        if (addTask) {
            addTask(this.$textarea.current.value());
        }

        if (isShowContextMenu) {
            hideContextMenu();
        }
    };

    renderLayer() {
        return ReactDOM.createPortal(<div onClick={this.onBlur} className={"layer"} />, this.el);
    }

    onChange = (editorState: any) => {
        const { updateEditorState } = this.props;
        console.log(editorState.toJS());
        updateEditorState({editorState});
    };

    render() {
        const { header, description, value, type, className, textAreaClassName, buttonLabel } = this.props;

        return (
            <React.Fragment>
                {this.renderLayer()}
                <div className={className}>
                    <div className={"modal__box"}>
                        <h2>{header}</h2>
                        <p>{description}</p>
                        <TextArea type={type} value={value} ref={this.$textarea} className={textAreaClassName} />
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
    isShowContextMenu: state.app.isShowContextMenu
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalWindow);