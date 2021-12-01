import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { debounce } from "lodash";

const NoteSelector = ({
  currentNoteId,
  noteTitles,
  setCurrentNoteId,
  reorderNotes = () => {},
  deleteCallback = () => {},
}) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <NotesWrapper>
        {noteTitles.map((title, index) => (
          <NoteItem
            id={index}
            title={title}
            selectFn={setCurrentNoteId}
            currentNote={currentNoteId === index}
            reorderNotes={reorderNotes}
            deleteCallback={deleteCallback}
          />
        ))}
        <NoteItem
          id={noteTitles.length}
          title="+"
          selectFn={setCurrentNoteId}
          reorderNotes={reorderNotes}
          currentNote={false}
        />
      </NotesWrapper>
    </DndProvider>
  );
};

const NoteDropper = ({ id, children, reorderNotes }) => {
  const [{ isOver, isDragging }, drop] = useDrop({
    accept: "note",
    drop: (item) => reorderNotes(item.id, id),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      isDragging: !!monitor.getItem(),
    }),
  });

  return (
    <NotesDropper ref={drop} dragging={isDragging} hovering={isOver}>
      {children}
    </NotesDropper>
  );
};

const NoteItem = ({
  id,
  title,
  currentNote,
  reorderNotes,
  selectFn,
  deleteCallback,
}) => {
  const [{ isDragging }, drag] = useDrag({
    item: {
      id,
      type: "note",
    },
    canDrag: () => !!deleteCallback,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [isDeleting, setIsDeleting] = useState(false);

  // After setting isDeleting, clear it after X seconds
  const clearDeletingIndexSoon = useCallback(
    debounce(() => {
      if (isDeleting) {
        setIsDeleting(false);
      }
    }, 1500),
    [isDeleting, setIsDeleting]
  );
  useEffect(clearDeletingIndexSoon, [isDeleting]);

  const label = isDeleting ? "Delete" : title;
  const click = (evt) => {
    isDeleting ? deleteCallback(id) : selectFn(id);
  };
  const classes =
    "" + (currentNote ? " current" : "") + (isDragging ? " dragging" : "");

  return (
    <NoteDropper id={id} reorderNotes={reorderNotes}>
      <NoteListItem ref={drag} className={classes} key={id} onClick={click}>
        {isDeleting || !deleteCallback ? null : (
          <DeleteButton onClick={() => setIsDeleting(true)}>X</DeleteButton>
        )}
        {label}
      </NoteListItem>
    </NoteDropper>
  );
};

const NotesDropper = styled.div`
  ${({ dragging }) =>
    dragging &&
    `transition-property: padding-top;
    transition-duration: 0.5s;
    transition-delay: 0s;
  `}

  ${({ hovering }) => hovering && "padding-top: calc(20px + 1rem);"}
`;

const NotesWrapper = styled.div`
  text-align: center;
  border-left: solid black 2px;
  left: 10px;
  padding-left: 10px;
  padding: 10px 0px 10px 5px;
  position: absolute;
  top: calc(150px + 5vh);
`;

const NoteListItem = styled.div`
  background: transparent;
  border: none;
  font-size: 1rem;
  margin: 10px 0;
  padding: 10px 25px;
  position: relative;
  text-transform: uppercase;

  transition-property: color, background-color, border, border-color, padding;
  transition-duration: 0.3s;
  transition-delay: 0s;

  &.current {
    border-left: black solid 1px;
  }

  &.dragging {
    display: none;
    background-color: transparent !important;
    * {
      border: none !important;
    }
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
  transition-duration: 0.3s;
  transition-delay: 0s;

  &:hover {
    background-color: white;
    color: black;
  }
`;

export default NoteSelector;
