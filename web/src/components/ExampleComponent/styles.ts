import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  background: ${props => (props.color ? props.color : '#45f')};

  > h1 {
    color: #fff;
    font-size: 48px;
  }
`;
