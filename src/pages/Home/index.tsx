import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';

import GraphCard from '../../components/GraphCard/GraphCard';
import Api, { RepositoryStats } from '../../services/api';

const api = new Api();

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    searchBar: {
      display: 'flex',
      flex: 1,
      height: theme.spacing(6),
      margin: theme.spacing(0, 0, 2),
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    card: {
      display: 'flex',
      justifyContent: 'center',
    },
  }),
);

const Home: React.FC = () => {
  const classes = useStyles();
  const [cards, setCards] = useState<RepositoryStats[]>([]);

  useEffect(() => {
    api.getAllRepositories().then(response => {
      setCards(response);
    });
  }, []);

  return (
    <Container maxWidth="md" className={classes.root}>
      <Paper component="form" className={classes.searchBar}>
        <InputBase
          className={classes.input}
          placeholder="Search"
          inputProps={{ 'aria-label': 'search' }}
        />
      </Paper>
      <Grid container spacing={4}>
        {Array.isArray(cards) &&
          cards.map(card => (
            <Grid className={classes.card} item xs={12} sm={6} md={4}>
              <GraphCard {...card} />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default Home;
