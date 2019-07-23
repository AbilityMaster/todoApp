import {
    fetchSelectedDays,
    initLoad,
    fetchConfig,
    showLoader,
    hideLoader,
    makeDoneTask,
    deleteTask, changeTask, addTask, saveTasks
} from "../actions";
import {takeLatest, put, delay} from "redux-saga/effects";
import {getSelectedDays} from "../dataTransfer/dto";

// @ts-ignore
function* fetchConfigApp(apiApp, action) {
    try {
        console.warn('[saga ===> FETCH CONFIG ===> ]');
        yield put(showLoader());
        yield delay(1000);
        const config = yield apiApp.getConfig();
        const selectedDays = yield getSelectedDays(config);
        // eslint-disable-next-line array-callback-return
        const tasks = yield config.filter((value: any) => {
            if (value.idDay === action.payload) {
                return value;
            }
        });

        yield put(saveTasks(tasks));
        yield put(fetchSelectedDays(selectedDays));
        yield put(fetchConfig(config));
        yield put(hideLoader());
    } catch (e) {
        console.error('[saga ===> FETCH CONFIG ===> error ]');
    }
}

// @ts-ignore
function* sendToServer(apiApp, action) {
    try {
        console.warn('[saga ===> SEND TO SERVER CONFIG ===> ]');
        const config = action.payload.config;
        yield apiApp.save(config);
    } catch (e) {
        console.error('[saga ===> SEND TO SERVER CONFIG ===> error ]');
    }
}

// @ts-ignore
function* sendStatusDoneTask(apiApp, action) {
    try {
        console.warn('[saga ===> SEND TO SERVER DONE STATUS TASK ===> ]');
        const { id: idTask, checked } = action.payload;
        yield apiApp.changeTaskStatus(idTask, checked);
    } catch (e) {
        console.error('[saga ===> SEND TO SERVER DONE STATUS TASK ===> error ]');
    }
}

// @ts-ignore
function* deleteTaskSaga(apiApp, action) {
    try {
        console.warn('[saga ===> DELETE TASK ===> ]');
        const { id: idTask } = action.payload;
        yield apiApp.delete(idTask);
    } catch (e) {
        console.error('[saga ===> DELETE TASK ===> error');
    }
}

// @ts-ignore
function* changeTaskData(apiApp, action) {
    try {
        console.warn('[saga ===> CHANGE TASK ===> ]');
        const { idTask, data } = action.payload;
        yield apiApp.change(idTask, data);
    } catch (e) {
        console.error('[saga ===> CHANGE TASK ===> error ]');
    }
}

function* headerSaga(ea: any) {
    yield takeLatest(initLoad().type, fetchConfigApp, ea);
    yield takeLatest(addTask().type, sendToServer, ea);
    yield takeLatest(makeDoneTask().type, sendStatusDoneTask, ea);
    yield takeLatest(deleteTask().type, deleteTaskSaga, ea);
    yield takeLatest(changeTask().type, changeTaskData, ea);
}

export default headerSaga;