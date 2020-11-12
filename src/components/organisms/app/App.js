import React, {useState, useCallback, useMemo} from 'react';
import styled from 'styled-components';
import {ContentState, convertToRaw, convertFromRaw} from 'draft-js';

import logo from '../../../images/logo.svg';
import MyEditor from '../../molecules/MyEditor/MyEditor';
import CornerIcon from '../../atoms/CornerIcon/CornerIcon';
import NoteSelector from '../../atoms/NoteSelector/NoteSelector';
import Toolbar from '../../atoms/Toolbar/Toolbar';
import FlexibleTextInput from '../../atoms/FlexibleTextInput/FlexibleTextInput';

const deepEqual = require('deep-equal');

const DEFAULT_NOTE = {
	title: 'Main',
	content: convertToRaw(new ContentState.createFromText(''))
};

const Container = styled.div`
	background-color: white;
	color: black;
	font-size: 16px;
	height: 100vh;
	overflow-y: hidden;
	width: 100vw;

	input:focus { outline: none; }
`;

const HeaderWrapper = styled.div`
	position: absolute;
	width: 100vw;
	z-index: 999;
`;

const App = () => {
	const [rawNoteData, setRawNoteData] = useState(JSON.parse(localStorage.getItem('noteContents')) || [DEFAULT_NOTE]);
	const [currentNoteId, setCurrentNoteId] = useState(0);

	const currentNoteData = useMemo(() => {
		if(rawNoteData[currentNoteId]) {
			return {
				...rawNoteData[currentNoteId],
				content: convertFromRaw(rawNoteData[currentNoteId].content)
			};
		} else {
			const newContent = new ContentState.createFromText('');
			const newNoteData = {
				content: newContent,
				title: `Note ${currentNoteId}`
			}
			let newRawNoteData = rawNoteData;
			newRawNoteData[currentNoteId] = {...newNoteData, content: convertToRaw(newContent)}
			setRawNoteData(newRawNoteData);
			return newNoteData;
		};
	}, [rawNoteData, currentNoteId]);

	const saveCurrentNote = useCallback(({editorContent, title}) => {
		let newRawNoteData = [...rawNoteData];
		newRawNoteData[currentNoteId] = {
			title: title !== undefined ? title : currentNoteData.title,
			content: convertToRaw(editorContent || currentNoteData.content)
		};

		const notesChanged = newRawNoteData[currentNoteId].title !== currentNoteData.title
			|| !deepEqual(newRawNoteData[currentNoteId].content, rawNoteData[currentNoteId].content);
		if(notesChanged) {
			localStorage.setItem(`noteContents`, JSON.stringify(newRawNoteData));
			setRawNoteData(newRawNoteData);
		}
	}, [currentNoteId, currentNoteData]); // eslint-disable-line

	const handleTitleChange = title => {
		if((title.length < 15) && (currentNoteData.title !== title)){
			saveCurrentNote({title: title});
		}
	};

	const [editorState, setEditorState] = useState();

	const updateEditorState = editorState => {
		saveCurrentNote({editorContent: editorState.getCurrentContent()});
	}

	return (
		<div id="AppRoot" className="App">
			<Container>
				<NoteSelector
					setCurrentNoteId={setCurrentNoteId}
					currentNoteId={currentNoteId}
					noteTitles={rawNoteData.map(note => note.title)}
				/>
				<HeaderWrapper>
					<FlexibleTextInput text={currentNoteData.title} updateText={handleTitleChange} />
					<Toolbar editorState={editorState} setEditorState={setEditorState} />
				</HeaderWrapper>
				<MyEditor
					content={currentNoteData.content}
					currentNoteId={currentNoteId}
					saveContent={saveCurrentNote}
					updateParentEditorState={updateEditorState}
				/>
				<CornerIcon src={logo} />
			</Container>
		</div>
	);
};

export default App;