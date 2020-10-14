import React from 'react';
import PropTypes from 'prop-types';
import { RichUtils } from 'draft-js';
import styled from 'styled-components';

import unorderedList from '../../../images/unordered-list.svg';
import orderedList from '../../../images/ordered-list.svg';

const Wrapper = styled.div`
    left: 20vw;
    position: absolute;
    text-align: center;
    top: 40px;
    z-index: 999;
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
        value: 'H1',
        getNewEditorState: (editorState) =>
            RichUtils.toggleBlockType(editorState, 'header-one'),
        title: 'Header 1'
    },
    header2: {
        value: 'H2',
        getNewEditorState: (editorState) =>
            RichUtils.toggleBlockType(editorState, 'header-two'),
        title: 'Header 2'
    },
    bold: {
        value: 'B',
        class: 'bold',
        getNewEditorState: (editorState) => RichUtils.toggleInlineStyle(editorState, 'BOLD'),
        title: 'Bold'
    },
    italic: {
        value: 'I',
        class: 'italic',
        getNewEditorState: (editorState) =>
            RichUtils.toggleInlineStyle(editorState, 'ITALIC'),
        title: 'Italic'
    },
    underline: {
        value: 'U',
        class: 'underline',
        getNewEditorState: (editorState) =>
            RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'),
        title: 'Underline'
    },
    ul: {
        value: <img src={unorderedList} />,
        getNewEditorState: (editorState) =>
            RichUtils.toggleBlockType(editorState, 'unordered-list-item'),
        title: 'Unordered List'
    },
    ol: {
        value: <img src={orderedList} />,
        getNewEditorState: (editorState) =>
            RichUtils.toggleBlockType(editorState, 'ordered-list-item'),
        title: 'Ordered List'
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
        {toolbarLayout.map(category => (
            <CategoryWrapper>
                {category.map(buttonKey => {
                    const buttonData = toolbarButtons[buttonKey];

                    return <StyleButton
                        className={buttonData.class || ''}
                        onMouseDown={evt => {
                            evt.preventDefault();
                            if (buttonData.getNewEditorState) {
                                setEditorState(buttonData.getNewEditorState(editorState));
                            }
                        }}
                        alt={buttonData.title}
                    >
                        <span>{buttonData.value}</span>
                    </StyleButton>
                })}
            </CategoryWrapper>
        ))}
    </Wrapper>
);

Toolbar.propTypes = {
	editorState: PropTypes.object.isRequired,
	setEditorState: PropTypes.func.isRequired
};

export default Toolbar;
