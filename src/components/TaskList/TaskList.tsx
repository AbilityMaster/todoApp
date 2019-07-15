import * as React from 'react';
import './taskList.scss';
import ModalWindow from "../ModalWindow";
import {MODAL_TYPE} from "../../constants";
import {ITaskList} from "../../interfaces/interfaces";

interface Istate {
    isShow: boolean;
}

class TaskList extends React.Component<ITaskList> {
    state: Istate = {
        isShow: false
    };

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
        const { id, deleteTask } = this.props;

        deleteTask(id);
    };

    showModal = () => {
        const { isDone } = this.props;

        if (isDone) {
            return;
        }

        this.setState({ isShow: true });
    };

    onBlur = (data: boolean): void => {
        this.setState({ isShow: data });
    };

    changeTask = (id: string, data: string): void => {
        const { changeTask } = this.props;

        changeTask(id, data);

        this.setState({ isShow: false })
    };

    handleChange = () => {
        const { makeDoneTask, id } = this.props;

        let checked = false;

        if (this.$doneInput && this.$doneInput.current) {
            checked = this.$doneInput.current.checked;
        }

        makeDoneTask(id, checked);
    };

    render() {
        const { isShow } = this.state;
        const { description, index, id, isDone } = this.props;

       return (
            <React.Fragment>
               { isShow ?
                   <ModalWindow
                       type={MODAL_TYPE.CHANGE}
                       className="modal"
                       textAreaClassName={"modal__textarea modal__textarea_view"}
                       header={"Просмотр задачи"}
                       description={"Описание задачи: "}
                       changeTask={this.changeTask}
                       buttonLabel={"Изменить"}
                       onBlur={this.onBlur}
                       value={description}
                       id={id}
                    />
                    : null }
                   <div onClick={this.showModal} className={this.classNames.task}>
                       <div className={this.classNames.position}>{index + 1}</div>
                       <div className={this.classNames.description}>{description}</div>
                       <div className={"task__done"}>
                       <input
                           title="Пометить выполненным"
                           ref={this.$doneInput}
                           checked={isDone}
                           onClick={(event) => {event.stopPropagation()}}
                           onChange={this.handleChange}
                           type="checkbox"
                           name="done"
                           id="checkbox-1"
                       />
                       </div>
                       <i onClick={this.delete} className="task__delete demo-icon icon-cancel">&#xe800;</i>
                   </div>
            </React.Fragment>
       );
    }
}

export default TaskList;