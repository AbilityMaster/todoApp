import * as React from 'react';
import './note.scss';
import {INote} from "../../interfaces/interfaces";

export default function Note({ header, content } : INote) {
    return (
        <div className="note">
            <div className="note__header">{header}</div>
            <div className={"note__content"}>{content}</div>
        </div>
    )
}