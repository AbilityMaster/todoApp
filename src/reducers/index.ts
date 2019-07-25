import app from './app';
import modalWindow from './modalWindow';
import task from "./task";
import calendar from "./Calendar";
import {combineReducers} from "redux";

const reducers = {
    app,
    modalWindow,
    task,
    calendar
};

export default () => combineReducers({ ...reducers });

export const createReducer = () => { return combineReducers({...reducers})};