import React, {useState, useRef, useEffect} from 'react';
import styled from 'styled-components';

const Title = styled.input`
	border: none;
	border-bottom: black solid .1rem;
	border-radius: 12px;
	font-family: Montserrat;
	font-size: 4rem;
	font-weight: 200;
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
	font-weight: 200;
	margin: 3rem 0 0 3rem;
	position: absolute;
	text-transform: uppercase;
	visibility: hidden;
`;

const FlexibleTextInput = ({text = '', updateText = () => {}}) => {
	const titleRef = useRef();
	const [currentText, setCurrentText] = useState(text);
	useEffect(() => setCurrentText(text), [setCurrentText, text]);

	// TODO: Figure out why initial load is shorter
	const [initialWidth, setInitialWidth] = useState(10);
	const [width, setWidth] = useState(0);

	useEffect(() => {
		updateText(currentText);
		setWidth(titleRef.current ? titleRef.current.offsetWidth + initialWidth : 100);
		setInitialWidth(0);
	}, [currentText]); // eslint-disable-line

	return <>
		<Title type="text" value={currentText} width={width} onChange={evt => setCurrentText(evt.target.value)}/>
		<TitleMeasurer ref={titleRef}>{currentText}</TitleMeasurer>
	</>;
}

export default FlexibleTextInput;