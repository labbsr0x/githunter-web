import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';

import CardActions from '@material-ui/core/CardActions';
import RepositoryRadar from '../RepositoryRadar/RepositoryRadar';
import AvatarProviderIcon from '../AvatarProviderIcon/AvatarProviderIcon';
import LanguageIcon from '../LanguageIcon/LanguageIcon';

interface RepositoryDetails {
  lastScraperDate: string;
  description: string;
  stars: number;
  forks: number;
}

interface RepositoryData {
  frequency: number;
  definitionOSS: number;
  popularity: number;
  friendly: number;
  quality: number;
  name?: string;
  owner?: string;
  provider: string;
  language?: string[];
}

interface RepositorySummaryProps {
  dataCard: RepositoryData;
  detailsRepo?: RepositoryDetails;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

const RepositorySummary: React.FC<RepositorySummaryProps> = ({
  dataCard,
  detailsRepo,
}: RepositorySummaryProps) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea
        href={`https://www.${dataCard.provider}.com/${dataCard.owner}/${dataCard.name}`}
      >
        <CardHeader
          avatar={<AvatarProviderIcon provider={dataCard.provider} />}
          title={`${dataCard.owner}/${dataCard.name}`}
        />
      </CardActionArea>

      <CardContent>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography paragraph>{detailsRepo?.description}</Typography>
            <Typography>{`Last Scraper: ${detailsRepo?.lastScraperDate}`}</Typography>
            <Typography>Stars: {detailsRepo?.stars}</Typography>
            <Typography paragraph>Forks: {detailsRepo?.forks}</Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <RepositoryRadar
              repositoryData={dataCard}
              configPlot={{
                width: '100%',
                height: window.innerWidth > 375 ? 352 : 288,
                color: '#3f51b5',
              }}
            />
          </Grid>
        </Grid>
      </CardContent>

      <CardActions>
        {dataCard.language &&
          dataCard.language.map((lang: any) => LanguageIcon({ lang }))}
      </CardActions>
    </Card>
  );
};

RepositorySummary.defaultProps = {
  detailsRepo: {
    lastScraperDate: '',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent semper orci vitae urna laoreet, ut placerat augue cursus. Maecenas condimentum.',
    stars: 0,
    forks: 0,
  },
};

export default RepositorySummary;
