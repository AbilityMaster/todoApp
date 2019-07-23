import * as React from 'react';
import { BUTTON_TYPE } from "../../constants/const";
import './button.scss';
import {IButton} from "../../types/interfaces";

const Button = ({ content, type, onClick }: IButton) => {
    let handleClick = () => {
        if (type === BUTTON_TYPE.FORM_APPLY) {
            onClick('1111111');

            return;
        }

        onClick();
    };
    return (
      <button onClick={handleClick} className={"button"}>{content}</button>
    );
};

export default Button;