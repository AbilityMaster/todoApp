export interface IApp {
    tasks: ITask [];
    isShowModal: boolean;
    config: ITask [];
    currentId: string;
    selectedDay: Date;
    isShowLoader: boolean;
    isShowContextMenu: boolean;
    x: number;
    y: number;
    queryType: string;
    searchValue: string;
    showModal: () => void;
    initLoad: (id: string) => void;
    hideContextMenu: () => void;
    changeTypeModal: (data: string) => void;
    updateEditorState: (data: any) => void;
}

export interface ITask {
    idDay: string;
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
    currentId: string;
    listSelectedDays: Date [];
    config: Date [];
    idDay: string;
    updateEditorState: (data: any) => void;
    deleteTask: (data: { config:  ITask [], listSelectedDays: Date [], currentId: string, id: string }) => void;
    makeDoneTask: (data: object) => void;
    saveSearchConfig: (data: ITask []) => void;
    changeTypeModal: (data: string) => void;
    showModal: () => void;
    selectTask: (data: object) => void;
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
    tempSelectedDay: Date;
    config: ITask [];
    taskDate: Date;
    x: number;
    y: number;
    listSelectedDays: Date [];
    selectDay: (data: Date) => void;
    fetchConfig: (data: ITask []) => void;
    setId: (data: string) => void;
    openModal: () => void;
    fetchSelectedDays: (data: Date []) => void;
}

export interface IModalWindow {
    currentId: string;
    isShowContextMenu: boolean;
    type: string;
    draftJsConfig: any;
    id: string;
    idDay: string;
    selectedDay: Date;
    isShowCalendar: boolean;
    selectedDayByPopup: Date;
    taskDate: Date;
    config: ITask [];
    listSelectedDays: Date [];
    header: string;
    className?: string;
    editorState: any;
    saveTasks: (data: any) => void;
    hideContextMenu: () => void;
    hideModal: () => void;
    saveCoords(data: object): void;
    showCalendar: () => void;
    changeTask: (data: any) => void;
    fetchSelectedDays: (data: Date []) => void;
    addTask(data: object ): void;
}

export interface ISearchInput {
    saveSearchValue: (data: string) => void;
    config: ITask [];
}

export interface ITaskList {
    name: string;
    tasks: ITask [];
}

export interface ILeftBar {
    config: ITask [];
    type: string,
    isVisible: boolean,
    saveTasks: (data: ITask []) => void;
    selectDay: (data: object) => void;
    updateNumberOfMonths: (data: object) => void;
    updateRangeSelected: (data: object) => void;
    saveQueryType: (data: string) => void;
    toggleCalendar: () => void;
}

export interface IFunctionalEditor {
    editorState: any;
    draftJsConfig: any;
    updateEditorState: (data: any) => void;
}

export interface ILabelDate {
    selectedDay: Date;
    type: string;
    rangeSelected: any;
    queryType: string;
}

export interface IInlineToolbar {
    editorState: any;
    onToggle: (data: string) => void;
}

export interface IHelpBox {
    close: (data: boolean) => void;
}

export interface ICalendarPopup {
    x: number;
    y: number;
    selectDay: (day: Date) => void;
    hideCalendar: () => void;
    selectTaskDate: (data: Date) => void;
}

export interface ICalendar {
    config: ITask [];
    currentId: string;
    selectedDay: Date;
    listSelectedDays: Date [];
    currentMonth: Date;
    numberOfMonths: number;
    rangeSelected: any;
    type: string;
    isVisible: boolean;
    selectDay: (data: object) => void;
    selectDayMemory: (data: Date) => void;
    setId: (id: string) => void;
    updateCurrentMonth: (data: Date) => void;
    openContextMenu: (data: object) => void;
    saveTasks: (data: any) => void;
    updateRangeSelected: (data: object) => void;
    saveQueryType: (data: string) => void;
    toggleCalendar: () => void;
    selectTaskDate: (data: Date) => void;
}