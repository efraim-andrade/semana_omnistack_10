import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

type Props = {
  onSubmit: Function;
}

export default function DevForm({ onSubmit }: Props) {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const [github_username, setGithubUsername] = useState('');
  const [techs, setTechs] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      () => {
        console.log('Algo deu errado ao buscar as coordenadas');
      },
      {
        timeout: 30000,
      },
    );
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await onSubmit({
      github_username,
      techs,
      latitude,
      longitude,
    });

    setGithubUsername('');
    setTechs('');
  }

  return (
    <Container>
      <strong>Cadastrar</strong>

      <form onSubmit={handleSubmit}>
        <div className="input-block">
          <label htmlFor="github_username">Usuário do github</label>
          <input
            required
            value={github_username}
            id="github_username"
            name="github_username"
            onChange={e => setGithubUsername(e.target.value)}
          />
        </div>

        <div className="input-block">
          <label htmlFor="techs">Tecnologias</label>
          <input
            required
            id="techs"
            name="techs"
            value={techs}
            onChange={e => setTechs(e.target.value)}
          />
        </div>

        <div className="input-group">
          <div className="input-block">
            <label htmlFor="latitude">Latitude</label>
            <input
              required
              id="latitude"
              type="number"
              name="latitude"
              value={latitude}
              onChange={e => setLatitude(Number(e.target.value))}
            />
          </div>

          <div className="input-block">
            <label htmlFor="longitude">Longitude</label>
            <input
              required
              type="number"
              id="longitude"
              name="longitude"
              value={longitude}
              onChange={e => setLongitude(Number(e.target.value))}
            />
          </div>
        </div>

        <button type="submit">Salvar</button>
      </form>
    </Container>
  );
}

const Container = styled.aside`
    width: 320px;
    border-radius: 2px;
    padding: 30px 20px;
    box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.02);

    background: #fff;

    @media screen and (max-width: 1000px) {
      width: 100%;
    }

    > strong {
      display: block;

      color: #333;
      font-size: 20px;
      text-align: center;
    }

    > form {
      margin-top: 30px;

      .input-block {
        & + .input-block {
          margin-top: 20px;
        }

        label {
          display: block;

          color: #acacac;
          font-size: 14px;
          font-weight: bold;
        }

        input {
          width: 100%;
          height: 32px;
          border: 0;
          border-bottom: 1px solid #eee;

          color: #666;
          font-size: 14px;
        }
      }

      .input-group {
        margin-top: 20px;

        display: grid;
        gap: 20px;
        grid-template-columns: 1fr 1fr;

        > .input-block {
          margin-top: 0;
        }
      }

      button[type="submit"] {
        width: 100%;
        border: 0;
        margin-top: 30px;
        border-radius: 2px;
        padding: 15px 20px;

        color: #fff;
        cursor: pointer;
        font-size: 16px;
        font-weight: bold;
        background: #7d40e7;
        transition: 0.5s;

        &:hover {
          background: #6931ca;
        }
      }
    }

`;
