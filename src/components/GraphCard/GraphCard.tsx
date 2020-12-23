import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { PolarLayout } from 'plotly.js';
import Plot, { PlotParams } from 'react-plotly.js';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import { ButtonBase, Link, Typography } from '@material-ui/core';

import {
  GithubIcon,
  GitlabIcon,
  NodeJSIcon,
  PythonIcon,
} from '../../assets/svg';

interface GraphCardPlotDimensions {
  width: string;
  height: string;
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
  dimensionsPlot?: GraphCardPlotDimensions;
  isDetailRepoCard?: boolean;
  isHistoricRepoCard?: boolean;
  detailsRepo?: GraphCardDetailsContent;
}

const dimensions: string[] = [
  'Frequency',
  'Definition of OSS',
  'Friendly',
  'Popularity',
  'Quality',
];

const polar: Partial<PolarLayout> = {
  angularaxis: { angle: 20 },
  radialaxis: {
    visible: true,
    range: [0, 100],
    showticklabels: false,
    ticks: '',
    showline: false,
  },
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper, //
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
    cardHistoricContent: {
      width: 396,
      height: 246,
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
  dimensionsPlot,
  isDetailRepoCard,
  isHistoricRepoCard,
  detailsRepo,
}: GraphCardProps) => {
  const classes = useStyles();

  const plotConfig: PlotParams = {
    data: [
      {
        type: 'scatterpolar',
        r: [
          dataCard.frequency,
          dataCard.definitionOSS,
          dataCard.friendly,
          dataCard.popularity,
          dataCard.quality,
          dataCard.frequency,
        ],
        theta: dimensions.concat(dimensions[0]), // Adding the first position at end of array to fill the pentagon
        fill: 'toself',
      },
    ],
    layout: {
      dragmode: false, // remove zoom
      polar,
      showlegend: false,
      paper_bgcolor: '#FFF',
    },
    config: {
      displayModeBar: false,
    },
  };

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
          <Plot
            data={plotConfig.data}
            layout={plotConfig.layout}
            config={plotConfig.config}
            style={{
              width: dimensionsPlot?.width,
              height: dimensionsPlot?.height,
            }}
          />
        </CardContent>
      </div>
    </Card>
  ) : (
    <ButtonBase
      style={{
        display: 'flex',
        justifyContent: 'flex-start',
      }}
      href={`/${dataCard.owner}/${dataCard.name}`}
    >
      <Card className={classes.root}>
        <CardHeader
          avatar={<AvatarProviderIcon provider={dataCard.provider} />}
          title={`${dataCard.owner}\\${dataCard.name}`}
        />
        <CardContent
          className={
            isHistoricRepoCard
              ? classes.cardHistoricContent
              : classes.cardContent
          }
        >
          <Plot
            data={plotConfig.data}
            layout={plotConfig.layout}
            config={plotConfig.config}
            style={{
              width: dimensionsPlot?.width,
              height: dimensionsPlot?.height,
            }}
          />
        </CardContent>
        <CardActions className={classes.cardActions}>
          {dataCard.language &&
            dataCard.language.map((lang: any) => LanguageIcon({ lang }))}
        </CardActions>
      </Card>
    </ButtonBase>
  );
};

GraphCard.defaultProps = {
  dimensionsPlot: {
    width: '',
    height: '',
  },
  isDetailRepoCard: false,
  isHistoricRepoCard: false,
  detailsRepo: {
    lastScraperDate: '',
    description: 'This repository has no description',
    starts: 0,
    forks: 0,
  },
};

export default GraphCard;
