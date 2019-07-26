import * as React from 'react';
import {connect} from 'react-redux';
import {convertFromRaw} from "draft-js";
import { EditorState } from "draft-js";

import {MODAL_TYPE} from "../../constants";
import {
    deleteTask,
    makeDoneTask,
    saveSearchConfig,
    saveTasks,
    showModal,
    updateEditorState
} from "../../actions";
import {changeTypeModal} from "../../actions/modalWindow";
import {selectTask, selectTaskDate} from "../../actions/task";
import { deepclone, transformId } from "../../utils/utils";
import './task.scss';
import { ITask, ITaskComponent } from "../../types/interfaces";

const mapStateToProps = (state: any) => ({
    config: state.app.config,
    currentId: state.app.currentId,
    listSelectedDays: state.app.listSelectedDays
});

const mapDispatchToProps = (dispatch: any) => ({
    updateEditorState: (config: ITask []) => dispatch(updateEditorState(config)),
    changeTypeModal: (data: string) => dispatch(changeTypeModal(data)),
    showModal: () => dispatch(showModal()),
    selectTask: (data: object) => dispatch(selectTask(data)),
    selectTaskDate: (data: Date) => dispatch(selectTaskDate(data)),
    makeDoneTask: (data: object) => dispatch(makeDoneTask(data)),
    deleteTask: (data: object) => dispatch(deleteTask(data)),
    saveTasks: (data: object) => dispatch(saveTasks(data)),
    saveSearchConfig: (data: ITask []) => dispatch(saveSearchConfig(data))
});

class Task extends React.Component<ITaskComponent> {
    $doneInput = React.createRef<HTMLInputElement>();

    get classNames() {
        const { index, isDone } = this.props;

        const classNames = {
            task: ['task'],
            description: ['task__description'],
            position: ['task__position']
        };

        if (isDone) {
            classNames.description.push('task__description_done');
            classNames.position.push('task__position_done');
            classNames.task.push('task_disabled');
        } else {
            classNames.task.push('task_active');
        }

        if (index % 2 === 0) {
            classNames.task.push('task_grey-theme');
        }

        return {
            task: classNames.task.join(' '),
            description: classNames.description.join(' '),
            position: classNames.position.join(' ')
        }
    }

    delete = () => {
        const { currentId, config, listSelectedDays, deleteTask, saveTasks, id } = this.props;
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

    editTask = () => {
        const { idDay, isDone, header, id, description, draftJsConfig, updateEditorState, changeTypeModal, showModal, selectTask, selectTaskDate } = this.props;

        if (isDone) {
            return;
        }

        selectTaskDate(transformId(idDay));

       if (draftJsConfig) {
          const config = convertFromRaw(draftJsConfig);
          const editorState = EditorState.createWithContent(config);

          updateEditorState(editorState);
       }

       selectTask({ header, description, draftJsConfig, id, idDay });
       showModal();
       changeTypeModal(MODAL_TYPE.CHANGE);
    };

    handleChangeTaskStatus = () => {
        const { currentId, config, makeDoneTask, id, selectTaskDate, idDay, saveTasks, saveSearchConfig } = this.props;
        const _config = deepclone(config);

        // eslint-disable-next-line array-callback-return
        const tasks = _config.filter((value: ITask) => {
            if (value.idDay === idDay) {
                return value;
            }
        });

        const task = tasks.find((value: ITask) => (value.id === id));

        if (task && this.$doneInput && this.$doneInput.current) {
            task.isDone = this.$doneInput.current.checked;
            makeDoneTask( { config: _config, currentId, id, checked: this.$doneInput.current.checked });
        }

        saveTasks(tasks);
        selectTaskDate(transformId(idDay));
        saveSearchConfig(_config);
    };

    render() {
       const { description, index, isDone, header } = this.props;

       return (
            <React.Fragment>
                   <div onClick={this.editTask} className={this.classNames.task}>
                       <div className={this.classNames.position}>{index + 1}</div>
                       <div className={"task__info"}>
                           <div className="task__header">{header}</div>
                           <div className={this.classNames.description}>{description}</div>
                       </div>
                       <div className={"task__done"}>
                       <input
                           title="Пометить выполненным"
                           ref={this.$doneInput}
                           checked={isDone}
                           onClick={(event) => {event.stopPropagation()}}
                           onChange={this.handleChangeTaskStatus}
                           type="checkbox"
                           name="done"
                           id="checkbox-1"
                       />
                       </div>
                       <i onClick={(event) => { this.delete(); event.stopPropagation()}} className="task__delete">✕</i>
                   </div>
            </React.Fragment>
       );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Task);