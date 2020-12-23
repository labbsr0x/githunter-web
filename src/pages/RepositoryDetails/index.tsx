import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import {
  Container,
  createStyles,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';

import Api, { RepositoryStats, RequestHistoric } from '../../services/api';
import GraphCard from '../../components/GraphCard/GraphCard';

interface RequestHistoricParams {
  dateRange: RequestHistoric;
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
    card: {
      display: 'flex',
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
    const dateRange: RequestHistoric = {
      startDateTime: moment('20200101').format(),
      endDateTime: moment('20210101').format(),
    };

    const params: RequestHistoricParams = {
      dateRange,
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
    <Container maxWidth="md" className={classes.root}>
      <div style={{ marginBottom: 36 }}>
        {firstRepository ? (
          <GraphCard
            dataCard={firstRepository}
            isDetailRepoCard
            configPlot={{
              width: 492,
              height: 352,
              outerRadius: 158,
              positionX: 492 / 2,
              color: '#3f51b5',
            }}
          />
        ) : (
          <Typography>Loading...</Typography>
        )}
      </div>
      <Grid container spacing={8}>
        {Array.isArray(repositoryHistoric) &&
          repositoryHistoric.map(repo => (
            <Grid className={classes.card} item xs={12} md={6}>
              <GraphCard
                dataCard={repo}
                configPlot={{
                  width: 100,
                  height: 100,
                  outerRadius: 66,
                  positionX: 100 / 2,
                  color: '#3f51b5',
                }}
              />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default RepositoryDetails;
