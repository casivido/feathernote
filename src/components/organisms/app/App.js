import React from 'react';
import logo from '../../../images/logo.svg';
import MyEditor from '../../atoms/MyEditor/MyEditor';
import CornerIcon from '../../atoms/CornerIcon/CornerIcon';
import styled from 'styled-components';

const Container = styled.div`
    background-color: black;
    color: white;
    height: 100vh;
    width: 100vw;
`;

function App() {
  return (
    <div className="App">
      <Container>
        <MyEditor />
        <CornerIcon src={logo} />
      </Container>
    </div>
  );
}

export default App;