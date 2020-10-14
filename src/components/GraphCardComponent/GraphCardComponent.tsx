import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { PolarLayout } from 'plotly.js';
import Plot, { PlotParams } from 'react-plotly.js';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import {
  GithubIcon,
  GitlabIcon,
  NodeJSIcon,
  PythonIcon,
} from '../../assets/svg';

interface GraphCardProps {
  frequency: number;
  definitionOSS: number;
  popularity: number;
  friendly: number;
  quality: number;
  name: string;
  owner: string;
  provider: string;
  language?: string[];
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

const plotConfig: PlotParams = {
  data: [
    {
      type: 'scatterpolar',
      r: [],
      theta: dimensions.concat(dimensions[0]), // Adding the first position at end of array to fill the pentagon
      fill: 'toself',
    },
  ],
  layout: {
    width: 300,
    height: 300,
    dragmode: false, // remove zoom
    polar,
    showlegend: false,
    paper_bgcolor: '#FFF',
  },
  config: {
    displayModeBar: false,
  },
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
      backgroundColor: theme.palette.background.paper, //
    },
    avatar: {
      backgroundColor: 'rgb(255,255,255,0)',
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

const GraphCardComponent: React.FC<GraphCardProps> = ({
  frequency,
  definitionOSS,
  popularity,
  friendly,
  quality,
  name,
  owner,
  provider,
  language,
}: GraphCardProps) => {
  const classes = useStyles();

  plotConfig.data[0].r = [
    frequency,
    definitionOSS,
    friendly,
    popularity,
    quality,
    frequency,
  ];
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={<AvatarProviderIcon provider={provider} />}
        title={`${owner}\\${name}`}
      />
      <CardContent>
        <Plot
          data={plotConfig.data}
          layout={plotConfig.layout}
          config={plotConfig.config}
        />
      </CardContent>
      <CardActions>
        {language && language.map(lang => LanguageIcon({ lang }))}
      </CardActions>
    </Card>
  );
};

GraphCardComponent.defaultProps = {
  language: [],
};

export default GraphCardComponent;
