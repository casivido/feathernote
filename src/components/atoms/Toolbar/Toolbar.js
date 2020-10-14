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

    &:not(:last-child) {
        border-right: solid black 1px;
        margin: 0 5px;
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

const Toolbar = ({ editorState, setEditorState }) => {
	const toolbarCategories = [
		[
            {
                value: 'H1',
                getNewEditorState: () =>
                    RichUtils.toggleBlockType(editorState, 'header-one'),
                title: 'Header 1'
            },
            {
                value: 'H2',
                getNewEditorState: () =>
                    RichUtils.toggleBlockType(editorState, 'header-two'),
                title: 'Header 2'
            }
        ],
		[
            {
                value: 'B',
                class: 'bold',
                getNewEditorState: () => RichUtils.toggleInlineStyle(editorState, 'BOLD'),
                title: 'Bold'
            },
            {
                value: 'I',
                class: 'italic',
                getNewEditorState: () =>
                    RichUtils.toggleInlineStyle(editorState, 'ITALIC'),
                title: 'Italic'
            },
            {
                value: 'U',
                class: 'underline',
                getNewEditorState: () =>
                    RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'),
                title: 'Underline'
            }
        ],
		[
            {
                value: <img src={unorderedList} />,
                getNewEditorState: () =>
                    RichUtils.toggleBlockType(editorState, 'unordered-list-item'),
                title: 'Unordered List'
            },
            {
                value: <img src={orderedList} />,
                getNewEditorState: () =>
                    RichUtils.toggleBlockType(editorState, 'ordered-list-item'),
                title: 'Ordered List'
            }
        ]
	];

	return (
		<Wrapper>
			{toolbarCategories.map(category => (
                <CategoryWrapper>
                    {category.map(item => (
                        <StyleButton
                            key={item.value}
                            className={item.class || ''}
                            title={item.title}
                            onMouseDown={evt => {
                                evt.preventDefault();
                                if (item.getNewEditorState) {
                                    setEditorState(item.getNewEditorState());
                                }
                            }}
                            alt={item.title}
                        >
                            <span>{item.value}</span>
                        </StyleButton>
                    ))}
                </CategoryWrapper>
            ))}
		</Wrapper>
	);
};

Toolbar.propTypes = {
	editorState: PropTypes.object.isRequired,
	setEditorState: PropTypes.func.isRequired
};

export default Toolbar;
