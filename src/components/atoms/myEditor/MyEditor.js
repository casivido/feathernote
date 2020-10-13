// External
import React, {useEffect, useState, useCallback} from 'react';
import {EditorState, convertToRaw, convertFromRaw} from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import styled from 'styled-components';
import 'draft-js/dist/Draft.css';

// Internal
import EditorOverlays from '../EditorOverlays/EditorOverlays';
import {setFocusToEnd, handleKeyCommand} from './editorHelpers';

// Editor Plugins
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
	const [localContent] = useState(JSON.parse(localStorage.getItem('rawEditorContent')));
	const [editorState, setEditorState] = useState(
		localContent
			? EditorState.createWithContent(convertFromRaw(localContent))
			: EditorState.createEmpty()
	);

	// Keep curried function bound to current state
	const mySetFocusToEnd = useCallback(setFocusToEnd(editorState, setEditorState), [editorState, setEditorState]);

	// Start with focus at the end
	useEffect(mySetFocusToEnd, []);

	// Keep local storage up to date, TODO: debounce unnecessary amounts of saving
	useEffect(() => {
		localStorage.setItem('rawEditorContent', JSON.stringify(convertToRaw(editorState.getCurrentContent())))
	}, [editorState]);

	return (
		<>
			<EditorOverlays />
			<Title>Main</Title>
			<StyledContainer
				onClick={mySetFocusToEnd}
			>
				<Editor
					editorState={editorState}
					handleKeyCommand={handleKeyCommand(setEditorState)}
					onChange={setEditorState}
					plugins={[autoListPlugin, listDepthPlugin]}
				/>
				<ScrollPaddingDiv />
			</StyledContainer>
		</>
	);
}

export default MyEditor;