import * as React from 'react';
import {connect} from "react-redux";

import {transformDate} from "../../utils/utils";
import {fetchConfig, hideContextMenu, selectDay, setId} from "../../actions";
import {IContextMenu, ITask} from "../../types/interfaces";
import './contextMenu.scss';

const mapDispatchToProps = (dispatch: any) => ({
    setId: (id: string) => dispatch(setId(id)),
    selectDay: (data: Date) => dispatch(selectDay(data)),
    fetchConfig: (data: ITask []) => dispatch(fetchConfig(data))
});

const mapStateToProps = (state: any) => ({
    tempSelectedDay: state.app.tempSelectedDay,
    currentId: state.app.currentId,
    config: state.app.config
});

function ContextMenu(props: IContextMenu) {
    const { x, y } = props;

    const hasAnyTasks = () => {
        const { config, tempSelectedDay } = props;

        const id = transformDate(tempSelectedDay);

        const task = config.find(value => value.idDay === id);

        return !!task;
    };

    const selectDay = () => {
        const { currentId, setId, tempSelectedDay, selectDay, openModal } = props;

        const id = transformDate(tempSelectedDay);

        if (id !== currentId) {
            setId(id);
        }

        selectDay(tempSelectedDay);
        openModal();
    };

    const deleteAll = () => {
      const { config, tempSelectedDay, fetchConfig } = props;

      const indexDel = config.findIndex(value => (value.idDay === transformDate(tempSelectedDay)));
      config.splice(indexDel, 1);

      fetchConfig(config);
      hideContextMenu();
    };

    return (
        <div style={{ left: x, top: y}} className={"context-menu"}>
            <div onClick={selectDay} className={"context-menu__action context-menu__action_add"}>Добавить задачу...</div>
            { hasAnyTasks() ? <div onClick={deleteAll} className={"context-menu__action context-menu__action_delete"}>Удалить все задачи</div> : null }
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ContextMenu);