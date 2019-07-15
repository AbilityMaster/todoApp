import { createAction } from 'redux-actions';

const prefix = 'app/';

export const selectDayMemory = createAction(prefix + 'SELECT_DAY_FROM_CONTEXT_MENU');
export const openContextMenu = createAction(prefix + 'OPEN_CONTEXT_MENU');
export const hideContextMenu = createAction(prefix + 'HIDE_CONTEXT_MENU');
export const openModalForAdd = createAction(prefix + 'OPEN_MODAL_WINDOW_FOR_ADD');
export const hideModalForAdd = createAction(prefix + 'HIDE_MODAL_WINDOW_FOR_ADD');

export const makeDoneTask = createAction(prefix + 'DO_STATUS_DONE_TASK');
export const addTask = createAction(prefix + 'ADD_TASK');
export const onBlur = createAction(prefix + 'ON_BLUR');
export const setId = createAction(prefix + 'SET_ID_DAY');
export const selectDay = createAction(prefix + 'SELECT_DAY');
export const deleteTask = createAction(prefix + 'DELETE_TASK');
export const changeTask = createAction(prefix + 'CHANGE_TASK');


export const makeDone = createAction(prefix + 'MAKE_DONE');
export const fetchConfig = createAction(prefix + 'FETCH_CONFIG');
export const fetchSelectedDays = createAction(prefix + 'FETCH_SELECTED_DAYS');

export const initLoad = createAction(prefix + 'INIT_LOAD_APP');

export const showLoader = createAction(prefix + 'SHOW_LOADER');
export const hideLoader = createAction(prefix + 'HIDE_LOADER');
export const initPost = createAction(prefix + 'INIT_POST');

/* TaskList component */

export const updateEditorState = createAction(prefix + 'INIT_POST');