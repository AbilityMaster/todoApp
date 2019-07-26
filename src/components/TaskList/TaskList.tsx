import * as React from 'react';

import './TaskList.scss';
import Task from "../Task/Task";

import { getFormatDate, transformId } from "../../utils/utils";
import { ITask, ITaskList } from "../../types/interfaces";

class TaskList extends React.Component<ITaskList> {
    renderTasks() {
        const { tasks } = this.props;

        if (tasks.length === 0) {
            return null;
        }

        return tasks.map((value: ITask, index: number) => <Task
            key={value.id}
            id={value.id}
            idDay={value.idDay}
            index={index}
            header={value.header}
            description={value.description}
            draftJsConfig={value.draftJsConfig || {}}
            isDone={value.isDone}
        /> );
    }

    render() {
        const { name } = this.props;

        return (
            <div className={"task-wrapper"}>
                <div className={"task-date"}>{getFormatDate(transformId(name))}</div>
                { this.renderTasks()}
            </div>
        )
    }
}

export default TaskList;