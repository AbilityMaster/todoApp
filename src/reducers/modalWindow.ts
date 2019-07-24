import {handleActions} from "redux-actions";
import {changeTypeModal, hideCalendar, saveCoords, selectDay, showCalendar} from "../actions/modalWindow";

const initialState = {
    type: '',
    x: '',
    y: '',
    isShowCalendar: false,
    selectedDayByPopup: undefined
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
        // @ts-ignore
        [saveCoords]: (state, action) => {
            console.log(action.type);
            const { x, y } = action.payload;

            return {
                ...state,
                x,
                y
            }
        },
        // @ts-ignore
        [showCalendar]: (state, action) => {
            console.log(action.type);
            return {
                ...state,
                isShowCalendar: true
            }
        },
        // @ts-ignore
        [hideCalendar]: (state, action) => {
            console.log(action.type);
            return {
                ...state,
                isShowCalendar: false
            }
        },
        // @ts-ignore
        [selectDay]: (state, action) => {
            console.log(action.type);
            return {
                ...state,
                selectedDayByPopup: action.payload
            }
        },
    },
    initialState
)