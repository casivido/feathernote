import React from 'react';
import styled, {keyframes} from 'styled-components';

const CornerIcon = ({src}) => (
	<StyledImg src={src} alt="Corner Icon" />
)

const rotate = keyframes`
	from {
		transform: rotate(0deg);
	}

	to {
		transform: rotate(360deg);
	}
`;

// TODO: Correlate rotation with scroll position
const StyledImg = styled.img`
	position: absolute;
	height: 100px;
	right: 50px;
	bottom: 50px;

	@media (prefers-reduced-motion: no-preference) {
		animation: ${rotate} infinite .2s linear;
	}
`;

export default CornerIcon;