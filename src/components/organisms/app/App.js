import React, {useState, useCallback} from 'react';
import logo from '../../../images/logo.svg';
import MyEditor from '../../molecules/MyEditor/MyEditor';
import CornerIcon from '../../atoms/CornerIcon/CornerIcon';
import styled from 'styled-components';
import {ContentState, convertToRaw, convertFromRaw} from 'draft-js';

// Load Montserrat typeface
import 'typeface-montserrat';

const DEFAULT_NOTE = {
	0: {
		title: 'Main',
		content: convertToRaw((new ContentState.createFromText('')))
	}
};

const App = () => {
	const [noteData, setNoteData] = useState(JSON.parse(localStorage.getItem('noteContents')) || DEFAULT_NOTE);

	const [currentNoteId, setCurrentNoteId] = useState(Object.keys(noteData)[0]);

	const saveCurrentNoteContent = useCallback((editorContent) => {
		localStorage.setItem(`noteContents`, JSON.stringify({
			...noteData,
			[currentNoteId]: {
				title: noteData[currentNoteId].title,
				content: convertToRaw(editorContent)
			}
		}));
	}, [currentNoteId, noteData]);

	return (
		<div className="App">
			<Container>
				<Title>{noteData[currentNoteId].title.toUpperCase()}</Title>
				<MyEditor
					content={convertFromRaw(noteData[currentNoteId].content)}
					saveContent={saveCurrentNoteContent}
				/>
				<CornerIcon src={logo} />
			</Container>
		</div>
	);
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

export default App;