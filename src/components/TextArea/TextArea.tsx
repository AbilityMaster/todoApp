import * as React from 'react';
import './textarea.scss';
import { useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import {ITextArea} from "../../types/interfaces";

function TextArea( { className, value, type } : ITextArea, ref: any) {
    const $textarea = useRef<HTMLTextAreaElement>(null);

    useImperativeHandle(ref, () => ({
        focus: () => {
            if ($textarea && $textarea.current) {
                $textarea.current.focus();
            }
        },
        value: () => {
            if ($textarea && $textarea.current) {
                return $textarea.current.value;
            }
        }
    }));

    useEffect(() => {
         if ($textarea) {
             if (type === "view") {
                 // @ts-ignore
                 $textarea.current.blur();
             }
         }
    });

    return (
        <textarea ref={$textarea} className={className} defaultValue={ value || ''}/>
    )
}

export default forwardRef(TextArea);