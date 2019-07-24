import { createAction } from 'redux-actions';

const prefix = 'modal/';

export const changeTypeModal = createAction(prefix + 'CHANGE_TYPE_MODAL');
export const saveCoords = createAction(prefix + 'SAVE_COORDS');
export const showCalendar = createAction(prefix + 'SHOW_CALENDAR');
export const hideCalendar = createAction(prefix + 'HIDE_CALENDAR');
export const selectDay = createAction(prefix + 'SELECT_DAY');