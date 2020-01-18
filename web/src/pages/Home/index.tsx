import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { DevCard, DevForm } from '~/components';
import api from '~/services/api';

import { DevInterface } from '../../../../backend/src/models/Dev';


export default function Home() {
  const [devs, setDevs] = useState<DevInterface[]>([]);

  useEffect(() => {
    async function fetchDevs() {
      try {
        const response = await api.get('/devs');

        setDevs(response.data);
      } catch (error) {
        console.log(`Algo deu errado: ${error.message}`);
      }
    }

    fetchDevs();
  }, []);

  async function handleAddDev(data: DevInterface) {
    try {
      const response = await api.post('devs', data);

      setDevs([...devs, response.data]);
    } catch (err) {
      console.log('Error', err);
    }
  }

  return (
    <Container>
      <DevForm onSubmit={handleAddDev} />

      <main>
        <ul>
          { devs?.map(dev => <DevCard key={dev._id} dev={dev} />) }
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
