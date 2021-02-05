import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import { GithubIcon, GitlabIcon } from '../../assets/svg';

interface AvatarProviderIconProps {
  provider: string;
}

const useStyles = makeStyles(() =>
  createStyles({
    avatar: {
      backgroundColor: 'rgb(255,255,255,0)',
    },
  }),
);

const AvatarProviderIcon: React.FC<AvatarProviderIconProps> = ({
  provider,
}: AvatarProviderIconProps) => {
  const classes = useStyles();

  return (
    <>
      <Avatar aria-label="recipe" className={classes.avatar}>
        {provider === 'github' && <GithubIcon title={provider} />}
        {provider === 'gitlab' && <GitlabIcon title={provider} />}
      </Avatar>
    </>
  );
};

export default AvatarProviderIcon;
