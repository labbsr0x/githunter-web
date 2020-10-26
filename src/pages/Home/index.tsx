import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import GraphCard from '../../components/GraphCard/GraphCard';
import Api, { RepositoryStats } from '../../services/api';

const api = new Api();

const Home: React.FC = () => {
  const [cards, setCards] = useState<RepositoryStats[]>([]);

  useEffect(() => {
    api.getAllRepositories().then(response => {
      setCards(response);
    });
  }, []);

  return (
    <Container maxWidth="md">
      <Grid container spacing={4}>
        {cards.length &&
          cards.map(card => (
            <Grid item xs={12} sm={6} md={4}>
              <GraphCard {...card} />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default Home;
