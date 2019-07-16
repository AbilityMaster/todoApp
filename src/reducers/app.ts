import {transformDate} from "../utils/utils";
import {
    hideModalForAdd,
    makeDoneTask,
    openModalForAdd,
    addTask,
    setId,
    selectDay,
    deleteTask,
    changeTask,
    fetchConfig,
    fetchSelectedDays,
    showLoader,
    hideLoader,
    initPost,
    updateEditorState,
    openContextMenu,
    selectDayMemory, hideContextMenu, updateCurrentMonth
} from "../actions";
import {handleActions} from "redux-actions";
import { EditorState } from 'draft-js';

const initialState = {
    config: [],
    tasks: [],
    isShowContextMenu: false,
    editorState: EditorState.createEmpty(),
    isShowModal: false,
    currentId: transformDate(new Date()),
    childrenNumber: 0,
    selectedDay: new Date(),
    listSelectedDays: [],
    isShowLoader: false,
    x: '',
    y: '',
    tempSelectedDay: new Date(),
    currentMonth: ''
};

Object.freeze(initialState);


// @ts-ignore
export default handleActions(
    {
        // @ts-ignore
        [updateEditorState]: (state, action) => {
            console.log(action.type);
            return {
                ...state,
                editorState: action.payload
            }
        },
        // @ts-ignore
        [openModalForAdd]: (state, action) => {
            console.log(action.type);
            return {
                ...state,
                isShowModal: true
            }
        },
        // @ts-ignore
        [hideModalForAdd]: (state, action) => {
            console.log(action.type);
            return {
                ...state,
                isShowModal: false
            }
        },
        // @ts-ignore
        [makeDoneTask]: (state, action) => {
            console.log(action.type);
            return {
                ...state,
                config: action.payload.config
            }
        },
        // @ts-ignore
        [addTask]: (state, action) => {
            console.log(action.type);
            return {
                ...state,
                config: action.payload.config,
                isShowModal: action.payload.isShowModal,
                listSelectedDays: action.payload.listSelectedDays
            }
        },
        // @ts-ignore
        [setId]: (state, action) => {
            console.log(action.type);
            return {
                ...state,
                currentId: action.payload
            }
        },
        // @ts-ignore
        [selectDay]: (state, action) => {
            console.log(action.type);
            return {
                ...state,
                selectedDay: action.payload
            }
        },
        // @ts-ignore
        [deleteTask]: (state, action) => {
            console.log(action.type);
            return {
                ...state,
                config: action.payload.config,
                listSelectedDays: action.payload.listSelectedDays
            }
        },
        // @ts-ignore
        [changeTask]: (state, action) => {
            console.log(action.type);
            return {
                ...state,
                config: action.payload.config
            }
        },
        // @ts-ignore
        [fetchConfig]: (state, action) => {
            console.log(action.type);
            return {
                ...state,
                config: action.payload
            }
        },
        // @ts-ignore
        [fetchSelectedDays]: (state, action) => {
            console.log(action.type);
            return {
                ...state,
                listSelectedDays: action.payload
            }
        },
        // @ts-ignore
        [showLoader]: (state, action) => {
            console.log(action.type);
            return {
                ...state,
                isShowLoader: true
            }
        },
        // @ts-ignore
        [hideLoader]: (state, action) => {
            console.log(action.type);
            return {
                ...state,
                isShowLoader: false
            }
        },
        // @ts-ignore
        [initPost]: (state, action) => {
            console.log(action.type);
            return {
                ...state
            }
        },
        // @ts-ignore
        [openContextMenu]: (state, action) => {
            console.log(action.type);
            return {
                ...state,
                x: action.payload.x,
                y: action.payload.y,
                isShowContextMenu: true,
            }
        },
        // @ts-ignore
        [hideContextMenu]: (state, action) => {
            console.log(action.type);
            return {
                ...state,
                isShowContextMenu: false,
            }
        },
        // @ts-ignore
        [selectDayMemory]: (state, action) => {
            console.log(action.type);
            return {
                ...state,
                tempSelectedDay: action.payload
            }
        },
        // @ts-ignore
        [updateCurrentMonth]: (state, action) => {
            console.log(action.type);
            return {
                ...state,
                currentMonth: action.payload
            }
        },
    },
    initialState
);