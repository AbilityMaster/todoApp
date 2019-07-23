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
    deepclone,
    transformDate,
    transformId
} from "../../utils/utils";
import {MODAL_TYPE} from "../../constants";
import {
    addTask,
    deleteTask,
    hideModal,
    makeDoneTask,
    changeTask,
    showModal,
    initLoad, openContextMenu, hideContextMenu, saveTasks
} from "../../actions";
import "./app.scss";
import "react-day-picker/lib/style.css";
import {IProps, ITask} from "../../types/interfaces";
import {changeTypeModal} from "../../actions/modalWindow";

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
    currentMonth: state.app.currentMonth
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
    changeTypeModal: (data: string) => dispatch(changeTypeModal(data))
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

    openModal = () => {
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

    makeDoneTask = (id: string, checked: boolean): void => {
        const { config, currentId, makeDoneTask, selectedDay, saveTasks } = this.props;

        const _config = deepclone(config);
        const idDay = transformDate(selectedDay);
        // eslint-disable-next-line array-callback-return
        const tasks = _config.filter((value: any) => {
                if (value.idDay === idDay) {
                    return value;
                }
        });

        const task = tasks.find((value: any) => (value.id === id));

        if (task) {
            task.isDone = checked;
        }

        makeDoneTask( { config: _config, currentId, id, checked });
        saveTasks(tasks);
    };

    addTask = (data: string, header: string, draftJsConfig: any): void => {
      const { config, currentId, listSelectedDays, addTask, saveTasks } = this.props;

      const _config: ITask [] = deepclone(config);

      if (data === '') {
          return;
      }

      _config.push({
          idDay: currentId,
          id: nanoid(7),
          header: header,
          description: data,
          isDone: false,
          draftJsConfig: draftJsConfig
      });

      const tasks = _config.filter(value => (value.idDay === currentId));

      if (!listSelectedDays.find( value => (transformDate(value) === currentId))) {
          listSelectedDays.push(transformId(currentId));
      }

      this.setState({ forScroll: tasks.length });
      addTask({config: _config, isShowModal: false, listSelectedDays});
      saveTasks(tasks);
    };

    changeTask = (id: string, header: string, data: string, draftJsConfig: object): void => {
        console.log(id, header, data);
        if (data === '') {
            return;
        }

        const { currentId, config, changeTask, saveTasks } = this.props;
        const _config = deepclone(config);
        const task = _config.find((value: any) => (value.id === id));
        const idDay = task.idDay || '';

        const tasks = _config.filter((value: any) => {
           if (value.idDay === idDay) {
               return value;
           }
        });
        const _task = tasks.find((value: any) => (value.id === id));


        _task.header = header;
        _task.description = data;
        _task.draftJsConfig = draftJsConfig;

        changeTask({ config: _config, idDay: currentId, idTask: id, data, task: _task });
        saveTasks(tasks);
    };

    deleteTask = (id: string) => {
        const { currentId, config, listSelectedDays, deleteTask, saveTasks } = this.props;
        const _config = deepclone(config);

        const indexDel = _config.findIndex((value: any) => (value.id === id));
        _config.splice(indexDel, 1);

        // eslint-disable-next-line array-callback-return
        const tasks = _config.filter((value: any) => {
            if (value.idDay === currentId) {
                return value;
            }
        });

        if (tasks.length === 0) {
           const index = listSelectedDays.findIndex(value => (value === transformId(currentId)) );
           listSelectedDays.splice(index, 1);
        }

        deleteTask({
            config: _config,
            listSelectedDays,
            currentId,
            id
        });
        saveTasks(tasks);
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

        return tasks.map((value: any, index: any) => {
            return (
                <Task
                    key={value.id}
                    id={value.id}
                    index={index}
                    header={value.header}
                    description={value.description}
                    deleteTask={this.deleteTask}
                    makeDoneTask={this.makeDoneTask}
                    draftJsConfig={value.draftJsConfig || {}}
                    isDone={value.isDone}
                />
            );
        })
    }

    render() {
        const { isShowModal, isShowLoader, isShowContextMenu, x, y, tasks } = this.props;

        return (
            <React.Fragment>
                <LeftBar/>
                { isShowContextMenu ? <ContextMenu openModal={this.openModal}  x={x} y={y} /> : null }
                { isShowLoader ? <Loader /> : null}
                <div className="main-container" style={isShowLoader ? {filter: 'blur(6px)'} : {display: 'block'}}>
                <div className={"container"}>
                    <LabelDate />
                    <div onClick={this.openModal} className={"button-add"}>Добавить +</div>
                </div>
                <Calendar />
                { (tasks.length === 0) ? <Note
                    header='Нет задач'
                    content='В выбранный день нет задач'
                /> : null }
                <div ref={this.$taskContainer} className={"task-container"}>
                    {this.renderTasks()}
                </div>
                { isShowModal ?
                    <ModalWindow
                        className={"modal"}
                        addTask={this.addTask}
                        changeTask={this.changeTask}
                    /> : null}
                </div>
            </React.Fragment>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);