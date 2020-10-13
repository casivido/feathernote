import React from 'react';
import styled from 'styled-components';

const TopOverlay = styled.div`
	position: absolute;
	top: 0;
	height: 200px;
	width: 60vw;
	left: 20vw;
	z-index: 99;

	background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 45%);
	transform: matrix(1, 0, 0, -1, 0, 0);
`;

const BottomOverlay = styled.div`
	position: absolute;
	height: 100px;
	bottom: 0;
	width: 60vw;
	left: 20vw;
	z-index: 99;

	background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 40%);
`;

const EditorOverlays = () => <>
	<TopOverlay />
	<BottomOverlay />
</>

export default EditorOverlays;