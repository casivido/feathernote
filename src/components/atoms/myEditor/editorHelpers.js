import {EditorState, RichUtils} from 'draft-js';

const setFocusToEnd = (editorState, setEditorState) => () =>  {
	if (!editorState.getSelection().getHasFocus()) {
		setEditorState(EditorState.moveFocusToEnd(editorState));
	}
}

const handleKeyCommand = setEditorState => (command, editorState) => {
	const newState = RichUtils.handleKeyCommand(editorState, command);

	if (newState) {
		setEditorState(newState);
		return true;
	}

	return false;
}

export {setFocusToEnd, handleKeyCommand};