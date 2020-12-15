import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { PolarLayout } from 'plotly.js';
import Plot, { PlotParams } from 'react-plotly.js';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';

import moment from 'moment';
import {
  GithubIcon,
  GitlabIcon,
  NodeJSIcon,
  PythonIcon,
} from '../../assets/svg';

interface GraphCardMinDetailsProps {
  dateTime: moment.Moment;
  frequency: number;
  definitionOSS: number;
  popularity: number;
  friendly: number;
  quality: number;
  provider: string;
  language: string[];
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
    avatar: {
      backgroundColor: 'rgb(255,255,255,0)',
    },
    plot: {
      width: '16rem',
      height: '16rem',
    },
    cardContent: {
      width: 396,
      height: 246,
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
    },
    cardActions: {
      minHeight: 48,
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

const GraphCardMinDetails: React.FC<GraphCardMinDetailsProps> = ({
  dateTime,
  frequency,
  definitionOSS,
  popularity,
  friendly,
  quality,
  provider,
  language = [],
}: GraphCardMinDetailsProps) => {
  const classes = useStyles();

  const plotConfig: PlotParams = {
    data: [
      {
        type: 'scatterpolar',
        r: [frequency, definitionOSS, friendly, popularity, quality, frequency],
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

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={<AvatarProviderIcon provider={provider} />}
        title={`Last Update: ${moment(dateTime).format('l')}`}
      />

      <CardContent className={classes.cardContent}>
        <Plot
          data={plotConfig.data}
          layout={plotConfig.layout}
          config={plotConfig.config}
          className={classes.plot}
        />
      </CardContent>
      <CardActions className={classes.cardActions}>
        {language && language.map(lang => LanguageIcon({ lang }))}
      </CardActions>
    </Card>
  );
};

export default GraphCardMinDetails;
