import {handleActions} from "redux-actions";
import {selectTask, selectTaskDate} from "../actions/task";

const initialState = {
    idDay: undefined,
    header: '',
    description: '',
    draftJsConfig: '',
    id: '',
    taskDate: new Date()
};

Object.freeze(initialState);

export default handleActions(
    {
        // @ts-ignore
        [selectTask]: (state, action) => {
            console.log(action.type);
            const { header, description, draftJsConfig, id, idDay } = action.payload;

            return {
                ...state,
                header,
                description,
                draftJsConfig,
                id,
                idDay
            }
        },
        // @ts-ignore
        [selectTaskDate]: (state, action) => {
            console.log(action.type);

            return {
                ...state,
                taskDate: action.payload
            }
        },
    },
    initialState
)