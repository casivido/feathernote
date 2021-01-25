import React, {useEffect, useState, useCallback} from 'react';
import styled from 'styled-components';
import { debounce } from 'lodash';

const NotesWrapper = styled.div`
	text-align: center;
    border-left: solid black 2px;
    left: 10px;
    padding-left: 10px;
    padding: 10px 0px 10px 5px;
    position: absolute;
    top: calc(150px + 5vh);
`;

const NoteItem = styled.div`
    background: transparent;
    border: none;
    font-size: 1rem;
    margin: 10px 0;
    padding: 10px 25px;
    position: relative;
    text-transform: uppercase;

    transition-property: color, background-color, border, border-color;
    transition-duration: .5s;
    transition-delay: 0s;

    &.current {
        border-left: black solid 1px;
    }

    &:hover {
        border-color: white;
        background-color: black;
        color: white;

        div {
            border-color: black;
        }
    }
`;

const DeleteButton = styled.div`
    border: white solid 1px;
    box-sizing: border-box;
    color: white;
    height: 100%;
    left: 0;
    padding-top: 10px;
    position: absolute;
    top: 0;
    width: 1.5rem;

    transition-property: color, background-color, border-color;
    transition-duration: .5s;
    transition-delay: 0s;

    &:hover {
        background-color: white;
        color: black;
    }
`;

const NoteSelector = ({
    currentNoteId,
    noteTitles,
    setCurrentNoteId,
    deleteCallback = () => {}
}) => {
    const [deletingIndex, setDeletingIndex] = useState(null);

    // After setting deletingIndex, clear it after X seconds
    const clearDeletingIndexSoon = useCallback(debounce(() => {
        if(deletingIndex != null){
            setDeletingIndex(null);
        }
    }, 1500), [deletingIndex, setDeletingIndex]);
    useEffect(clearDeletingIndexSoon, [deletingIndex]);

    const deleteNote = useCallback(index => {
        setDeletingIndex(null);
        deleteCallback(index);
    }, [setDeletingIndex, deleteCallback]);

	return <NotesWrapper>
		{noteTitles.map((title, index) => (
            deletingIndex === index
                ? <NoteItem className={currentNoteId === index ? 'current' : ''} key={index} onClick={() => delete deleteNote(index)}>Delete</NoteItem>
                : <NoteItem className={currentNoteId === index ? 'current' : ''} key={index} onClick={() => setCurrentNoteId(index)}>
                    {noteTitles.length === 1 ? null : <DeleteButton onClick={evt => setDeletingIndex(index)}>X</DeleteButton>}
                    {title}
                </NoteItem>
		))}
        <NoteItem key="new_note" onClick={() => setCurrentNoteId(noteTitles.length)}>
            +
        </NoteItem>
	</NotesWrapper>
};

export default NoteSelector;
