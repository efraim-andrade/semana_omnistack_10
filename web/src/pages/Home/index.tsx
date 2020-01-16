import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { DevCard } from '~/components';
import api from '~/services/api';

import { DevInterface } from '../../../../backend/src/models/Dev';


export default function Home() {
  const [devs, setDevs] = useState<DevInterface[]>([]);

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

  useEffect(() => {
    async function fetchDevs() {
      try {
        const response = await api.get('/devs');

        setDevs(response.data);

        console.log('allDevs', response.data);
      } catch (error) {

      }
    }

    fetchDevs();
  }, []);

  async function handleAddDev(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const response = await api.post('devs', {
        github_username,
        techs,
        latitude,
        longitude,
      });

      setGithubUsername('');
      setTechs('');

      console.log('response', response.data);
    } catch (err) {
      console.log('Error', err);
    }
  }

  return (
    <Container>
      <aside>
        <strong>Cadastrar</strong>

        <form onSubmit={handleAddDev}>
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
      </aside>

      <main>
        <ul>
          <DevCard />

          <DevCard />

          <DevCard />
        </ul>
      </main>
    </Container>
  );
}

const Container = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  padding: 60px 30px;

  display: flex;
  flex-direction: row;
  align-items: flex-start;

  @media screen and (max-width: 1000px) {
    flex-direction: column;
  }

  > aside {
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
  }

  > main {
    flex: 1;
    margin-left: 30px;

    @media screen and (max-width: 1000px) {
      width: 100%;
      margin-left: 0;
      margin-top: 30px;
    }

    > ul {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;

      @media screen and (max-width: 650px) {
        grid-template-columns: 1fr;
      }
    }
  }
`;
