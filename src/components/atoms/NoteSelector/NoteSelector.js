import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const NotesWrapper = styled.div`
	left: 10px;
    position: absolute;
    padding: 10px 0;
    padding-left: 10px;
    border-left: solid black 2px;
	text-align: center;
    top: 30vh;
`;

const NoteItem = styled.div`
    background: transparent;
    border: none;
    font-family: Monsterrat;
    font-size: 1rem;
    text-transform: uppercase;
    padding: 10px;
    margin: 10px 0;

    transition-property: color, background-color, border, border-color;
    transition-duration: 1s;
    transition-delay: 0s;

    &:hover{
        color: white;
        background-color: black;
    }
`;

// const getAbbr = title => {
//     title = title.
// }

const NoteSelector = ({
    noteTitles,
    setCurrentNoteId
}) => (
	<NotesWrapper>
		{noteTitles.map((title, index) => (
			<NoteItem key={index} onClick={() => setCurrentNoteId(index)}>
				{title}
			</NoteItem>
		))}
        <NoteItem key="new_note" onClick={() => setCurrentNoteId(noteTitles.length)}>
            +
        </NoteItem>
	</NotesWrapper>
);

export default NoteSelector;
