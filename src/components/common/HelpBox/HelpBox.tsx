import * as React from 'react';

import './HelpBox.scss';
import { IHelpBox } from "../../../types/interfaces";

function HelpBox(props: IHelpBox) {
    return (
        <React.Fragment>
            <div className={"help-box"}>
                <div className={"help-box__group"}>
                    <div className={"help-box__icon help-box__icon_green"} />
                    <div className={"help-box__description"}>— Таким цветом помечены дни, в которых задания выполнены все</div>
                </div>
                <div className={"help-box__group"}>
                    <div className={"help-box__icon help-box__icon_blue"} />
                    <div className={"help-box__description"}>— Таким цветом помечен текущий выбраный день, либо начало и конец диапозона</div>
                </div>
                <div className={"help-box__group"}>
                    <div className={"help-box__icon help-box__icon_red"} />
                    <div className={"help-box__description"}>— Таким цветом помечены дни, в которых есть невыполненные задания</div>
                </div>
                <div onClick={() => props.close(false)} className={"modal__close"}>✕</div>
            </div>
            <div onClick={() => props.close(false)} className={"layer"} />
        </React.Fragment>
    );
}

export default HelpBox;