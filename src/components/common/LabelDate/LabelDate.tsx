import * as React from 'react';
import {connect} from "react-redux";

import {getFormatDate} from "../../../utils/utils";
import './LabelDate.scss';
import {TYPE_CALENDAR} from "../../../constants";

const mapStateToProps = (state: any) => ({
    selectedDay: state.app.selectedDay,
    type: state.app.type,
    rangeSelected: state.app.rangeSelected
});

function LabelDate(props: any) {
    const { selectedDay, type, rangeSelected } = props;
    const { from, to, enteredTo } = rangeSelected;

    const labelRange = () => {
      return (
          <div className="date-now">
              {!from && !to && 'Пожалуйста, выберите первый день из диапозона ...'}
              {from && !to && 'Пожалуйста, выберите крайний день из диапазона ...'}
              {from &&
              to &&
              `Задачи на диапазон дат: ${getFormatDate(from)} — 
                ${getFormatDate(to)}`}{' '}
          </div>
      )
    };

    return (
         type === TYPE_CALENDAR.RANGE ? labelRange() :  <div className="date-now">Задачи на {selectedDay ? getFormatDate(selectedDay) : null }</div>
    )
}

export default connect(mapStateToProps, null)(LabelDate);