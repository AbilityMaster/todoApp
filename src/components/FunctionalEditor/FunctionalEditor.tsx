import * as React from 'react';
import { Editor, RichUtils} from "draft-js";
import {connect} from "react-redux";

import InlineToolbar from "../common/InlineToolbar/InlineToolbar";

import {updateEditorState} from "../../actions";
import './functionalEditor.scss';
import { IFunctionalEditor } from '../../types/interfaces';

const mapStateToProps = (state: any) => ({
    editorState: state.app.editorState
});

const mapDispatchToProps = (dispatch: any) => ({
    updateEditorState: (data: any) => dispatch(updateEditorState(data))
});

const FunctionalEditor = (props: IFunctionalEditor) => {
    const { editorState } = props;

    const handleChange = (editorState: any) => {
        const { updateEditorState } = props;

        updateEditorState(editorState);
    };

    const toggleInlineStyle = (inlineStyle: string) => {
        const { editorState } = props;

        handleChange(
            RichUtils.toggleInlineStyle(
                editorState,
                inlineStyle
            )
        );

        handleChange(
            RichUtils.toggleBlockType(
                editorState,
                inlineStyle
            )
        );
    };

    return (
        <div className={"functional-editor"}>
            <InlineToolbar onToggle={toggleInlineStyle}  />
            <Editor placeholder={"Введите текст..."} editorState={editorState} onChange={handleChange} />
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(FunctionalEditor);