export interface IProps {
    searchValue: string;
    config: ITask [];
    groupConfig: any;
    queryType: string;
    x: string;
    y: string;
    tasks: any;
    taskDate: Date;
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
    isVisible: boolean;
    fetchSelectedDays: (data: Date[]) => void;
    searchConfig: any;
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
    currentId: string;
    index: number;
    editorState: any;
    listSelectedDays: Date [];
    updateEditorState: (data: any) => void;
    deleteTask: (data: { config:  ITask [], listSelectedDays: Date [], currentId: string, id: string }) => void;
    makeDoneTask: (data: object) => void;
    saveToDraftJs: (config: any) => void;
    saveSearchConfig: (data: any) => void;
    changeTypeModal: (data: string) => void;
    showModal: () => void;
    selectTask: (data: object) => void;
    config: any;
    idDay: string;
    selectTaskDate: (data: Date) => void;
    saveTasks: (data: object) => void;
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
    taskDate: Date;
    x: string;
    y: string;
}

export interface IModalWindow {
    currentId: string;
    saveTasks: (data: any) => void;
    listSelectedDays: Date [];
    fetchSelectedDays: (data: Date []) => void;
    addTask(data: object ): void;
    taskDate: Date;
    onBlur?(data: boolean): void;
    saveCoords(data: object): void;
    draftJsConfig?: any;
    config?: any;
    selectedDayByPopup: Date;
    header?: string;
    isShowCalendar: boolean;
    showCalendar: () => void;
    description?: string;
    value?: string;
    selectedDay: Date;
    type: string;
    className?: string;
    taskHeader?: string;
    textAreaClassName?: string;
    buttonLabel?: string;
    id?: string;
    changeTask: (data: any) => void;
    editorState: any;
    updateEditorState: (data: any) => void;
    isShowContextMenu: boolean;
    hideContextMenu: () => void;
    hideModal: () => void;
    idDay: string;
    queryType: string;
}

export interface ISearchInput {
    saveSearchValue: (data: string) => void;
    config: ITask [];
}