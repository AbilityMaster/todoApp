export interface IProps {
    isShowLoader: boolean;
    isShowModal: boolean;
    config: {id: string, tasks: ITask [] } [];
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
    selectDay: (day: Date) => void;
    deleteTask: ({}: Object) => void;
    initLoad: () => void;
    initPost: (config: object) => void;
}

export interface ITask {
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


export interface ITaskList {
    description: string;
    index: number;
    deleteTask: (id: string) => void;
    changeTask: (id: string, data: string) => void;
    makeDoneTask: (id: string, checked: boolean) => void;
    id: string;
    isDone: boolean;
    makeDone: (data: any) => void;
}

export interface ITextArea {
    className?: string;
    value?: string;
    type?: string;
}