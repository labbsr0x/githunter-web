import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import { Link, Typography } from '@material-ui/core';

import {
  GithubIcon,
  GitlabIcon,
  NodeJSIcon,
  PythonIcon,
} from '../../assets/svg';
import RepositoryRadar from '../RepositoryRadar/RepositoryRadar';

interface GraphCardPlotConfig {
  width: number;
  height: number;
  outerRadius: number;
  positionX?: number;
  positionY?: number;
  color?: string;
}

interface GraphCardDetailsContent {
  lastScraperDate: string;
  description: string;
  starts: number;
  forks: number;
}

interface GraphCardData {
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

interface GraphCardProps {
  dataCard: GraphCardData;
  configPlot?: GraphCardPlotConfig;
  isDetailRepoCard?: boolean;
  detailsRepo?: GraphCardDetailsContent;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
    },
    cardHeader: {
      maxHeight: '8%',
      textAlign: 'end',
    },
    avatar: {
      backgroundColor: 'rgb(255,255,255,0)',
    },
    cardContent: {
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
    },
    cardDetailsContent: {
      flex: 1,
    },
    cardActions: {
      minHeight: 48,
    },
    details: {
      flexWrap: 'wrap',
      display: 'flex',
    },
    txtDetails: {
      fontSize: 18,
    },
  }),
);

const AvatarProviderIcon = ({ provider }: { provider: string }) => {
  const classes = useStyles();
  return (
    <Avatar aria-label="recipe" className={classes.avatar}>
      {provider === 'github' && <GithubIcon />}
      {provider === 'gitlab' && <GitlabIcon />}
    </Avatar>
  );
};

const LanguageIcon = ({ lang }: { lang: string }) => {
  switch (lang) {
    case 'Node.js':
    case 'nodejs':
      return <NodeJSIcon />;
    case 'python':
      return <PythonIcon />;

    default:
      return <span>{lang}</span>;
  }
};

const GraphCard: React.FC<GraphCardProps> = ({
  dataCard,
  configPlot,
  isDetailRepoCard,
  detailsRepo,
}: GraphCardProps) => {
  const classes = useStyles();

  return isDetailRepoCard ? (
    <Card className={classes.root} style={{ marginBottom: '8%' }}>
      <CardHeader
        className={classes.cardHeader}
        avatar={<AvatarProviderIcon provider={dataCard.provider} />}
      />
      <div className={classes.details}>
        <CardContent className={classes.cardDetailsContent}>
          <div className={classes.txtDetails}>
            <Link
              href={`https://www.${dataCard.provider}.com/${dataCard.owner}/${dataCard.name}`}
              target="_blank"
            >
              {`${dataCard.owner}/${dataCard.name}`}
            </Link>
            <Typography>{`Last Scraper: ${detailsRepo?.lastScraperDate}`}</Typography>
            <Typography style={{ fontWeight: 'bold' }}>About</Typography>
            <Typography>{detailsRepo?.description}</Typography>
            <Typography>Starts: {detailsRepo?.starts}</Typography>
            <Typography>Forks: {detailsRepo?.forks}</Typography>
            <Typography style={{ fontWeight: 'bold' }}>Languages</Typography>
            {dataCard.language &&
              dataCard.language.map(lang => LanguageIcon({ lang }))}
          </div>
        </CardContent>
        <CardContent className={classes.cardDetailsContent}>
          <RepositoryRadar
            repositoryData={dataCard}
            configPlot={{
              width: window.innerWidth > 375 ? 492 : 292,
              height: window.innerWidth > 375 ? 352 : 288,
              color: '#3f51b5',
            }}
          />
        </CardContent>
      </div>
    </Card>
  ) : (
    <Card className={classes.root}>
      <CardHeader
        avatar={<AvatarProviderIcon provider={dataCard.provider} />}
        title={`${dataCard.owner}/${dataCard.name}`}
      />
      <CardContent className={classes.cardContent}>
        <RepositoryRadar
          repositoryData={dataCard}
          configPlot={{
            width: '100%',
            height: 242,
            color: '#3f51b5',
          }}
        />
      </CardContent>
      <CardActions className={classes.cardActions}>
        {dataCard.language &&
          dataCard.language.map((lang: any) => LanguageIcon({ lang }))}
      </CardActions>
    </Card>
  );
};

GraphCard.defaultProps = {
  isDetailRepoCard: false,
  detailsRepo: {
    lastScraperDate: '',
    description: 'This repository has no description',
    starts: 0,
    forks: 0,
  },
};

export default GraphCard;
