import * as React from 'react';
import {connect} from 'react-redux';

import './inlineToolbar.scss';
import {IInlineToolbar} from "../../../types/interfaces";

const mapStateToProps = (state: any) => ({
   editorState: state.app.editorState
});

const BLOCK_TYPES = [
    {label: 'H1', style: 'header-one'},
    {label: 'H2', style: 'header-two'},
    {label: 'H3', style: 'header-three'},
    {label: 'H4', style: 'header-four'},
    {label: 'H5', style: 'header-five'},
    {label: 'H6', style: 'header-six'},
    {label: 'Blockquote', style: 'blockquote'},
    {label: 'UL', style: 'unordered-list-item'},
    {label: 'OL', style: 'ordered-list-item'},
    {label: 'Code Block', style: 'code-block'},
];

const InlineToolbar = (props: IInlineToolbar) => {
    const { onToggle } = props;

    const handleMouseDown = (event: any, type: any) => {
        event.preventDefault();
        onToggle(type);
    };

    return (
        <div className={"editor-btns"}>
            { BLOCK_TYPES.map( (type, index) => <div key={index} onMouseDown={(event) => { handleMouseDown(event, type.style) } } className="editor-btns__btn">{type.label}</div>) }
        </div>
    )
};

export default connect(mapStateToProps)(InlineToolbar);