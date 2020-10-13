import React from 'react';
import logo from '../../../images/logo.svg';
import MyEditor from '../../atoms/MyEditor/MyEditor';
import CornerIcon from '../../atoms/CornerIcon/CornerIcon';
import styled from 'styled-components';

// Load Montserrat typeface
import 'typeface-montserrat';

const App = () => (
	<div className="App">
		<Container>
			<MyEditor />
			<CornerIcon src={logo} />
		</Container>
	</div>
);

const Container = styled.div`
	background-color: white;
	color: black;
	font-size: 16px;
	height: 100vh;
	width: 100vw;
	font-family: Montserrat;
	overflow-y: hidden;
`;

export default App;