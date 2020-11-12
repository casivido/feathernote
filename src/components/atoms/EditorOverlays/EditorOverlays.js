import React from 'react';
import styled from 'styled-components';

const TopOverlay = styled.div`
	background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 20%);
	height: 160px;
	left: 20vw;
	pointer-events: none;
	position: absolute;
	top: 0;
	transform: matrix(1, 0, 0, -1, 0, 0);
	width: 60vw;
	z-index: 99;
`;

const BottomOverlay = styled.div`
	background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 40%);
	bottom: 0;
	height: 100px;
	left: 20vw;
	pointer-events: none;
	position: absolute;
	width: 60vw;
	z-index: 99;
`;

const EditorOverlays = () => <>
	<TopOverlay />
	<BottomOverlay />
</>

export default EditorOverlays;