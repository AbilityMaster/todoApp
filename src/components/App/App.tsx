import * as React from 'react';
import DayPicker from 'react-day-picker';
import nanoid from "nanoid";
import { connect } from "react-redux";

import ModalWindow from "../ModalWindow";
import TaskList from "../TaskList";
import Button from "../Button";
import Note from "../Note";
import Loader from "../Loader";

import {deepclone, getFormatDate, transformDate, transformId} from "../../utils/utils";
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
    initLoad, initPost
} from "../../actions";
import "./app.scss";
import "react-day-picker/lib/style.css";
import {IProps} from "../../interfaces/interfaces";

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

    componentDidMount(): void {
        const { initLoad } = this.props;

        initLoad();
    }

    makeDoneTask = (id: string, checked: boolean): void => {
        const { config, currentId, makeDoneTask } = this.props;

        const _config = JSON.parse(JSON.stringify(config));
        const configByDay = _config.find((value: { id: string; }) => (value.id === currentId));
        const tasks = configByDay ? configByDay.tasks : [];
        const task = tasks.find((value: { id: string; }) => (value.id === id));

        if (task) {
            task.isDone = checked;
        }

        makeDoneTask( { config: _config, currentId, id, checked });
    };

    addTask = (data: string): void => {
      const { config, currentId, listSelectedDays, addTask, initPost } = this.props;

      if (data === '') {
          return;
      }

      const existsDayConfig = config ? config.find(value => (value.id === currentId)) : null;
      const tasks = existsDayConfig ? existsDayConfig.tasks : [];

      const task: {id: string, description: string, isDone: false} = {
          id: nanoid(7),
          description: data,
          isDone: false
      };

      if (existsDayConfig) {
          tasks.push(task);
      } else {
          config.push({
              id: currentId,
              tasks: [ task ]
          });
      }

      if (!listSelectedDays.find( value => (transformDate(value) === currentId))) {
          listSelectedDays.push(transformId(currentId));
      }

      this.setState({ forScroll: tasks.length });
      addTask({config, isShowModal: false, listSelectedDays});
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

        const taskByDay = config.find((value) => (value.id === currentId));

        if (!taskByDay) {
            return true;
        }

        return (taskByDay.tasks.length === 0);
    }

    handleDayClick = (day : Date, { selected }: any) => {
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

        const configByDay = _config.find((value: { id: string, tasks: { id: string, description: string, isDone: boolean }[] }) => (value.id === currentId));
        const tasks = configByDay? configByDay.tasks : [];
        const task = tasks.find((value: { id: string, description: string, isDone: boolean }) => (value.id === id ));

        if (task) {
            task.description = data;
        }

        changeTask({ config: _config, idDay: currentId, idTask: id, data });
    };

    deleteTask = (id: string) => {
        const { currentId, config, listSelectedDays, deleteTask } = this.props;
        const _config = deepclone(config);

        const configByDay = _config.find((value: { id: string, tasks: { id: string, description: string, isDone: boolean }[] }) => (value.id === currentId));
        const tasks = configByDay ? configByDay.tasks : [];
        const forDel = tasks.findIndex((value: { id: string, description: string, isDone: boolean }) => (value.id === id ));

        tasks.splice(forDel, 1);

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

        const configByDay = config.find( value => (value.id === currentId));

        if (!configByDay) {
            return null;
        }

        return configByDay.tasks.map((value, index) => {
            return (
                <TaskList
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
        const { listSelectedDays } = this.props;

        return {
            highlighted: listSelectedDays
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
             `
    }

    render() {
        const { selectedDay, isShowModal, isShowLoader } = this.props;

        return (
            <React.Fragment>
                { isShowLoader ? <Loader /> : null}
                <div style={isShowLoader ? {filter: 'blur(6px)'} : {}}>
                <div className="app-name">ToDo App</div>
                <div className={"container"}>
                    <style>{App.calcSelectedStyles}</style>
                    <DayPicker
                        months={MONTHS}
                        weekdaysLong={WEEKDAYS_LONG}
                        weekdaysShort={WEEKDAYS_SHORT}
                        className={"center"}
                        onDayClick={this.handleDayClick}
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
   isShowModal: state.app.isShowModal,
   config: state.app.config,
   currentId: state.app.currentId,
   childrenNumber: state.app.childrenNumber,
   selectedDay: state.app.selectedDay,
   listSelectedDays: state.app.listSelectedDays,
   isShowLoader: state.app.isShowLoader
});

const mapDispatchToProps = (dispatch: any) => ({
    openModalForAdd: () => dispatch(openModalForAdd()),
    hideModalForAdd: () => dispatch(hideModalForAdd()),
    selectDay: (data: Date) => dispatch(selectDay(data)),
    deleteTask: (data: object) => dispatch(deleteTask(data)),
    changeTask: (data: object) => dispatch(changeTask(data)),
    makeDoneTask: (data: any) => dispatch(makeDoneTask(data)),
    addTask: (data: object) => dispatch(addTask(data)),
    setId: (id: string) => dispatch(setId(id)),
    initLoad: () => dispatch(initLoad()),
    initPost: (config: object) => dispatch(initPost(config))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);