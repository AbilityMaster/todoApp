import { createAction } from 'redux-actions';

const prefix = 'app/';

export const saveSearchValue = createAction(prefix + 'SAVE_VALUE_FROM_SEARCH');
export const saveSearchConfig = createAction(prefix + 'SAVE_SEARCH_CONFIG');
export const saveQueryType = createAction(prefix + 'SAVE_QUERY_TYPE');
export const selectDayMemory = createAction(prefix + 'SELECT_DAY_FROM_CONTEXT_MENU');
export const openContextMenu = createAction(prefix + 'OPEN_CONTEXT_MENU');
export const hideContextMenu = createAction(prefix + 'HIDE_CONTEXT_MENU');
export const showModal = createAction(prefix + 'SHOW_MODAL');
export const hideModal = createAction(prefix + 'HIDE_MODAL');

export const makeDoneTask = createAction(prefix + 'DO_STATUS_DONE_TASK');
export const addTask = createAction(prefix + 'ADD_TASK');
export const onBlur = createAction(prefix + 'ON_BLUR');
export const setId = createAction(prefix + 'SET_ID_DAY');
export const selectDay = createAction(prefix + 'SELECT_DAY');
export const deleteTask = createAction(prefix + 'DELETE_TASK');
export const changeTask = createAction(prefix + 'CHANGE_TASK');
export const updateCurrentMonth = createAction(prefix + 'UPDATE_CURRENT_DATE_FOR_DETECT_MONTH_CHANGE');


export const makeDone = createAction(prefix + 'MAKE_DONE');
export const fetchConfig = createAction(prefix + 'FETCH_CONFIG');
export const fetchSelectedDays = createAction(prefix + 'FETCH_SELECTED_DAYS');

export const initLoad = createAction(prefix + 'INIT_LOAD_APP');

export const showLoader = createAction(prefix + 'SHOW_LOADER');
export const hideLoader = createAction(prefix + 'HIDE_LOADER');
export const initPost = createAction(prefix + 'INIT_POST');

/* Task component */

export const updateEditorState = createAction(prefix + 'UPDATE_EDITOR_STATE');
export const addTaskWithDraft = createAction(prefix + 'ADD_TASK_WITH_DRAFT');
export const saveToDraftJs = createAction(prefix + 'SAVE_TO_DRAFT_JS_CONFIG');

export const loadConfigToDraftJs = createAction(prefix + 'LOAD_CONFIG_TO_DRAFT_JS');
export const saveTasks = createAction(prefix + 'SAVE_TASKS');

/* Calendar */

export const updateNumberOfMonths = createAction(prefix + 'UPDATE_NUMBER_OF_MONTHS');
export const updateRangeSelected = createAction(prefix + 'UPDATE_RANGE_OF_SELECTED_DAYS');