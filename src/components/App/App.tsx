import * as React from 'react';
import DayPicker, {DayModifiers} from 'react-day-picker';
import nanoid from "nanoid";
import { connect } from "react-redux";

import ModalWindow from "../ModalWindow";
import Task from "../Task";
import Button from "../Button";
import Note from "../Note";
import Loader from "../Loader";

import {
    deepclone,
    getFormatDate,
    transformDate,
    transformDateArray,
    transformId
} from "../../utils/utils";
import {MODAL_TYPE, MONTHS, WEEKDAYS_LONG, WEEKDAYS_SHORT} from "../../constants";
import {
    addTask,
    deleteTask,
    hideModalForAdd,
    makeDoneTask,
    changeTask,
    openModalForAdd,
    selectDay,
    setId,
    initLoad, initPost, openContextMenu, selectDayMemory, hideContextMenu
} from "../../actions";
import "./app.scss";
import "react-day-picker/lib/style.css";
import {IProps, ITask} from "../../interfaces/interfaces";
import ContextMenu from "../ContextMenu";

interface AppState {
    forScroll: number;
}

class App extends React.Component<IProps> {
    $taskContainer = React.createRef<HTMLDivElement>();

    state: AppState = {
        forScroll: 0
    };

    openModal = () => {
       const { currentId, openModalForAdd } = this.props;

        if (!currentId ) {
            return;
        }

        openModalForAdd();
    };

    handleClickOut = (event: any) => {
        const { hideContextMenu, isShowContextMenu } = this.props;

        const elem = document.elementFromPoint(event.clientX, event.clientY);
        const last = elem ? elem.closest('.context-menu') : null;

        if (!last && isShowContextMenu) {
            hideContextMenu();
        }
    };

    componentDidMount(): void {
        const { initLoad } = this.props;

        document.addEventListener('click', this.handleClickOut);
        initLoad();
    }

    makeDoneTask = (id: string, checked: boolean): void => {
        const { config, currentId, makeDoneTask } = this.props;

        const _config = deepclone(config);
        const task = _config.find((value: any) => (value.id === id));

        if (task) {
            task.isDone = checked;
        }

        makeDoneTask( { config: _config, currentId, id, checked });
    };

    addTask = (data: string): void => {
      const { config, currentId, listSelectedDays, addTask } = this.props;
      const _config: ITask [] = deepclone(config);

      if (data === '') {
          return;
      }

      _config.push({
          idDay: currentId,
          id: nanoid(7),
          description: data,
          isDone: false
      });

      const tasks = _config.filter(value => (value.idDay === currentId));

      if (!listSelectedDays.find( value => (transformDate(value) === currentId))) {
          listSelectedDays.push(transformId(currentId));
      }

      this.setState({ forScroll: tasks.length });
      addTask({config: _config, isShowModal: false, listSelectedDays});
    };

    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<{}>, snapshot?: any): void {
        const prevForScroll = deepclone(prevState);

        if (this.state.forScroll !== prevForScroll) {
            this.scrollToBottom()
        }
    }

    onBlur = (data: boolean): void => {
        const { hideModalForAdd } = this.props;

        hideModalForAdd();
    };

    isEmptyDay() {
        const { currentId, config } = this.props;

        if (!config) {
            return true;
        }

        const tasks = config.filter((value) => {
            if (value.idDay === currentId) {
                return value;
            }
        });

        if (!tasks) {
            return true;
        }

        return (tasks.length === 0);
    }

    handleDayClick = (day : Date) => {
        const { currentId, setId, selectDay } = this.props;

        const id = transformDate(day);

        if (id !== currentId) {
            setId(id);
        }

        selectDay(day);
    };

    changeTask = (id: string, data: string): void => {
        if (data === '') {
            return;
        }

        const { currentId, config, changeTask } = this.props;
        const _config = deepclone(config);
        const task = _config.find((value: any) => (value.id === id));
        task.description = data;

        changeTask({ config: _config, idDay: currentId, idTask: id, data });
    };

    deleteTask = (id: string) => {
        const { currentId, config, listSelectedDays, deleteTask } = this.props;
        const _config = deepclone(config);

        const indexDel = _config.findIndex((value: any) => (value.id === id));
        _config.splice(indexDel, 1);

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
    };

    scrollToBottom = () => {
        if (this.$taskContainer && this.$taskContainer.current) {
            this.$taskContainer.current.scrollTo(0, this.$taskContainer.current.scrollHeight);
        }
    };

    renderTasks() {
        const { config, currentId } = this.props;

        const tasks = config.filter( value => {
            if (value.idDay === currentId) {
                return value;
            }
        });

        if (!tasks) {
            return null;
        }

        return tasks.map((value, index) => {
            return (
                <Task
                    key={value.id}
                    id={value.id}
                    index={index}
                    description={value.description}
                    deleteTask={this.deleteTask}
                    changeTask={this.changeTask}
                    makeDoneTask={this.makeDoneTask}
                    isDone={value.isDone}
                />
            );
        })
    }

    get modifiers() {
        const { listSelectedDays, config } = this.props;

        const dates = transformDateArray(listSelectedDays);
        let tasksPerDay = [];
        const doneAllTasks = [];
        const doneNotAllTasks = [];

        for (let i = 0; i < dates.length; i++) {
            let counter = 0;
            tasksPerDay = config.filter(value => (value.idDay === dates[i]));

            for (let i = 0; i < tasksPerDay.length; i++) {
                if (tasksPerDay[i].isDone) {
                    counter++;
                }
            }

            if (tasksPerDay.length === counter) {
                doneAllTasks.push(transformId(dates[i]));
            } else {
                doneNotAllTasks.push(transformId(dates[i]));
            }
        }

        return {
            highlighted: doneNotAllTasks,
            done: doneAllTasks
        };
    }

    static get calcSelectedStyles() {
        return ` .DayPicker-Day--highlighted {
                    background-color: #df5e30;
                    color: white;
                    position: relative;
                    border-radius: 0!important;
                 }
                 
                 .DayPicker-Day--highlighted:hover {
                       background: #a2340d!important;
                 }
               
                 .DayPicker-Day--done{
                    background-color: #348c1e;
                    color: white;
                    position: relative;
                    border-radius: 0!important;
                 }
                 
                 .DayPicker-Day--done:hover {
                 background:   #386f2a!important;
                 }
             `;
    }

    handleContextMenuDayClick = (day: Date, modifiers: DayModifiers, e: React.MouseEvent<HTMLDivElement>) => {
        const { openContextMenu, selectDayMemory } = this.props;

        e.preventDefault();
        openContextMenu({ x: `${e.clientX}px`, y: `${e.clientY}px` });
        selectDayMemory(day);
    };

    handleMonthChange = (day: Date) => {
        console.warn(day);
    };

    render() {
        const { selectedDay, isShowModal, isShowLoader, isShowContextMenu, x, y } = this.props;

        return (
            <React.Fragment>
                { isShowContextMenu ? <ContextMenu openModal={this.openModal}  x={x} y={y} /> : null }
                { isShowLoader ? <Loader /> : null}
                <div style={isShowLoader ? {filter: 'blur(6px)'} : {}}>
                <div className="app-name" onContextMenu={(event: any) => console.warn(event.keyCode)}>ToDo App</div>
                <div className={"container"}>
                    <style>{App.calcSelectedStyles}</style>
                    <DayPicker
                        months={MONTHS}
                        weekdaysLong={WEEKDAYS_LONG}
                        weekdaysShort={WEEKDAYS_SHORT}
                        className={"center"}
                        onMonthChange={this.handleMonthChange}
                        onDayClick={this.handleDayClick}
                        onContextMenu={this.handleContextMenuDayClick}
                        modifiers={this.modifiers}
                        // initialMonth={new Date(2017, 3)}
                        selectedDays={
                            [
                                selectedDay,
                            ]
                        }
                    />
                    <Button onClick={this.openModal} content={"Добавить задачу"} />
                </div>
                { (this.isEmptyDay()) ? <Note
                    header='Нет задач'
                    content='В выбранный день нет задач'
                /> : null }
                { (!this.isEmptyDay()) ? <div className={"task-container__header"}
                >Задачи на {selectedDay ? getFormatDate(selectedDay) : null }</div> : null }
                <div ref={this.$taskContainer} className={"task-container"}>
                    {this.renderTasks()}
                </div>
                { isShowModal ?
                    <ModalWindow
                        type={MODAL_TYPE.ADD}
                        textAreaClassName={"modal__textarea"}
                        className={"modal"}
                        header="Добавить задачу"
                        description={"Опишите задачу"}
                        onBlur={this.onBlur}
                        addTask={this.addTask}
                    /> : null}
    </div>
            </React.Fragment>
        )
    }
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
   x: state.app.x,
   y: state.app.y
});

const mapDispatchToProps = (dispatch: any) => ({
    openModalForAdd: () => dispatch(openModalForAdd()),
    hideModalForAdd: () => dispatch(hideModalForAdd()),
    selectDay: (data: object) => dispatch(selectDay(data)),
    selectDayMemory: (data: Date) => dispatch(selectDayMemory(data)),
    deleteTask: (data: object) => dispatch(deleteTask(data)),
    changeTask: (data: object) => dispatch(changeTask(data)),
    makeDoneTask: (data: any) => dispatch(makeDoneTask(data)),
    addTask: (data: object) => dispatch(addTask(data)),
    setId: (id: string) => dispatch(setId(id)),
    initLoad: () => dispatch(initLoad()),
    initPost: (config: object) => dispatch(initPost(config)),
    openContextMenu: (data: object) => dispatch(openContextMenu(data)),
    hideContextMenu: () => dispatch(hideContextMenu())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);