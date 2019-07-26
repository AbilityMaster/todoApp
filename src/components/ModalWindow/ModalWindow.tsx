import * as React from 'react';
import ReactDOM from 'react-dom';
import Button from "../Button";
import {connect} from "react-redux";
import {convertToRaw} from "draft-js";

import FunctionalEditor from "../FunctionalEditor";
import {
    deepclone,
    getFormatDate,
    transformDate,
    transformId,
    updateDateArray
} from "../../utils/utils";
import CalendarPopup from "../common/CalendarPopup";
import {saveCoords, showCalendar} from "../../actions/modalWindow";

import {
    hideContextMenu,
    hideModal,
    selectDay,
    saveTasks,
    fetchSelectedDays, changeTask, addTask
} from "../../actions";
import {MODAL_TYPE, QUERY_TYPE} from "../../constants";
import {IModalWindow, ITask} from "../../types/interfaces";
import "./Draft.css";
import './modalWindow.scss';
import nanoid from "nanoid";


const mapDispatchToProps = (dispatch: any) => ({
    hideContextMenu: () => dispatch(hideContextMenu()),
    hideModal: () => dispatch(hideModal()),
    saveCoords: (data: object) => dispatch(saveCoords(data)),
    showCalendar: () => dispatch(showCalendar()),
    saveTasks: (data: ITask []) => dispatch(saveTasks(data)),
    changeTask: (data: object) => dispatch(changeTask(data)),
    fetchSelectedDays: (data: Date[]) => dispatch(fetchSelectedDays(data)),
    addTask: (data: object) => dispatch(addTask(data))
});

const mapStateToProps = (state: any) => ({
    editorState: state.app.editorState,
    isShowContextMenu: state.app.isShowContextMenu,
    type: state.modalWindow.type,
    header: state.task.header,
    draftJsConfig: state.task.draftJsConfig,
    id: state.task.id,
    idDay: state.task.idDay,
    selectedDay: state.app.selectedDay,
    isShowCalendar: state.modalWindow.isShowCalendar,
    selectedDayByPopup: state.modalWindow.selectedDayByPopup,
    taskDate: state.task.taskDate,
    config: state.app.config,
    currentId: state.app.currentId,
    listSelectedDays: state.app.listSelectedDays
});

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

    detectDate = () => {
        const { selectedDay, selectedDayByPopup } = this.props;

        if (selectedDay && !selectedDayByPopup) {
            return selectedDay;
        }

        if (selectedDay && selectedDayByPopup) {
            return selectedDayByPopup
        }

        return selectedDay;
    };

    handleClick = () => {
        const { type, id, isShowContextMenu, hideContextMenu, editorState, hideModal, taskDate, selectedDayByPopup } = this.props;

        const draftJsConfig = convertToRaw(editorState.getCurrentContent());
        const taskDescription = draftJsConfig.blocks[0].text || '';

        hideModal();

        if (type === MODAL_TYPE.CHANGE) {
           const { currentId, config, changeTask, saveTasks, listSelectedDays, fetchSelectedDays } = this.props;

           if (taskDescription === '') {
               return;
           }

            const _config = deepclone(config);
            const task = _config.find((value: any) => (value.id === id));
            const idDay = task.idDay || '';

            const tasks = _config.filter((value: any) => {
                if (value.idDay === idDay) {
                    return value;
                }
            });

            const _task = tasks.find((value: any) => (value.id === id));

            let isChangedDate = false;


            const _oldDate = _task.idDay;

            if (_oldDate !== transformDate(taskDate)) {
                isChangedDate = true;
            }

            const updated = updateDateArray(listSelectedDays, _oldDate, transformDate(taskDate));

            fetchSelectedDays(updated);

            _task.idDay = transformDate(taskDate);
            _task.header = this.$inputHeader.current.value;
            _task.description = taskDescription;
            _task.draftJsConfig = draftJsConfig;

            changeTask({ config: _config, idDay: currentId, idTask: id, data: taskDescription, task: _task });
            if (tasks.length === 1 && isChangedDate) {
                saveTasks([]);
            } else {
                saveTasks(tasks);
            }

           return;
        }

        if (type === MODAL_TYPE.ADD) {
            const { config, currentId, listSelectedDays, addTask, saveTasks, selectedDay } = this.props;



            if (selectedDayByPopup) {
                selectDay(selectedDayByPopup);
            }

            const _config: ITask [] = deepclone(config);

            if (taskDescription === '') {
                return;
            }

            _config.push({
                idDay: transformDate(this.detectDate()),
                id: nanoid(7),
                header: this.$inputHeader.current.value,
                description: taskDescription,
                isDone: false,
                draftJsConfig: draftJsConfig
            });

            const tasks = _config.filter(value => (value.idDay === currentId));

            if (!listSelectedDays.find( value => (transformDate(value) === currentId))) {
                if (selectedDayByPopup) {
                    listSelectedDays.push(selectedDayByPopup);
                } else {
                    listSelectedDays.push(transformId(currentId));
                }
            }

           // this.setState({ forScroll: tasks.length });
            addTask({config: _config, isShowModal: false, listSelectedDays});
            saveTasks(tasks);
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
        const { header, className, draftJsConfig, type, isShowCalendar, hideModal } = this.props;

        return (
            <React.Fragment>
                {this.renderLayer()}
                { isShowCalendar ? <CalendarPopup /> : null }
                <div className={"modal__wrapper"}>
                    <div className={className}>
                        <div onClick={hideModal} className={"modal__close"}>✕</div>
                        <h2 className={"modal__header"}>{settings[type].name}</h2>
                        <p className={"modal__date"}>На { getFormatDate(this.detectDate())}
                            <i
                                onClick={(event) => this.openCalendar(event)}
                                title={"Изменить дату"}
                                className="demo-icon icon-calendar">&#xe800;
                            </i>
                        </p>
                        <p>Заголовок задачи:</p>
                        <input
                            placeholder={"Введите заголовок..."}
                            ref={this.$inputHeader}
                            defaultValue={ type === MODAL_TYPE.CHANGE ? header : ''}
                            className="modal__input" type={"text"}
                        />
                        <p>{settings[type].labelForDescription}</p>
                        <FunctionalEditor draftJsConfig={type === MODAL_TYPE.CHANGE ? draftJsConfig : null} />
                        <Button type={"form-apply"} onClick={this.handleClick} content={ settings[type].buttonLabel} />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalWindow);