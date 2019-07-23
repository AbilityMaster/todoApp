import {handleActions} from "redux-actions";
import {changeTypeModal} from "../actions/modalWindow";
import {selectTask} from "../actions/task";

const initialState = {
    header: '',
    description: '',
    draftJsConfig: '',
    id: ''
};

Object.freeze(initialState);

export default handleActions(
    {
        // @ts-ignore
        [selectTask]: (state, action) => {
            console.log(action.type);
            const { header, description, draftJsConfig, id } = action.payload;

            return {
                ...state,
                header,
                description,
                draftJsConfig,
                id
            }
        },
    },
    initialState
)