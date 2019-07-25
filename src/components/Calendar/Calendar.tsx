import * as React from 'react';
import {connect} from "react-redux";
import DayPicker, {DayModifiers, DateUtils} from "react-day-picker";

import {MONTHS, TYPE_CALENDAR, WEEKDAYS_LONG, WEEKDAYS_SHORT} from "../../constants";
import {
    transformDate,
    transformDateArray,
    transformId,
    getRangeFromDate,
    getInitialStateForRange, deepclone
} from "../../utils/utils";
import {
    openContextMenu, saveQueryType, saveTasks,
    selectDay,
    selectDayMemory, setId, updateCurrentMonth, updateRangeSelected
} from "../../actions";
import './Calendar.scss';
import HelpBox from '../common/HelpBox';
import {toggleCalendar} from "../../actions/Calendar";
import {selectTaskDate} from "../../actions/task";

const mapStateToProps = (state: any) => ({
    tasks: state.app.tasks,
    config: state.app.config,
    currentId: state.app.currentId,
    selectedDay: state.app.selectedDay,
    listSelectedDays: state.app.listSelectedDays,
    currentMonth: state.app.currentMonth,
    numberOfMonths: state.app.numberOfMonths,
    rangeSelected: state.app.rangeSelected,
    type: state.app.type,
    isVisible: state.calendar.isVisible
});

const mapDispatchToProps = (dispatch: any) => ({
    selectDay: (data: object) => dispatch(selectDay(data)),
    selectDayMemory: (data: Date) => dispatch(selectDayMemory(data)),
    setId: (id: string) => dispatch(setId(id)),
    updateCurrentMonth: (data: Date) => dispatch(updateCurrentMonth(data)),
    openContextMenu: (data: object) => dispatch(openContextMenu(data)),
    saveTasks: (data: any) => dispatch(saveTasks(data)),
    updateRangeSelected: (data: object) => dispatch(updateRangeSelected(data)),
    saveQueryType: (data: string) => dispatch(saveQueryType(data)),
    toggleCalendar: () => dispatch(toggleCalendar()),
    selectTaskDate: (data: Date) => dispatch(selectTaskDate(data))
});

const Calendar = (props: any) => {
    const { updateCurrentMonth, selectedDay, numberOfMonths, updateRangeSelected, rangeSelected, type, toggleCalendar, isVisible } = props;
    const [ isShowHelpBox, updateHelpBoxVisibility ] = React.useState(false);

    const isSelectingFirstDay = (from: Date | null, to: Date | null, day: Date | null) => {
        // @ts-ignore
        const isBeforeFirstDay = from && DateUtils.isDayBefore(day, from);
        const isRangeSelected = from && to;
        return !from || isBeforeFirstDay || isRangeSelected;
    };

    const handleMonthChange = (day: Date) => {
        updateCurrentMonth(day);
    };

    const handleDayClick = (day : Date) => {
        const { currentId, setId, selectDay, config, saveTasks, type, saveQueryType, selectTaskDate } = props;

        saveQueryType('');

        if (type === TYPE_CALENDAR.DEFAULT) {
            const id = transformDate(day);

            // eslint-disable-next-line array-callback-return
            const tasks = config.filter((value: any) => {
                if (value.idDay === id) {
                    return value;
                }
            });

            if (id !== currentId) {
                setId(id);
            }

            selectTaskDate(day);
            saveTasks(tasks);
            selectDay(day);
        }

        if (type === TYPE_CALENDAR.RANGE) {
            const {from, to, enteredTo} = rangeSelected;

            if (!enteredTo) {
                return;
            }

            const keysData = getRangeFromDate(from, enteredTo);
            const ids = transformDateArray(keysData);
            const tasks: any = [];

            ids.forEach( item => {
                // eslint-disable-next-line array-callback-return
               return config.filter((value: any) => {
                 if (value.idDay === item) {
                     tasks.push(value);
                 }
               });
            });

            saveTasks(tasks);

            if (from && to && day >= from && day <= to) {
                handleResetClick();
                return;
            }

            if (isSelectingFirstDay(from, to, day)) {
                updateRangeSelected({
                    from: day,
                    to: null,
                    enteredTo: null,
                });
            } else {
                updateRangeSelected({
                    from,
                    to: day,
                    enteredTo: day,
                });
            }
        }
    };

    const handleDayMouseEnter = (day: Date) => {
        const { from, to } = rangeSelected;
        if (!isSelectingFirstDay(from, to, day)) {
            updateRangeSelected({
                from,
                to,
                enteredTo: day,
            });
        }
    };

    const handleResetClick = () => {
        updateRangeSelected(getInitialStateForRange());
    };

    const handleContextMenuDayClick = (day: Date, modifiers: DayModifiers, e: React.MouseEvent<HTMLDivElement>) => {
        const { openContextMenu, selectDayMemory, selectTaskDate } = props;

        e.preventDefault();
        openContextMenu({ x: `${e.clientX}px`, y: `${e.clientY}px` });
        selectDayMemory(day);
        selectTaskDate(day);
    };

    const getModifiers = () => {
        const { config, currentMonth } = props;
        let { listSelectedDays } = props;
        const { from, enteredTo } = rangeSelected;

        const _config = deepclone(config);

        if (currentMonth) {
            // eslint-disable-next-line array-callback-return
            listSelectedDays =  listSelectedDays.filter((value: any) => {
                if (value.getMonth() === currentMonth.getMonth()) {

                    return value;
                }
            });
        }

        const dates = transformDateArray(listSelectedDays);
        let tasksPerDay = [];
        const doneAllTasks = [];
        const doneNotAllTasks = [];

        for (let i = 0; i < dates.length; i++) {
            let counter = 0;
            tasksPerDay = _config.filter((value: any) => (value.idDay === dates[i]));

            for (let i = 0; i < tasksPerDay.length; i++) {
                if (tasksPerDay[i].isDone) {
                    counter++;
                }
            }

            if (tasksPerDay.length === counter) {
                doneAllTasks.push(transformId(dates[i]));
            } else {
                doneNotAllTasks.push(transformId(dates[i]));
            }
        }

        return {
            highlighted: doneNotAllTasks,
            done: doneAllTasks,
            start: from,
            end: enteredTo
        };
    };

    const { from, enteredTo } = rangeSelected;
    const selectedDays = [from, { from, to: enteredTo}];

    return (
        <React.Fragment>
            <p onClick={() => {toggleCalendar()}} className={"label-button"}>{isVisible ? '▼ Скрыть' : '▶ Показать'} календарь</p>
            <div className={"container"}>
                {/*<div className={"add-button"}><span>+</span> Добавить</div>*/}
                <div className={"container__calendar"}>
                    {/*<div className={"settings-btn"}>⚙</div>*/}
                    { isVisible ? (
                        <React.Fragment>
                            <DayPicker
                                numberOfMonths={numberOfMonths}
                                fromMonth={from}
                                months={MONTHS}
                                weekdaysLong={WEEKDAYS_LONG}
                                weekdaysShort={WEEKDAYS_SHORT}
                                className={"Range custom-theme"}
                                onMonthChange={handleMonthChange}
                                onDayClick={handleDayClick}
                                onContextMenu={handleContextMenuDayClick}
                                modifiers={getModifiers()}
                                onDayMouseEnter={handleDayMouseEnter}
                                // initialMonth={new Date(2017, 3)}
                                selectedDays={
                                    (type === TYPE_CALENDAR.RANGE) ? selectedDays : [selectedDay]

                                }
                            />
                            <div onClick={() => updateHelpBoxVisibility(true)} className={"help"}>?</div>
                            { isShowHelpBox ? <HelpBox close={updateHelpBoxVisibility} /> : null }
                        </React.Fragment>
                        ) : null
                    }
                </div>
            </div>
        </React.Fragment>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);