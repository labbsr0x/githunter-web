import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  createStyles,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';

import Api, { RepositoryStats } from '../../services/api';
import RepositorySummary from '../../components/RepositorySummary/RepositorySummary';
import RepositoryCard from '../../components/RepositoryCard/RepositoryCard';

interface RequestHistoricParams {
  startDateTime?: string;
  endDateTime?: string;
  owner: string;
  name: string;
}

interface RouteParams {
  owner: string;
  name: string;
}

const api = new Api();

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
  }),
);

const RepositoryDetails: React.FC = () => {
  const classes = useStyles();
  const routeParams: RouteParams = useParams();
  const { owner, name } = routeParams;

  const [firstRepository, setFirstRepository] = useState<RepositoryStats>();
  const [repositoryHistoric, setRepositoryHistoric] = useState<
    RepositoryStats[]
  >([]);

  useEffect(() => {
    const params: RequestHistoricParams = {
      owner,
      name,
    };

    api.getRepositoryHistoric(params).then(response => {
      const repos: RepositoryStats[] = response;
      if (Array.isArray(repos)) {
        const first: RepositoryStats = repos[0];
        repos.splice(0, 1);
        setFirstRepository(first);
        if (repos.length > 0) {
          setRepositoryHistoric(repos);
        }
      }
    });
  }, [name, owner]);

  return (
    <Container maxWidth="lg" className={classes.root}>
      <div style={{ marginBottom: 36 }}>
        {firstRepository ? (
          <RepositorySummary dataCard={firstRepository} />
        ) : (
          <Typography>Loading...</Typography>
        )}
      </div>
      <Grid container spacing={4}>
        {Array.isArray(repositoryHistoric) &&
          repositoryHistoric.map(repo => (
            <Grid item xs={12} md={6}>
              <RepositoryCard historicCard dataCard={repo} />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default RepositoryDetails;
