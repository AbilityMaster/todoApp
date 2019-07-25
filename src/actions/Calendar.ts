import {createAction} from "redux-actions";

const prefix = 'calendar/';

export const toggleCalendar = createAction(prefix + 'TOGGLE_CALENDAR');
export const selectTaskDate = createAction(prefix + 'SELECT_TASK_DATE');