import * as React from 'react';
import './contextMenu.scss';
import {IContextMenu} from "../../interfaces/interfaces";
import {transformDate} from "../../utils/utils";
import {connect} from "react-redux";
import {selectDay, setId} from "../../actions";
import {useEffect} from "react";

function ContextMenu(props: IContextMenu) {
    const { x, y, openModal  } = props;

    const selectDay = () => {
        const { currentId, setId, tempSelectedDay, selectDay, openModal } = props;

        const id = transformDate(tempSelectedDay);

        if (id !== currentId) {
            setId(id);
        }

        selectDay(tempSelectedDay);
        openModal();
    };

    return (
        <div style={{ left: x, top: y}} className={"context-menu"}>
            <div onClick={selectDay} className={"context-menu__action context-menu__action_add"}>Добавить задачу...</div>
            <div className={"context-menu__action context-menu__action_delete"}>Удалить все задачи</div>
        </div>
    )
}

const mapDispatchToProps = (dispatch: any) => ({
    setId: (id: string) => dispatch(setId(id)),
    selectDay: (data: Date) => dispatch(selectDay(data))
});

const mapStateToProps = (state: any) => ({
    tempSelectedDay: state.app.tempSelectedDay,
    currentId: state.app.currentId
});

export default connect(mapStateToProps, mapDispatchToProps)(ContextMenu);