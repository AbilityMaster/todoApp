import * as React from 'react';
import './ButtonPopup.scss';
import {MODAL_TYPE} from "../../../constants";
import {EditorState} from "draft-js";
import {changeTypeModal} from '../../../actions/modalWindow';
import {showModal, updateEditorState} from "../../../actions";
import {connect} from "react-redux";
import {IButtonPopup} from "../../../types/interfaces";

const mapDispatchToProps = (dispatch: any) => ({
    changeTypeModal: (data: string) => dispatch(changeTypeModal(data)),
    showModal: () => dispatch(showModal()),
    updateEditorState: (data: any) => dispatch(updateEditorState(data))
});

const mapStateToProps = (state: any) => ({
    currentId: state.app.currentId
});

function ButtonPopup(props: IButtonPopup) {
    const addTask = () => {
        const { currentId, showModal, changeTypeModal, updateEditorState } = props;

        if (!currentId ) {
            return;
        }

        changeTypeModal(MODAL_TYPE.ADD);
        showModal();
        updateEditorState(EditorState.createEmpty());
    };

    return (
            <div onClick={addTask} className={"button-popup"}>
                <div className={"button-popup__plus"}><span>+</span></div>
                <div className={"button-popup__text"}>Добавить задачу</div>
            </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ButtonPopup);