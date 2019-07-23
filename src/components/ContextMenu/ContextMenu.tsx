import * as React from 'react';
import './contextMenu.scss';
import {IContextMenu, ITask} from "../../types/interfaces";
import {transformDate} from "../../utils/utils";
import {connect} from "react-redux";
import {fetchConfig, hideContextMenu, selectDay, setId} from "../../actions";

function ContextMenu(props: IContextMenu) {
    const { x, y } = props;

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
      const { config, currentId, fetchConfig } = props;

      const indexDel = config.findIndex(value => (value.idDay === currentId));
      config.splice(indexDel, 1);

      fetchConfig(config);
      hideContextMenu();
    };

    return (
        <div style={{ left: x, top: y}} className={"context-menu"}>
            <div onClick={selectDay} className={"context-menu__action context-menu__action_add"}>Добавить задачу...</div>
            <div onClick={deleteAll} className={"context-menu__action context-menu__action_delete"}>Удалить все задачи</div>
        </div>
    )
}

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

export default connect(mapStateToProps, mapDispatchToProps)(ContextMenu);