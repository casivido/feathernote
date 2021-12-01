import React, { useState, useCallback, useEffect, useMemo } from "react";
import styled from "styled-components";
import {
  ContentState,
  convertToRaw,
  convertFromRaw,
  EditorState,
} from "draft-js";
import { debounce } from "lodash";

import logo from "../../../images/logo.svg";
import MyEditor from "../../molecules/MyEditor/MyEditor";
import CornerIcon from "../../atoms/CornerIcon/CornerIcon";
import NoteSelector from "../../atoms/NoteSelector/NoteSelector";
import Toolbar from "../../atoms/Toolbar/Toolbar";
import FlexibleTextInput from "../../atoms/FlexibleTextInput/FlexibleTextInput";

const deepEqual = require("deep-equal");

const DEFAULT_NOTE = {
  title: "Main",
  content: convertToRaw(new ContentState.createFromText("")),
};

const Container = styled.div`
  background-color: white;
  color: black;
  font-size: 16px;
  height: 100vh;
  overflow-y: hidden;
  width: 100vw;

  input:focus {
    outline: none;
  }
`;

const HeaderWrapper = styled.div`
  position: absolute;
  width: 100vw;
  z-index: 999;
`;

function moveArrayIndex(array, sourceIndex, destIndex) {
  var placeholder = {};
  // remove the object from its initial position and
  // plant the placeholder object in its place to
  // keep the array length constant
  var objectToMove = array.splice(sourceIndex, 1, placeholder)[0];
  // place the object in the desired position
  array.splice(destIndex, 0, objectToMove);
  // take out the temporary object
  array.splice(array.indexOf(placeholder), 1);
}

const App = () => {
  const [rawNoteData, setRawNoteData] = useState(
    JSON.parse(localStorage.getItem("noteContents")) || [DEFAULT_NOTE]
  );
  const [currentNoteId, setCurrentNoteId] = useState(0);
  const [noteWasDeleted, setNoteWasDeleted] = useState(false);

  // ***** CONTENT State *****

  // Load note data or create a new note ONLY when currentNoteId change
  // (Data is otherwise stored in )
  const currentNoteContent = useMemo(() => {
    if (rawNoteData[currentNoteId]) {
      return convertFromRaw(rawNoteData[currentNoteId].content);
    } else {
      const newContent = new ContentState.createFromText("");
      const newNoteData = {
        content: newContent,
        title: `New Note`,
      };
      let newRawNoteData = rawNoteData;
      newRawNoteData[currentNoteId] = {
        ...newNoteData,
        content: convertToRaw(newContent),
      };
      setRawNoteData(newRawNoteData);
      return newContent;
    }
  }, [currentNoteId, noteWasDeleted]); // eslint-disable-line

  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(currentNoteContent)
  );
  useEffect(
    () => setEditorState(EditorState.createWithContent(currentNoteContent)),
    [currentNoteContent]
  );

  const saveCurrentNoteContent = useCallback(
    debounce((editorContent) => {
      let newRawNoteData = [...rawNoteData];
      newRawNoteData[currentNoteId] = {
        ...newRawNoteData[currentNoteId],
        content: convertToRaw(editorContent),
      };

      const notesChanged = !deepEqual(
        newRawNoteData[currentNoteId].content,
        rawNoteData[currentNoteId].content
      );
      if (notesChanged) {
        localStorage.setItem(`noteContents`, JSON.stringify(newRawNoteData));
        setRawNoteData(newRawNoteData);
      }
    }, 250),
    [currentNoteId, rawNoteData, currentNoteContent]
  ); // eslint-disable-line

  const updateEditorState = useCallback(
    (editorState) => {
      saveCurrentNoteContent(editorState.getCurrentContent());
      setEditorState(editorState);
    },
    [saveCurrentNoteContent, setEditorState]
  );

  const reorderNotes = useCallback((source, dest) => {
    let newRawNoteData = [...rawNoteData];
    moveArrayIndex(newRawNoteData, source, dest);
    localStorage.setItem(`noteContents`, JSON.stringify(newRawNoteData));
    setRawNoteData(newRawNoteData);
    setCurrentNoteId(dest);
  });

  const deleteNote = useCallback(
    (index) => {
      let deletedNotes = JSON.parse(localStorage.getItem("deletedNotes")) || [];
      deletedNotes.push({
        ...rawNoteData[index],
      });
      localStorage.setItem("deletedNotes", JSON.stringify(deletedNotes));

      let newRawNoteData = [...rawNoteData];
      newRawNoteData.splice(index, 1);

      setRawNoteData(newRawNoteData);
      setCurrentNoteId(0);
      setNoteWasDeleted(true);
    },
    [rawNoteData, currentNoteId]
  );

  // ***** TITLE State *****

  const [currentNoteTitle, setCurrentNoteTitle] = useState(
    rawNoteData[currentNoteId].title
  );
  useEffect(
    () => setCurrentNoteTitle(rawNoteData[currentNoteId].title),
    [currentNoteId, rawNoteData]
  );

  const handleTitleChange = useCallback(
    (title) => {
      if (title !== "" && currentNoteTitle !== title) {
        let newRawNoteData = [...rawNoteData];
        newRawNoteData[currentNoteId] = {
          ...newRawNoteData[currentNoteId],
          title: title,
        };
        localStorage.setItem(`noteContents`, JSON.stringify(newRawNoteData));
        setCurrentNoteTitle(title);
        setRawNoteData(newRawNoteData);
      }
    },
    [currentNoteTitle, currentNoteId, rawNoteData]
  );

  // ***** Update temporary states *****

  useEffect(() => {
    if (noteWasDeleted) {
      setNoteWasDeleted(false);
    }
  }, [noteWasDeleted]);

  // ***** RENDER *****

  return (
    <div id="AppRoot" className="App">
      <Container>
        <NoteSelector
          setCurrentNoteId={setCurrentNoteId}
          currentNoteId={currentNoteId}
          noteTitles={rawNoteData.map((note) => note.title)}
          deleteCallback={deleteNote}
          reorderNotes={reorderNotes}
        />
        <HeaderWrapper>
          <FlexibleTextInput
            text={currentNoteTitle}
            updateText={handleTitleChange}
            limit={15}
          />
          <Toolbar editorState={editorState} setEditorState={setEditorState} />
        </HeaderWrapper>
        <MyEditor
          editorState={editorState}
          setEditorState={updateEditorState}
          noteId={currentNoteId}
        />
        <CornerIcon src={logo} />
      </Container>
    </div>
  );
};

export default App;
