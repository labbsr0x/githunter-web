/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import GraphCard from '../../components/GraphCard/GraphCard';

const cards = [
  {
    frequency: 10,
    definitionOSS: 1,
    popularity: 3,
    friendly: 2,
    quality: 2,
    name: 'teste',
    owner: 'teste',
    provider: 'github',
    language: ['nodejs'],
  },
  {
    frequency: 2,
    definitionOSS: 1,
    popularity: 3,
    friendly: 2,
    quality: 2,
    name: 'teste',
    owner: 'teste',
    provider: 'github',
    language: ['nodejs'],
  },
  {
    frequency: 2,
    definitionOSS: 1,
    popularity: 3,
    friendly: 2,
    quality: 2,
    name: 'teste',
    owner: 'teste',
    provider: 'github',
    language: ['nodejs'],
  },
  {
    frequency: 10,
    definitionOSS: 1,
    popularity: 3,
    friendly: 2,
    quality: 2,
    name: 'teste',
    owner: 'teste',
    provider: 'github',
    language: ['nodejs'],
  },
  {
    frequency: 2,
    definitionOSS: 1,
    popularity: 3,
    friendly: 2,
    quality: 2,
    name: 'teste',
    owner: 'teste',
    provider: 'github',
    language: ['nodejs'],
  },
  {
    frequency: 2,
    definitionOSS: 1,
    popularity: 3,
    friendly: 2,
    quality: 2,
    name: 'teste',
    owner: 'teste',
    provider: 'github',
    language: ['nodejs'],
  },
];

const Home: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Grid container spacing={4}>
        {cards.map(card => (
          <Grid item xs={12} sm={6} md={4}>
            <GraphCard {...card} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
