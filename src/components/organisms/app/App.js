import React, {useState, useCallback, useMemo} from 'react';
import styled from 'styled-components';
import {ContentState, convertToRaw, convertFromRaw} from 'draft-js';

import logo from '../../../images/logo.svg';
import MyEditor from '../../molecules/MyEditor/MyEditor';
import CornerIcon from '../../atoms/CornerIcon/CornerIcon';
import NoteSelector from '../../atoms/NoteSelector/NoteSelector';

// Load Montserrat typeface
import 'typeface-montserrat';

const DEFAULT_NOTE = {
	title: 'Main',
	content: convertToRaw(new ContentState.createFromText(''))
};

const Container = styled.div`
	background-color: white;
	color: black;
	font-family: Montserrat;
	font-size: 16px;
	height: 100vh;
	overflow-y: hidden;
	width: 100vw;
`;

const Title = styled.h1`
	border-bottom: black solid .1rem;
	border-radius: 12px;
	font-size: 4rem;
	font-weight: 200;
	left: 40px;
	margin: 0;
	padding: 0 10px 0 5px;
	position: absolute;
	top: 30px;
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

	const saveCurrentNoteContent = useCallback((editorContent) => {
		let newRawNoteData = rawNoteData;
		newRawNoteData[currentNoteId] = {
			title: currentNoteData.title,
			content: convertToRaw(editorContent)
		};

		localStorage.setItem(`noteContents`, JSON.stringify(newRawNoteData));
	}, [currentNoteId, currentNoteData]);

	return (
		<div className="App">
			<Container>
				<Title>{currentNoteData.title.toUpperCase()}</Title>
				<NoteSelector
					setCurrentNoteId={setCurrentNoteId}
					currentNoteId={currentNoteId}
					noteTitles={rawNoteData.map(note => note.title)}
				/>
				<MyEditor
					content={currentNoteData.content}
					currentNoteId={currentNoteId}
					saveContent={saveCurrentNoteContent}
				/>
				<CornerIcon src={logo} />
			</Container>
		</div>
	);
};

export default App;