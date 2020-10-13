import React, {useEffect, useState} from 'react';
import {EditorState, convertToRaw, convertFromRaw, RichUtils, getDefaultKeyBinding} from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import styled from 'styled-components';
import 'draft-js/dist/Draft.css';

import EditorOverlays from '../EditorOverlays/EditorOverlays';

import createAutoListPlugin from 'draft-js-autolist-plugin'
import createListDepthPlugin from 'draft-js-list-depth-plugin'
const listDepthPlugin = createListDepthPlugin()
const autoListPlugin = createAutoListPlugin()

const StyledContainer = styled.div`
  position: absolute;
  left: 20vw;
  width: 60vw;
  height: 100vh;

  overflow-x: hidden;
  overflow-y: auto;

  ::-webkit-scrollbar {
      background: transparent;
  }

  // Code for styling scrollbar:
  // ::-webkit-scrollbar-thumb {
  //   background: #00000010;
  //   border-radius: 10px;
  // }

  .DraftEditor-root {
    background-color: white;
    color: black;
    padding-top: 200px;
  }
`;

const ScrollPaddingDiv = styled.div`
  position: absolute;
  height: 90vh;
  width: 1px;
`;

const Title = styled.h1`
  font-size: 4rem;
  position: absolute;
  top: 30px;
  left: 40px;
  font-weight: 200;
  padding: 0;
  margin: 0;
`;

const MyEditor = () => {
  // Load from local storage
  const localContent = JSON.parse(localStorage.getItem('asdf'));
  const [editorState, setEditorState] = useState(localContent ? EditorState.createWithContent(convertFromRaw(localContent)) : EditorState.createEmpty());

  useEffect(() => {
    setEditorState(EditorState.moveFocusToEnd(editorState))
  }, [])

  const onChange = editorState => {
    localStorage.setItem('asdf', JSON.stringify(convertToRaw(editorState.getCurrentContent())));
    setEditorState(editorState);
  }

  // const handleKeyBindings = e => {
  //   // TAB
  //   if (e.keyCode === 9) {
  //     const newEditorState = RichUtils.onTab(e, editorState, 6 /* maxDepth */)
  //     if (newEditorState !== editorState) {
  //        setEditorState(newEditorState)
  //     }
  //   }
  //   else {
  //     return getDefaultKeyBinding(e)
  //   }
  // }

  return (
    <>
      <EditorOverlays />
      <Title>Main</Title>
      <StyledContainer
        onClick={() => {
          if (!editorState.getSelection().getHasFocus()) {
            setEditorState(EditorState.moveFocusToEnd(editorState));
          }
        }}
      >
        <Editor
          editorState={editorState}
          // handleKeyCommand={handleKeyBindings}
          onChange={onChange}
          plugins={[autoListPlugin, listDepthPlugin]}
          // onTab={handleKeyBindings}
        />
        <ScrollPaddingDiv />
      </StyledContainer>
    </>
  );
}

export default MyEditor;