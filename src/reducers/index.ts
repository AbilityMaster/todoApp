import app from './app';
import modalWindow from './modalWindow';
import task from "./task";
import {combineReducers} from "redux";

const reducers = {
    app,
    modalWindow,
    task
};

export default () => combineReducers({ ...reducers });

export const createReducer = () => { return combineReducers({...reducers})};