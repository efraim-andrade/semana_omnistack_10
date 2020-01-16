import React from 'react';
import styled from 'styled-components';

export default function DevCard() {
  return (
    <Container>
      <header>
        <img
          alt="Github Profile Avatar"
          title="Github Profile Avatar"
          src="https://avatars1.githubusercontent.com/u/28229600?s=460&v=4"
        />

        <div className="user-info">
          <strong>Efraim Andrade</strong>

          <span>ReactJS, React Native, NodeJS</span>
        </div>
      </header>

      <p>Mobile e Front-end Developer</p>

      <a href="https://github.com/efraim-andrade">Acessar perfil no Github</a>
    </Container>
  );
}

const Container = styled.li`
  border-radius: 2px;
  padding: 30px 20px;
  box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.02);

  background: #fff;

  > header {
    display: flex;
    flex-direction: row;
    align-items: center;

    > img {
      width: 54px;
      height: 54px;
      border-radius: 50%;
    }

    .user-info {
      margin-left: 10px;

      > strong {
        display: block;

        color: #333;
        font-size: 16px;
      }

      > span {
        margin-top: 2px;

        color: #999;
        font-size: 13px;
      }
    }
  }

  > p {
    margin: 10px 0;

    color: #666;
    font-size: 14px;
    line-height: 20px;
  }

  > a {
    color: #8e4dff;
    font-size: 14px;
    transition: .3s;

    &:hover {
      color: #5a2ea6;
    }
  }
`;
