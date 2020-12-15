import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { PolarLayout } from 'plotly.js';
import Plot, { PlotParams } from 'react-plotly.js';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';

import { Link, Typography } from '@material-ui/core';
import moment from 'moment';
import {
  GithubIcon,
  GitlabIcon,
  NodeJSIcon,
  PythonIcon,
} from '../../assets/svg';

interface GraphCardDetailsProps {
  dateTime: moment.Moment;
  frequency: number;
  definitionOSS: number;
  popularity: number;
  friendly: number;
  quality: number;
  name: string;
  owner: string;
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
      maxWidth: '100%',
      maxHeight: '80%',
      backgroundColor: theme.palette.background.paper,
    },
    cardHeader: {
      maxHeight: '8%',
      textAlign: 'end',
      // paddingRight: '16%',
      // backgroundColor: 'green',
    },
    avatar: {
      backgroundColor: 'rgb(255,255,255,0)',
    },
    plot: {
      maxWidth: '24rem',
      maxHeight: '24rem',
    },
    details: {
      flexWrap: 'wrap',
      display: 'flex',
    },
    txtDetails: {
      fontSize: 18,
    },
    cardContent: {
      flex: 1,
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

const GraphCardDetails: React.FC<GraphCardDetailsProps> = ({
  dateTime,
  frequency,
  definitionOSS,
  popularity,
  friendly,
  quality,
  name,
  owner,
  provider,
  language = [],
}: GraphCardDetailsProps) => {
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
    <>
      <Card className={classes.root}>
        <CardHeader
          className={classes.cardHeader}
          avatar={<AvatarProviderIcon provider={provider} />}
        />
        <div className={classes.details}>
          <CardContent className={classes.cardContent}>
            <div className={classes.txtDetails}>
              <Link
                href={`https://www.${provider}.com/${owner}/${name}`}
                target="_blank"
              >
                {`${owner}/${name}`}
              </Link>
              <Typography>{`Last Scraper: ${moment(dateTime).format(
                'l',
              )}`}</Typography>
              <Typography style={{ fontWeight: 'bold' }}>About</Typography>
              <Typography>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.Lorem Ipsum has been the industrys standard dummy text
                ver since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book
              </Typography>
              <Typography>Starts: 100</Typography>
              <Typography>Forks: 88</Typography>
              <Typography style={{ fontWeight: 'bold' }}>Languages</Typography>
              {language && language.map(lang => LanguageIcon({ lang }))}
            </div>
          </CardContent>
          <CardContent className={classes.cardContent}>
            <Plot
              data={plotConfig.data}
              layout={plotConfig.layout}
              config={plotConfig.config}
              className={classes.plot}
            />
          </CardContent>
        </div>
      </Card>
    </>
  );
};

export default GraphCardDetails;
