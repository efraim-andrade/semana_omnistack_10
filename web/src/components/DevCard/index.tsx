import React from 'react';
import styled from 'styled-components';

import { DevInterface } from '../../../../backend/src/models/Dev';

export type Props = {
  dev?: DevInterface;
}


export default function DevCard({ dev }: Props) {
  return (
    <Container>
      <header>
        <img
          alt="Github Profile Avatar"
          title="Github Profile Avatar"
          src={dev?.avatar_url}
        />

        <div className="user-info">
          <strong>{dev?.name}</strong>

          <span>{dev?.techs?.join(', ')}</span>
        </div>
      </header>

      <p>{dev?.bio}</p>

      <a href={`https://github.com/${dev?.github_username}`}>Acessar perfil no Github</a>
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
