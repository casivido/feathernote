import React from 'react';
import logo from '../../../images/logo.svg';
import MyEditor from '../../molecules/MyEditor/MyEditor';
import CornerIcon from '../../atoms/CornerIcon/CornerIcon';
import styled from 'styled-components';

// Load Montserrat typeface
import 'typeface-montserrat';

const titleText = 'Main';

const App = () => (
	<div className="App">
		<Container>
			<Title>{titleText.toUpperCase()}</Title>
			<MyEditor />
			<CornerIcon src={logo} />
		</Container>
	</div>
);

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