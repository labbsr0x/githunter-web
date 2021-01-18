import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
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
import RepositoryRadar from '../RepositoryRadar/RepositoryRadar';

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

interface RepositoryCardProps {
  dataCard: RepositoryData;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
    },
    avatar: {
      backgroundColor: 'rgb(255,255,255,0)',
    },
    cardContent: {
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

const RepositoryCard: React.FC<RepositoryCardProps> = ({
  dataCard,
}: RepositoryCardProps) => {
  const classes = useStyles();

  return (
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

export default RepositoryCard;
