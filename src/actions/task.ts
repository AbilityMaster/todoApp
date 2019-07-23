import { createAction } from 'redux-actions';

const prefix = 'task/';

export const selectTask = createAction(prefix + 'SELECT_TASK');