import * as React from 'react';
import './task.scss';
import ModalWindow from "../ModalWindow";
import {MODAL_TYPE} from "../../constants";
import {ITaskComponent} from "../../types/interfaces";
import {convertFromRaw} from "draft-js";
import { saveToDraftJs, updateEditorState} from "../../actions";
import {connect} from 'react-redux';
import { EditorState } from "draft-js";

interface Istate {
    isShow: boolean;
}

class Task extends React.Component<ITaskComponent> {
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
        const { isDone, draftJsConfig, updateEditorState } = this.props;

        if (isDone) {
            return;
        }

        this.setState({ isShow: true });


       if (draftJsConfig) {
          const config = convertFromRaw(draftJsConfig);
          let ed = EditorState.createWithContent(config);

          updateEditorState(ed);
       }
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
        const { description, index, id, isDone, header, draftJsConfig } = this.props;

       return (
            <React.Fragment>
               { isShow ?
                   <ModalWindow
                       type={MODAL_TYPE.CHANGE}
                       className="modal"
                       textAreaClassName={"modal__textarea modal__textarea_view"}
                       header={"Просмотр задачи"}
                       description={"Описание задачи: "}
                       taskHeader={header}
                       changeTask={this.changeTask}
                       draftJsConfig={draftJsConfig}
                       buttonLabel={"Изменить"}
                       onBlur={this.onBlur}
                       value={description}
                       id={id}
                    />
                    : null }
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
    editorState: state.app.editorState
});

const mapDispatchToProps = (dispatch: any) => ({
    saveToDraftJs: (config: any) => dispatch(saveToDraftJs(config)),
    updateEditorState: (config: any) => dispatch(updateEditorState(config))
});

export default connect(mapStateToProps, mapDispatchToProps)(Task);