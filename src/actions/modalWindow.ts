import { createAction } from 'redux-actions';

const prefix = 'modal/';

export const changeTypeModal = createAction(prefix + 'CHANGE_TYPE_MODAL');