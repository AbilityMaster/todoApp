import * as React from 'react';
import ReactDOM from 'react-dom';
import Button from "../Button";
import {connect} from "react-redux";
import {convertToRaw} from "draft-js";

import FunctionalEditor from "../FunctionalEditor";
import {getFormatDate} from "../../utils/utils";
import CalendarPopup from "../common/CalendarPopup";
import {saveCoords, showCalendar} from "../../actions/modalWindow";

import {hideContextMenu, hideModal, selectDay, updateEditorState} from "../../actions";
import {MODAL_TYPE} from "../../constants";
import {IModalWindow} from "../../types/interfaces";
import "./Draft.css";
import './modalWindow.scss';

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
        const { addTask, changeTask, type, id, isShowContextMenu, hideContextMenu, editorState, hideModal, selectedDayByPopup } = this.props;

        const draftJsConfig = convertToRaw(editorState.getCurrentContent());
        const taskDescription = draftJsConfig.blocks[0].text || '';

        hideModal();
        selectDay(selectedDayByPopup);

        if ((type === MODAL_TYPE.CHANGE) && changeTask && id) {
           changeTask(id, this.$inputHeader.current.value, taskDescription, draftJsConfig);

           return;
        }

        if (addTask) {
            addTask(taskDescription, this.$inputHeader.current.value, draftJsConfig, selectedDayByPopup);
        }

        if (isShowContextMenu) {
            hideContextMenu();
        }
    };

    openCalendar = (event: any) => {
        const { saveCoords, showCalendar } = this.props;
        event.persist();

        saveCoords({ x: event.clientX, y: event.clientY });

        showCalendar();
    };

    renderLayer() {
        const { hideModal } = this.props;

        return ReactDOM.createPortal(<div onClick={hideModal} className={"layer"} />, this.el);
    }

    render() {
        const { header, className, draftJsConfig, type, selectedDay, isShowCalendar, selectedDayByPopup, hideModal } = this.props;

        return (
            <React.Fragment>
                {this.renderLayer()}
                { isShowCalendar ? <CalendarPopup /> : null }
                <div className={"modal__wrapper"}>
                    <div className={className}>
                        <div onClick={hideModal} className={"modal__close"}>✕</div>
                        <h2 className={"modal__header"}>{settings[type].name}</h2>
                        <p className={"modal__date"}>На { selectedDayByPopup ? getFormatDate(selectedDayByPopup) : getFormatDate(selectedDay)}
                            <i onClick={(event) => this.openCalendar(event)} title={"Изменить дату"} className="demo-icon icon-calendar">&#xe800;</i>
                        </p>
                        <p>Заголовок задачи:</p>
                        <input placeholder={"Введите заголовок..."} ref={this.$inputHeader} defaultValue={ type === MODAL_TYPE.CHANGE ? header : ''} className="modal__input" type={"text"} />
                        <p>{settings[type].labelForDescription}</p>
                        <FunctionalEditor draftJsConfig={type === MODAL_TYPE.CHANGE ? draftJsConfig : null} />
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
    hideModal: () => dispatch(hideModal()),
    saveCoords: (data: object) => dispatch(saveCoords(data)),
    showCalendar: () => dispatch(showCalendar())
});

const mapStateToProps = (state: any) => ({
    editorState: state.app.editorState,
    isShowContextMenu: state.app.isShowContextMenu,
    configDraftJs: state.app.configDraftJs,
    type: state.modalWindow.type,
    header: state.task.header,
    draftJsConfig: state.task.draftJsConfig,
    id: state.task.id,
    selectedDay: state.app.selectedDay,
    isShowCalendar: state.modalWindow.isShowCalendar,
    selectedDayByPopup: state.modalWindow.selectedDayByPopup
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalWindow);