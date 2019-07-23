import * as React from 'react';
import './LeftBar.scss';
import {MENU_LINK_TYPE, TYPE_CALENDAR} from "../../constants";
import {connect} from "react-redux";
import {saveTasks, selectDay, updateNumberOfMonths, updateRangeSelected} from "../../actions";
import {transformDate, transformId} from '../../utils/utils';

const mapStateToProps = (state: any) => ({
    config: state.app.config,
    rangeSelected: state.app.rangeSelected,
    type: state.app.type
});

const mapDispatchToProps = (dispatch: any) => ({
    saveTasks: (data: any) => dispatch(saveTasks(data)),
    selectDay: (data: object) => dispatch(selectDay(data)),
    updateNumberOfMonths: (data: number) => dispatch(updateNumberOfMonths(data)),
    updateRangeSelected: (data: object) => dispatch(updateRangeSelected(data))
});

function LeftBar(props: any) {
    const { updateNumberOfMonths } = props;

    const handleClickMenu = (type: string) => {
        const date = new Date();

        switch (type) {
            case MENU_LINK_TYPE.TODAY: {
                selectToday(date);
                break;
            }
            case MENU_LINK_TYPE.TOMORROW: {
                selectTomorrow(date);
                break;
            }
            case MENU_LINK_TYPE.NEXT_WEEK: {
                selectNextWeek();
                break;
            }
            default: {
                selectAll();
                break;
            }
        }
    };

    const selectToday = (date: Date) => {
        const { config, saveTasks, selectDay } = props;

        const id = transformDate(date);

        // eslint-disable-next-line array-callback-return
        const tasks = config.filter((value: any) => {
           if (value.idDay === id) {
               return value;
           }
        });

        saveTasks(tasks);
        selectDay(date);
        updateNumberOfMonths({ numberOfMonths: 1, type: TYPE_CALENDAR.DEFAULT });
    };

    const selectTomorrow = (date: Date) => {
        const { config, saveTasks, selectDay } = props;

       const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1 );
       const id = transformDate(newDate);

        // eslint-disable-next-line array-callback-return
        const tasks = config.filter((value: any) => {
            if (value.idDay === id) {
                return value;
            }
        });

        saveTasks(tasks);
        selectDay(newDate);
        updateNumberOfMonths({ numberOfMonths: 1, type: TYPE_CALENDAR.DEFAULT });
    };

    const selectNextWeek = () => {
        const { config, saveTasks, updateNumberOfMonths, updateRangeSelected, rangeSelected } = props;

        const day = 60 * 60 * 24 * 1000;
        const week = day * 7;
        const dateNow = Date.now() - day;
        const _dateWeekInMilliseconds = dateNow + week;

        // eslint-disable-next-line array-callback-return
        const tasks = config.filter((value: any) => {
            const date = transformId(value.idDay);
            const startInMilliseconds = date.getTime();

            if ((startInMilliseconds < _dateWeekInMilliseconds) && (startInMilliseconds > dateNow)) {
                return value;
            }
        });

        updateNumberOfMonths({ numberOfMonths: 2, type: TYPE_CALENDAR.RANGE });
        saveTasks(tasks);
        updateRangeSelected({
            from: new Date(),
            enteredTo: new Date(_dateWeekInMilliseconds),
            to: new Date(_dateWeekInMilliseconds)
        });
    };

    const selectAll = () => {
        const { config, saveTasks } = props;

        saveTasks(config);
        updateNumberOfMonths({ numberOfMonths: 1, type: TYPE_CALENDAR.DEFAULT });
    };

    return (
      <div className={"menu"}>
          <div className={"menu__header"}>ToDo App</div>
          <div onClick={() => handleClickMenu(MENU_LINK_TYPE.TODAY)} className={"menu__link"}>
             <i className="demo-icon icon-calendar-minus-o">&#xf272;</i>
              {" "}Сегодня
          </div>
          <div onClick={() => handleClickMenu(MENU_LINK_TYPE.TOMORROW)}  className={"menu__link"}>
            <i className="demo-icon icon-calendar-times-o">&#xf273;</i>
              {" "}Завтра
          </div>
          <div onClick={() => handleClickMenu(MENU_LINK_TYPE.NEXT_WEEK)}  className={"menu__link"}>
            <i className="demo-icon icon-calendar-check-o">&#xf274;</i>
              {" "}Следующие 7 дней
          </div>
          <div onClick={() => handleClickMenu(MENU_LINK_TYPE.ALL)}  className={"menu__link"}>
              <i className="demo-icon icon-calendar">&#xe800;</i>
              {" "} Все
          </div>
      </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftBar);