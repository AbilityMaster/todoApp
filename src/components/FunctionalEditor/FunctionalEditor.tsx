import * as React from 'react';
import {convertFromRaw, Editor, RichUtils} from "draft-js";
import {connect} from "react-redux";

import EditorBtns from "../common/InlineToolbar/InlineToolbar";

import {updateEditorState} from "../../actions";
import './functionalEditor.scss';

const mapStateToProps = (state: any) => ({
    editorState: state.app.editorState,
    configDraftJs: state.app.editorState
});

const mapDispatchToProps = (dispatch: any) => ({
    updateEditorState: (data: any) => dispatch(updateEditorState(data))
});

const FunctionalEditor = (props: any) => {
    let { editorState, draftJsConfig } = props;

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
            <EditorBtns editorState={ editorState } onToggle={toggleInlineStyle}  />
            <Editor placeholder={"Введите текст..."} editorState={editorState} onChange={handleChange} />
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(FunctionalEditor);