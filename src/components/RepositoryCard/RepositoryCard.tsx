import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { CardActionArea } from '@material-ui/core';

import RepositoryRadar from '../RepositoryRadar/RepositoryRadar';
import AvatarProviderIcon from '../AvatarProviderIcon/AvatarProviderIcon';
import LanguageIcon from '../LanguageIcon/LanguageIcon';

interface RepositoryData {
  dateTime?: moment.Moment;
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
  historicCard?: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
    },
    cardContent: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    cardActions: {
      minHeight: 48,
    },
    historicCardHead: {
      textAlign: 'center',
    },
  }),
);

const RepositoryCard: React.FC<RepositoryCardProps> = ({
  dataCard,
  historicCard,
}: RepositoryCardProps) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        className={historicCard === true ? classes.historicCardHead : undefined}
        avatar={
          historicCard === false ? (
            <AvatarProviderIcon provider={dataCard.provider} />
          ) : (
            false
          )
        }
        title={
          historicCard === false
            ? `${dataCard.owner}/${dataCard.name}`
            : `${dataCard.dateTime}`
        }
      />

      {historicCard ? (
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
      ) : (
        <CardActionArea href={`/${dataCard.owner}/${dataCard.name}`}>
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
        </CardActionArea>
      )}

      {!historicCard && (
        <CardActions className={classes.cardActions}>
          {dataCard.language &&
            dataCard.language.map((lang: any) => LanguageIcon({ lang }))}
        </CardActions>
      )}
    </Card>
  );
};

RepositoryCard.defaultProps = {
  historicCard: false,
};

export default RepositoryCard;
