import React, {useState, useCallback, useRef, useMemo, useEffect} from 'react';
import styled from 'styled-components';
import {ContentState, convertToRaw, convertFromRaw} from 'draft-js';

import logo from '../../../images/logo.svg';
import MyEditor from '../../molecules/MyEditor/MyEditor';
import CornerIcon from '../../atoms/CornerIcon/CornerIcon';
import NoteSelector from '../../atoms/NoteSelector/NoteSelector';
import Toolbar from '../../atoms/Toolbar/Toolbar';

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

	.title {
		border: none;
		border-bottom: black solid .1rem;
		border-radius: 12px;
		font-size: 4rem;
		font-weight: 200;
		margin: 2rem 0 0 2rem;
		text-transform: uppercase;
	}

	input:focus { outline: none; }
`;

const HeaderWrapper = styled.div`
	position: absolute;
	width: 100vw;
	z-index: 999;
`;

const Title = styled.input`
	border-bottom: black solid .1rem;
	border-radius: 12px;
	border: none;
	font-family: Montserrat;
	font-size: 4rem;
	font-weight: lighter;
	margin: 2.5rem 0 0 2.5rem;
	min-width: 1rem;
	text-transform: uppercase;
	width: ${props => (props.width)}px;
`;
const TitleMeasurer = styled.span`
	border-bottom: black solid .1rem;
	border-radius: 12px;
	border: none;
	font-family: Montserrat;
	font-size: 4rem;
	font-weight: lighter;
	margin: 3rem 0 0 3rem;
	position: absolute;
	text-transform: uppercase;
	visibility: hidden;
`;

const App = () => {
	const [rawNoteData, setRawNoteData] = useState(JSON.parse(localStorage.getItem('noteContents')) || [DEFAULT_NOTE]);
	const [currentNoteId, setCurrentNoteId] = useState(0);
	const titleRef = useRef();

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
	}, [currentNoteId, currentNoteData]);

	const handleTitleChange = evt => {
		if((evt.target.value.length < 15) && (currentNoteData.title !== evt.target.value)){
			saveCurrentNote({title: evt.target.value});
		}
	};

	const [editorState, setEditorState] = useState();

	const updateEditorState = editorState => {
		saveCurrentNote({editorContent: editorState.getCurrentContent()});
	}

	// TODO: make font not load so this works on initial load to remove +5
	const [initialWidth, setInitialWidth] = useState(10);
	const [width, setWidth] = useState(0);
	useEffect(() => {
		setWidth(titleRef.current ? titleRef.current.offsetWidth + initialWidth : 100);
		setInitialWidth(0);
	}, [currentNoteData.title]);

	return (
		<div id="AppRoot" className="App">
			<Container>
				<NoteSelector
					setCurrentNoteId={setCurrentNoteId}
					currentNoteId={currentNoteId}
					noteTitles={rawNoteData.map(note => note.title)}
				/>
				<HeaderWrapper>
					<Title type="text" value={currentNoteData.title} width={width} onChange={handleTitleChange}/>
					<TitleMeasurer ref={titleRef}>{currentNoteData.title}</TitleMeasurer>
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