import React from "react";
import styled, { keyframes } from "styled-components";

const CornerIcon = ({ src }) => <StyledImg src={src} alt="Corner Icon" />;

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
  height: 60px;
  right: 50px;
  bottom: 40px;

  @media (prefers-reduced-motion: no-preference) {
    animation: ${rotate} infinite 40s linear;
  }
`;

export default CornerIcon;
