export interface IProps {
    config: ITask [];
    x: string;
    y: string;
    isShowContextMenu: boolean;
    isShowLoader: boolean;
    isShowModal: boolean;
    currentId: string;
    childrenNumber: number;
    selectedDay: Date | undefined;
    listSelectedDays: Date [];
    openModalForAdd: () => void;
    hideModalForAdd: () => void;
    makeDoneTask: (config: object) => void;
    addTask: ({}: Object) => void;
    setId: (id: string) => void;
    changeTask: ({}: Object) => void;
    selectDay: (data: Date) => void;
    selectDayMemory: (day: Date) => void;
    deleteTask: ({}: Object) => void;
    initLoad: () => void;
    initPost: (config: object) => void;
    openContextMenu: ({}: Object) => void;
    hideContextMenu: () => void;
}

export interface ITask {
    idDay?: string;
    id: string;
    description: string;
    isDone: boolean;
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
    deleteTask: (id: string) => void;
    changeTask: (id: string, data: string) => void;
    makeDoneTask: (id: string, checked: boolean) => void;
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
    addTask?(data: string): void;
    onBlur?(data: boolean): void;
    header?: string;
    description?: string;
    value?: string;
    type?: string;
    className?: string;
    textAreaClassName?: string;
    buttonLabel?: string;
    id?: string;
    changeTask?: (id: string, data: string) => void;
    editorState: any;
    updateEditorState: (data: any) => void;
    isShowContextMenu: boolean;
    hideContextMenu: () => void;
}