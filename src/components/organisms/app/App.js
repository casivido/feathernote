import React, {useState, useCallback, useEffect, useMemo} from 'react';
import styled from 'styled-components';
import {ContentState, convertToRaw, convertFromRaw, EditorState} from 'draft-js';
import { debounce } from 'lodash';

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

	// ***** CONTENT State *****

	// Load note data or create a new note ONLY when currentNoteId change
	// (Data is otherwise stored in )
	const currentNoteContent = useMemo(() => {
		if(rawNoteData[currentNoteId]) {
			return convertFromRaw(rawNoteData[currentNoteId].content);
		} else {
			const newContent = new ContentState.createFromText('');
			const newNoteData = {
				content: newContent,
				title: `New Note`
			}
			let newRawNoteData = rawNoteData;
			newRawNoteData[currentNoteId] = {...newNoteData, content: convertToRaw(newContent)}
			setRawNoteData(newRawNoteData);
			return newContent;
		};
	}, [currentNoteId]); // eslint-disable-line

	const [editorState, setEditorState] = useState(EditorState.createWithContent(currentNoteContent));
	useEffect(() => setEditorState(EditorState.createWithContent(currentNoteContent)), [currentNoteContent])

	const saveCurrentNoteContent = useCallback(debounce(editorContent => {
		let newRawNoteData = [...rawNoteData];
		newRawNoteData[currentNoteId] = {
			...newRawNoteData[currentNoteId],
			content: convertToRaw(editorContent)
		};

		const notesChanged = !deepEqual(newRawNoteData[currentNoteId].content, rawNoteData[currentNoteId].content);
		if(notesChanged) {
			localStorage.setItem(`noteContents`, JSON.stringify(newRawNoteData));
			setRawNoteData(newRawNoteData);
		}
	}, 250), [currentNoteId, rawNoteData, currentNoteContent]); // eslint-disable-line

	const updateEditorState = editorState => {
		saveCurrentNoteContent(editorState.getCurrentContent());
		setEditorState(editorState);
	};

	// ***** TITLE State *****

	const [currentNoteTitle, setCurrentNoteTitle] = useState(rawNoteData[currentNoteId].title);
	useEffect(() => console.log('setting') || setCurrentNoteTitle(rawNoteData[currentNoteId].title), [currentNoteId]);
	console.log('currentNoteTitle', currentNoteTitle);

	const handleTitleChange = useCallback(title => {
		if(title != '' && currentNoteTitle !== title){
			let newRawNoteData = [...rawNoteData];
			newRawNoteData[currentNoteId] = {
				...newRawNoteData[currentNoteId],
				title: title
			};
			localStorage.setItem(`noteContents`, JSON.stringify(newRawNoteData));
			setCurrentNoteTitle(title);
			setRawNoteData(newRawNoteData);
		}
	});

	// ***** RENDER *****

	return (
		<div id="AppRoot" className="App">
			<Container>
				<NoteSelector
					setCurrentNoteId={setCurrentNoteId}
					currentNoteId={currentNoteId}
					noteTitles={rawNoteData.map(note => note.title)}
				/>
				<HeaderWrapper>
					<FlexibleTextInput text={currentNoteTitle} updateText={handleTitleChange} limit={15}/>
					<Toolbar editorState={editorState} setEditorState={setEditorState} />
				</HeaderWrapper>
				<MyEditor
					editorState={editorState}
					setEditorState={updateEditorState}
				/>
				<CornerIcon src={logo} />
			</Container>
		</div>
	);
};

export default App;