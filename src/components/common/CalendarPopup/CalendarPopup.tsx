import * as React from 'react';
import DayPicker from "react-day-picker";
import './CalendarPopup.scss';
import {connect} from "react-redux";
import {useEffect, useRef} from "react";
import {hideCalendar, selectDay} from "../../../actions/modalWindow";
import {MONTHS, WEEKDAYS_LONG, WEEKDAYS_SHORT} from "../../../constants";
import {selectTaskDate} from "../../../actions/task";

const mapStateToProps = (state: any ) => ({
    x: state.modalWindow.x,
    y: state.modalWindow.y
});

const mapDispatchToProps = (dispatch: any) => ({
   selectDay: (day: Date) => dispatch(selectDay(day)),
   hideCalendar: () => dispatch(hideCalendar()),
   selectTaskDate: (data: Date) => dispatch(selectTaskDate(data))
});

function CalendarPopup(props: any) {
    const calendar = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (calendar && calendar.current) {
            console.log(calendar.current.clientHeight);
        }
    });

    const getStyle = () => {
        const { x, y } = props;

        return {
            left: `${x - 240}px`,
            top: `${y}px`
        }
    };

    const handleDayClick = (day: Date) => {
        const { hideCalendar, selectDay, selectTaskDate } = props;

        selectTaskDate(day);
        selectDay(day);
        hideCalendar();
    };

    return (
        <div ref={calendar} className={"calendar-popup"} style={getStyle()}>
            <DayPicker
                months={MONTHS}
                weekdaysLong={WEEKDAYS_LONG}
                weekdaysShort={WEEKDAYS_SHORT}
                onDayClick={handleDayClick}
            />
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarPopup);