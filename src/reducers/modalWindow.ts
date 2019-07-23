import {handleActions} from "redux-actions";
import {changeTypeModal} from "../actions/modalWindow";

const initialState = {
    type: '',
};

Object.freeze(initialState);

export default handleActions(
    {
        // @ts-ignore
        [changeTypeModal]: (state, action) => {
            console.log(action.type);
            return {
                ...state,
                type: action.payload
            }
        },
    },
    initialState
)