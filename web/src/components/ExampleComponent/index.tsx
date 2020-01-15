import React from 'react';

import { Container } from './styles';

interface Props {
  title: string;
  color?: string;
}

export default function ExampleComponent({ title, color }: Props) {
  return (
    <Container color={color}>
      <h1>{title}</h1>
    </Container>
  );
}
