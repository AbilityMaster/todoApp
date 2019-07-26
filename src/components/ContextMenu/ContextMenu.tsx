import * as React from 'react';
import {connect} from "react-redux";

import {transformDate, transformDateArray, transformStringArray} from "../../utils/utils";
import {fetchConfig, fetchSelectedDays, hideContextMenu, saveTasks, selectDay, setId} from "../../actions";
import {IContextMenu, ITask} from "../../types/interfaces";
import './contextMenu.scss';

const mapDispatchToProps = (dispatch: any) => ({
    setId: (id: string) => dispatch(setId(id)),
    selectDay: (data: Date) => dispatch(selectDay(data)),
    fetchConfig: (data: ITask []) => dispatch(fetchConfig(data)),
    fetchSelectedDays: (data: Date []) => dispatch(fetchSelectedDays(data))
});

const mapStateToProps = (state: any) => ({
    tempSelectedDay: state.app.tempSelectedDay,
    currentId: state.app.currentId,
    config: state.app.config,
    taskDate: state.app.taskDate,
    listSelectedDays: state.app.listSelectedDays
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
      const { config, tempSelectedDay, fetchConfig, listSelectedDays, fetchSelectedDays } = props;


      const selectedDays = transformDateArray(listSelectedDays);
        console.log(selectedDays);
      const idSearch = transformDate(tempSelectedDay);
      const _config = config.filter(value => {
          if (value.idDay !== idSearch) {
              return value;
          }
      });
      const del = selectedDays.findIndex(value => ( value === idSearch));
      selectedDays.splice(del, 1);

      fetchSelectedDays(transformStringArray(selectedDays));
      fetchConfig(_config);
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