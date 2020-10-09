import React from 'react';
import styled, {keyframes} from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const StyledImg = styled.img`
    position: absolute;
    height: 100px;
    right: 50px;
    bottom: 50px;

    @media (prefers-reduced-motion: no-preference) {
        animation: ${rotate} infinite .2s linear;
    }
`

const CornerIcon = ({src}) => (
    <StyledImg src={src} alt="Corner Icon" />
)

export default CornerIcon;