import React from 'react';
import PropTypes from 'prop-types';
import { RichUtils } from 'draft-js';
import styled from 'styled-components';

import unorderedList from '../../../images/unordered-list.svg';
import orderedList from '../../../images/ordered-list.svg';

const Wrapper = styled.div`
	z-index: 999;
	margin-left: 40px;
	display: inline-block;
	transform: translateY(-15px);
`;

const CategoryWrapper = styled.div`
	display: inline-block;
	margin: 0 5px;

	&:not(:last-child) {
		border-right: solid black 1px;
		padding-right: 10px;
	}
`;

const StyleButton = styled.div`
	border-radius: 15px;
	border: black solid 1px;
	display: inline-block;
	height: 2rem;
	margin: 10px;
	padding: 5px;
	text-align: center;
	width: 2rem;

	span {
		vertical-align: -webkit-baseline-middle;
	}

	img {
		margin-top: 5px;
	}

	&.bold {
		font-weight: bold;
	}
	&.italic {
		font-style: italic;
	}
	&.underline {
		text-decoration: underline;
	}
`;

const toolbarButtons = {
	header1: {
		label: 'H1',
		getNewEditorState: (editorState) =>
			RichUtils.toggleBlockType(editorState, 'header-one'),
		name: 'Header 1'
	},
	header2: {
		label: 'H2',
		getNewEditorState: (editorState) =>
			RichUtils.toggleBlockType(editorState, 'header-two'),
		name: 'Header 2'
	},
	bold: {
		label: 'B',
		classes: 'bold',
		getNewEditorState: (editorState) => RichUtils.toggleInlineStyle(editorState, 'BOLD'),
		name: 'Bold'
	},
	italic: {
		label: 'I',
		classes: 'italic',
		getNewEditorState: (editorState) =>
			RichUtils.toggleInlineStyle(editorState, 'ITALIC'),
		name: 'Italic'
	},
	underline: {
		label: 'U',
		classes: 'underline',
		getNewEditorState: (editorState) =>
			RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'),
		name: 'Underline'
	},
	ul: {
		label: <img src={unorderedList} alt="UL" />,
		getNewEditorState: (editorState) =>
			RichUtils.toggleBlockType(editorState, 'unordered-list-item'),
		name: 'Unordered List'
	},
	ol: {
		label: <img src={orderedList} alt="OL" />,
		getNewEditorState: (editorState) =>
			RichUtils.toggleBlockType(editorState, 'ordered-list-item'),
		name: 'Ordered List'
	}
};

const defaultButtonLayout = [
	['header1', 'header2'],
	['bold', 'italic', 'underline'],
	['ul', 'ol']
];

const Toolbar = ({
	editorState,
	setEditorState,
	toolbarLayout = defaultButtonLayout
}) => (
	<Wrapper>
		{toolbarLayout.map((category, index) => (
			<CategoryWrapper key={index}>
				{category.map(buttonKey => {
					const buttonData = toolbarButtons[buttonKey];

					return <StyleButton
						className={buttonData.classes || ''}
						key={buttonKey}
						onMouseDown={evt => {
							evt.preventDefault();
							if (buttonData.getNewEditorState) {
								setEditorState(buttonData.getNewEditorState(editorState));
							}
						}}
						alt={buttonData.name}
					>
						<span>{buttonData.label}</span>
					</StyleButton>
				})}
			</CategoryWrapper>
		))}
	</Wrapper>
);

Toolbar.propTypes = {
	editorState: PropTypes.object.isRequired,
	setEditorState: PropTypes.func.isRequired,
	toolbarLayout: PropTypes.array
};

export default Toolbar;
