import * as React from 'react';
import { connect } from "react-redux";
import { EditorState } from 'draft-js';

import ModalWindow from "../ModalWindow";
import Task from "../Task";
import Note from "../Note";
import Loader from "../Loader";
import ContextMenu from "../ContextMenu";
import LeftBar from "../LeftBar";
import Calendar from "../Calendar";
import LabelDate from "../common/LabelDate";
import TaskList from "../TaskList";
import SearchInput from "../common/SearchInput/SearchInput";

import { deepclone, transformDate, transformToGroupConfig } from "../../utils/utils";
import {MODAL_TYPE, QUERY_TYPE} from "../../constants";
import {showModal, initLoad, hideContextMenu, updateEditorState} from "../../actions";
import "react-day-picker/lib/style.css";
import {changeTypeModal} from "../../actions/modalWindow";
import "./app.scss";
import {IApp, ITask} from "../../types/interfaces";

interface AppState {
    forScroll: number;
}

const mapStateToProps = (state: any) => ({
    tasks: state.app.tasks,
    isShowModal: state.app.isShowModal,
    config: state.app.config,
    currentId: state.app.currentId,
    selectedDay: state.app.selectedDay,
    isShowLoader: state.app.isShowLoader,
    isShowContextMenu: state.app.isShowContextMenu,
    x: state.app.x,
    y: state.app.y,
    queryType: state.app.queryType,
    searchValue: state.app.searchValue
});

const mapDispatchToProps = (dispatch: any) => ({
    showModal: () => dispatch(showModal()),
    initLoad: (id: string) => dispatch(initLoad(id)),
    hideContextMenu: () => dispatch(hideContextMenu()),
    changeTypeModal: (data: string) => dispatch(changeTypeModal(data)),
    updateEditorState: (data: any) => dispatch(updateEditorState(data))
});

class App extends React.Component<IApp> {
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

    componentDidUpdate(prevProps: Readonly<IApp>, prevState: Readonly<{}>, snapshot?: any): void {
        const { queryType } = this.props;

        const prevForScroll = deepclone(prevState);

        if ((this.state.forScroll !== prevForScroll) && (queryType !== QUERY_TYPE.ALL)) {
            this.scrollToBottom()
        }
    }

    addTask = () => {
       const { currentId, showModal, changeTypeModal, updateEditorState } = this.props;

        if (!currentId ) {
            return;
        }

        changeTypeModal(MODAL_TYPE.ADD);
        showModal();
        updateEditorState(EditorState.createEmpty());
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

        return (
            <div ref={this.$taskContainer}  className={"content-container"}>
                {
                    tasks.map((value: ITask, index: number) => {
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
            </div>
        )
    }

    renderTaskLists() {
        const { config, searchValue } = this.props;
        let _config = deepclone(config);
        const regExp = new RegExp(searchValue, 'i');



        if (searchValue) {
            _config = _config.filter((value: any) => {
                console.log(regExp.test(value.header), searchValue, value.header );
                if (regExp.test(value.header)) {
                    return value;
                }
            })
        }

        _config = transformToGroupConfig(_config);

        if (Object.keys(_config).length === 0) {
            return (
                <React.Fragment>
                    <SearchInput />
                    <Note
                        header='Нет задач'
                        content='Не найдено задач'
                     />
                </React.Fragment>
            );
        }

        return (
            <React.Fragment>
                <SearchInput />
                <div ref={this.$taskContainer} className={"content-container"}>
                    { _config.map((value: any, index: number) =>
                        <TaskList
                            key={index}
                            name={value.idDay}
                            tasks={value.tasks}
                        />
                    )}
                </div>
            </React.Fragment>
        )
    }

    render() {
        const { isShowModal, isShowLoader, isShowContextMenu, x, y, tasks, queryType } = this.props;

        return (
            <React.Fragment>
                <LeftBar />
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
                    { queryType !== QUERY_TYPE.ALL ?  this.renderTasks() : null }
                    { queryType === QUERY_TYPE.ALL ? this.renderTaskLists() : null }
                    { isShowModal ? <ModalWindow className={"modal"} /> : null}
                </div>
            </React.Fragment>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);