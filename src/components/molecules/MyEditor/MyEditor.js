// External
import React, {useEffect, useState, useCallback} from 'react';
import {EditorState} from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import styled from 'styled-components';
import 'draft-js/dist/Draft.css';

// Internal
import EditorOverlays from '../../atoms/EditorOverlays/EditorOverlays';
import {setFocusToEnd, handleKeyCommand} from './editorHelpers';

// Editor Plugins
import createAutoListPlugin from 'draft-js-autolist-plugin';
import createListDepthPlugin from 'draft-js-list-depth-plugin';
const listDepthPlugin = createListDepthPlugin()
const autoListPlugin = createAutoListPlugin()

const StyledContainer = styled.div`
	position: absolute;
	font-size: 1.2rem;
	left: 20vw;
	width: 60vw;
	height: 100vh;

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
		padding-top: 150px;
	}
`;

const ScrollPaddingDiv = styled.div`
	position: absolute;
	height: 90vh;
	width: 1px;
`;

// TODO: default props
const MyEditor = ({content, currentNoteId, updateParentEditorState = () => {}}) => {
	const [editorState, setEditorState] = useState(EditorState.createWithContent(content));
	useEffect(() => {
		setEditorState(EditorState.createWithContent(content))
	}, [currentNoteId]); // eslint-disable-line

	// Keep curried function bound to current state
	const setMyFocusToEnd = useCallback(setFocusToEnd(editorState, setEditorState), [editorState, setEditorState]);

	const onEditorChange = editorState => {
		updateParentEditorState(editorState);
		setEditorState(editorState);
	}
	return (
		<>
			<EditorOverlays />
			<StyledContainer
				onClick={setMyFocusToEnd}
			>
				<Editor
					editorState={editorState}
					handleKeyCommand={handleKeyCommand(setEditorState)}
					onChange={onEditorChange}
					plugins={[autoListPlugin, listDepthPlugin]}
					placeholder={"Hi there..."}
				/>
				<ScrollPaddingDiv />
			</StyledContainer>
		</>
	);
}

export default MyEditor;