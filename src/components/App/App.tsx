import * as React from 'react';
import nanoid from "nanoid";
import { connect } from "react-redux";

import ModalWindow from "../ModalWindow";
import Task from "../Task";
import Note from "../Note";
import Loader from "../Loader";
import ContextMenu from "../ContextMenu";
import LeftBar from "../LeftBar";
import Calendar from "../Calendar";
import LabelDate from "../common/LabelDate";

import {
    deepclone, isEmptyArray,
    transformDate, transformDateArray,
    transformId, transformToGroupConfig, updateDateArray
} from "../../utils/utils";
import {MODAL_TYPE, QUERY_TYPE} from "../../constants";
import {
    addTask,
    deleteTask,
    hideModal,
    makeDoneTask,
    changeTask,
    showModal,
    initLoad, openContextMenu, hideContextMenu, saveTasks, selectDay, fetchSelectedDays
} from "../../actions";
import "./app.scss";
import "react-day-picker/lib/style.css";
import {IProps, ITask} from "../../types/interfaces";
import {changeTypeModal} from "../../actions/modalWindow";
import TaskList from "../TaskList";
import SearchInput from "../common/SearchInput/SearchInput";

interface AppState {
    forScroll: number;
}

const mapStateToProps = (state: any) => ({
    tasks: state.app.tasks,
    isShowModal: state.app.isShowModal,
    config: state.app.config,
    currentId: state.app.currentId,
    childrenNumber: state.app.childrenNumber,
    selectedDay: state.app.selectedDay,
    listSelectedDays: state.app.listSelectedDays,
    isShowLoader: state.app.isShowLoader,
    isShowContextMenu: state.app.isShowContextMenu,
    editorState: state.app.editorState,
    x: state.app.x,
    y: state.app.y,
    currentMonth: state.app.currentMonth,
    groupConfig: state.app.groupConfig,
    taskDate: state.task.taskDate,
    queryType: state.app.queryType,
    isVisible: state.calendar.isVisible,
    searchConfig: state.app.searchConfig,
    searchValue: state.app.searchValue
});

const mapDispatchToProps = (dispatch: any) => ({
    showModal: () => dispatch(showModal()),
    hideModal: () => dispatch(hideModal()),
    deleteTask: (data: object) => dispatch(deleteTask(data)),
    changeTask: (data: object) => dispatch(changeTask(data)),
    makeDoneTask: (data: any) => dispatch(makeDoneTask(data)),
    addTask: (data: object) => dispatch(addTask(data)),
    initLoad: (id: string) => dispatch(initLoad(id)),
    openContextMenu: (data: object) => dispatch(openContextMenu(data)),
    hideContextMenu: () => dispatch(hideContextMenu()),
    saveTasks: (data: any) => dispatch(saveTasks(data)),
    changeTypeModal: (data: string) => dispatch(changeTypeModal(data)),
    fetchSelectedDays: (data: Date[]) => dispatch(fetchSelectedDays(data))
});

class App extends React.Component<IProps> {
    $taskContainer = React.createRef<HTMLDivElement>();

    state: AppState = {
        forScroll: 0
    };

    componentDidMount(): void {
        const { initLoad, selectedDay } = this.props;

        const id = transformDate(selectedDay);

        document.addEventListener('click', this.handleClickOut);

        initLoad(id);
    }

    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<{}>, snapshot?: any): void {
        const prevForScroll = deepclone(prevState);

        if (this.state.forScroll !== prevForScroll) {
            this.scrollToBottom()
        }
    }

    addTask = () => {
       const { currentId, showModal, changeTypeModal } = this.props;

        if (!currentId ) {
            return;
        }

        changeTypeModal(MODAL_TYPE.ADD);
        showModal();
    };

    handleClickOut = (event: any) => {
        const { hideContextMenu, isShowContextMenu } = this.props;

        const elem = document.elementFromPoint(event.clientX, event.clientY);
        const last = elem ? elem.closest('.context-menu') : null;

        if (!last && isShowContextMenu) {
            hideContextMenu();
        }
    };

    scrollToBottom = () => {
        if (this.$taskContainer && this.$taskContainer.current) {
            this.$taskContainer.current.scrollTo(0, this.$taskContainer.current.scrollHeight);
        }
    };

    renderTasks() {
        const { tasks } = this.props;

        if (!tasks) {
            return null;
        }

        return tasks.map((value: any, index: number) => {
            return (
                <Task
                    key={value.id}
                    id={value.id}
                    idDay={value.idDay}
                    index={index}
                    header={value.header}
                    description={value.description}
                    draftJsConfig={value.draftJsConfig || {}}
                    isDone={value.isDone}
                />
            );
        })
    }

    renderTaskLists() {
        const { config, searchValue } = this.props;
        let _config = deepclone(config);
        const regExp = new RegExp(searchValue, 'i');

        if (searchValue) {
            _config = _config.filter((value: any) => {
                if (regExp.test(value.header)) {
                    return value;
                }
            })
        }

        _config = transformToGroupConfig(_config);

        if (Object.keys(_config).length === 0) {
            return <Note
                header='Нет задач'
                content='Не найдено задач'
            />;
        }

        return _config.map((value: any, index: number) => {
           return (
               <TaskList
                   key={index}
                   name={value.idDay}
                   tasks={value.tasks}
               />
           )
        });
    }

    render() {
        const { isShowModal, isShowLoader, isShowContextMenu, x, y, tasks, queryType, isVisible } = this.props;

        return (
            <React.Fragment>
                <LeftBar/>
                { isShowContextMenu ? <ContextMenu openModal={this.addTask}  x={x} y={y} /> : null }
                { isShowLoader ? <Loader /> : null}
                <div className="main-container" style={isShowLoader ? {filter: 'blur(6px)'} : {}}>
                <div className={"container"}>
                    <LabelDate />
                    <div onClick={this.addTask} className={"button-add"}>Добавить +</div>
                </div>
                <Calendar />
                { (tasks.length === 0) && (queryType !== QUERY_TYPE.ALL) ? <Note
                    header='Нет задач'
                    content='В выбранный день нет задач'
                /> : null }
                { queryType !== QUERY_TYPE.ALL ? <div ref={this.$taskContainer}  className={"task-container"}>
                    {this.renderTasks()}
                </div> : null }
                { queryType === QUERY_TYPE.ALL ? <div ref={this.$taskContainer} className={"task-container"}>
                    <SearchInput />
                    {this.renderTaskLists()}
                </div> : null }
                { isShowModal ? <ModalWindow className={"modal"} /> : null}
                </div>
            </React.Fragment>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);