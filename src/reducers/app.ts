import {transformDate} from "../utils/utils";
import {
    makeDoneTask,
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
    selectDayMemory,
    hideContextMenu,
    updateCurrentMonth,
    saveToDraftJs,
    saveTasks,
    updateNumberOfMonths, updateRangeSelected, hideModal, showModal, saveGroupConfig, saveQueryType
} from "../actions";
import {handleActions} from "redux-actions";
import { EditorState } from 'draft-js';
import {TYPE_CALENDAR} from "../constants";

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
    currentMonth: '',
    configDraftJs: {},
    numberOfMonths: 1,
    rangeSelected: {
        from: null,
        to: null,
        enteredTo: null
    },
    type: TYPE_CALENDAR.DEFAULT,
    groupConfig: {},
    queryType: ''
};

Object.freeze(initialState);

// @ts-ignore
export default handleActions(
    {
        // @ts-ignore
        [saveQueryType]: (state, action) => {
            console.log(action.type);
            return {
                ...state,
                queryType: action.payload
            }
        },
        // @ts-ignore
        [updateEditorState]: (state, action) => {
            console.log(action.type);
            return {
                ...state,
                editorState: action.payload
            }
        },
        // @ts-ignore
        [showModal]: (state, action) => {
            console.log(action.type);
            return {
                ...state,
                isShowModal: true
            }
        },
        // @ts-ignore
        [hideModal]: (state, action) => {
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
        // @ts-ignore
        [saveToDraftJs]: (state, action) => {
            console.log(action.type);
            return {
                ...state,
                configDraftJs: action.payload
            }
        },
        // @ts-ignore
        [saveTasks]: (state, action) => {
            console.log(action.type);
            return {
                ...state,
                tasks: action.payload
            }
        },
        // @ts-ignore
        [updateNumberOfMonths]: (state, action) => {
            console.log(action.type);
            const { numberOfMonths, type } = action.payload;

            return {
                ...state,
                numberOfMonths: numberOfMonths,
                type: type
            }
        },
        // @ts-ignore
        [updateRangeSelected]: (state, action) => {
            console.log(action.type);
            return {
                ...state,
                rangeSelected: action.payload
            }
        },
        // @ts-ignore
        [saveGroupConfig]: (state, action) => {
            console.log(action.type);
            return {
                ...state,
                groupConfig: action.payload
            }
        },
    },
    initialState
);