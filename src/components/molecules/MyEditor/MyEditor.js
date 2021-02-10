// External
import React, {useCallback, useEffect} from 'react';
import Editor from 'draft-js-plugins-editor';
import styled from 'styled-components';
import 'draft-js/dist/Draft.css';

// Internal
import EditorOverlays from '../../atoms/EditorOverlays/EditorOverlays';
import {setFocusToEnd, handleKeyCommand} from './editorHelpers';

// Editor Plugins
import createAutoListPlugin from 'draft-js-autolist-plugin';
import createListDepthPlugin from 'draft-js-list-depth-plugin';
const listDepthPlugin = createListDepthPlugin();
const autoListPlugin = createAutoListPlugin();

const StyledContainer = styled.div`
	font-size: 1.2rem;
	height: 100vh;
	left: 20vw;
	position: absolute;
	width: 60vw;

	overflow-x: hidden;
	overflow-y: auto;

	::-webkit-scrollbar {
			background: transparent;
	}

	li {
		margin: 2px 0;
	}

	.DraftEditor-root {
		background-color: white;
		color: black;
		padding: 1000px 0;
	}
`;

// TODO: default props
const MyEditor = ({editorState, setEditorState, noteId = 0}) => {
	// Keep curried function bound to current state
	const setMyFocusToEnd = useCallback(setFocusToEnd(editorState, setEditorState), [editorState, setEditorState]);

	useEffect(() => {
		document.querySelector('#editor-container').scrollTop = 800;
	}, [noteId]);

	const onEditorChange = editorState => {
		setEditorState(editorState);
	}
	return (
		<>
			<EditorOverlays />
			<StyledContainer
				id="editor-container"
				onClick={setMyFocusToEnd}
			>
				<Editor
					editorState={editorState}
					handleKeyCommand={handleKeyCommand(setEditorState)}
					onChange={onEditorChange}
					placeholder={"Hi there..."}
					plugins={[autoListPlugin, listDepthPlugin]}
				/>
			</StyledContainer>
		</>
	);
}

export default MyEditor;