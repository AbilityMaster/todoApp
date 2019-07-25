import {handleActions} from "redux-actions";
import {toggleCalendar} from "../actions/Calendar";

const initialState = {
    isVisible: true
};

Object.freeze(initialState);

export default handleActions( {
        // @ts-ignore
        [toggleCalendar]: (state, action) => {
            console.log(action.type);
            return {
                ...state,
                isVisible: !state.isVisible
            }
        }
    },
initialState);