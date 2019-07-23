import {changeTypeModal} from "../actions/modalWindow";
import {showModal} from "../actions";

export interface IProps {
    config: ITask [];
    x: string;
    y: string;
    tasks: any;
    isShowContextMenu: boolean;
    isShowLoader: boolean;
    isShowModal: boolean;
    currentId: string;
    childrenNumber: number;
    editorState: any;
    selectedDay: Date;
    listSelectedDays: Date [];
    showModal: () => void;
    hideModal: () => void;
    currentMonth: Date;
    makeDoneTask: (config: object) => void;
    addTask: (data: object) => void;
    changeTask: (data: object) => void;
    deleteTask: (data: object) => void;
    initLoad: (id: string) => void;
    openContextMenu: (data: object) => void;
    hideContextMenu: () => void;
    saveTasks: (data: any) => void;
    changeTypeModal: (data: string) => void;
}

export interface ITask {
    idDay?: string;
    id: string;
    header: string;
    description: string;
    isDone: boolean;
    draftJsConfig?: any;
}

export interface IButton {
    content: string;
    type?: string;
    onClick(data?: string): void;
}

export interface INote {
    header: string;
    content: string
}


export interface ITaskComponent extends ITask{
    index: number;
    editorState: any;
    updateEditorState: (data: any) => void;
    deleteTask: (id: string) => void;
    makeDoneTask: (id: string, checked: boolean) => void;
    saveToDraftJs: (config: any) => void;
    changeTypeModal: (data: string) => void;
    showModal: () => void;
    selectTask?: (data: object) => void;
}

export interface ITextArea {
    className?: string;
    value?: string;
    type?: string;
}

export interface IContextMenu {
    currentId: string;
    selectDay: (data: Date) => void;
    fetchConfig: (data: ITask []) => void;
    setId: (data: string) => void;
    openModal: () => void;
    tempSelectedDay: Date;
    config: ITask [];
    x: string;
    y: string;
}

export interface IModalWindow {
    addTask?(data: string, header: string, config: any): void;
    onBlur?(data: boolean): void;
    draftJsConfig?: any;
    config?: any;
    header?: string;
    description?: string;
    value?: string;
    type: string;
    className?: string;
    taskHeader?: string;
    textAreaClassName?: string;
    buttonLabel?: string;
    id?: string;
    changeTask?: (id: string, header: string, data: string, config: object) => void;
    editorState: any;
    updateEditorState: (data: any) => void;
    isShowContextMenu: boolean;
    hideContextMenu: () => void;
    hideModal: () => void;
}