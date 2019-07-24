import * as React from 'react';
import './task.scss';
import {MODAL_TYPE} from "../../constants";
import {ITaskComponent} from "../../types/interfaces";
import {convertFromRaw} from "draft-js";
import {saveToDraftJs, showModal, updateEditorState} from "../../actions";
import {connect} from 'react-redux';
import { EditorState } from "draft-js";
import {changeTypeModal} from "../../actions/modalWindow";
import {selectTask} from "../../actions/task";

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
        const { id, deleteTask } = this.props;

        deleteTask(id);
    };

    showModal = () => {
        const { isDone, header, id, description, draftJsConfig, updateEditorState, changeTypeModal, showModal, selectTask } = this.props;

        if (isDone) {
            return;
        }

       if (draftJsConfig) {

          const config = convertFromRaw(draftJsConfig);
          let ed = EditorState.createWithContent(config);

          updateEditorState(ed);
       }

       showModal();

       if (selectTask) {
           selectTask({ header, description, draftJsConfig, id });
       }

       changeTypeModal(MODAL_TYPE.CHANGE);
    };

    onBlur = (data: boolean): void => {
        this.setState({ isShow: data });
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
        const { description, index, isDone, header } = this.props;

       return (
            <React.Fragment>
                   <div onClick={this.showModal} className={this.classNames.task}>
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
                           onChange={this.handleChange}
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

const mapStateToProps = (state: any) => ({
    editorState: state.app.editorState,
});

const mapDispatchToProps = (dispatch: any) => ({
    saveToDraftJs: (config: any) => dispatch(saveToDraftJs(config)),
    updateEditorState: (config: any) => dispatch(updateEditorState(config)),
    changeTypeModal: (data: string) => dispatch(changeTypeModal(data)),
    showModal: () => dispatch(showModal()),
    selectTask: (data: object) => dispatch(selectTask(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Task);