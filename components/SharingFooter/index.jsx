import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

import { Link } from '../../routes';
import { BASE_URL } from '../../utils/constants';
import FacebookIcon from '../../assets/svg/facebook-f.svg';
import HooliIcon from '../../assets/svg/hooli.svg';
import RedditIcon from '../../assets/svg/reddit-alien.svg';
import TwitterIcon from '../../assets/svg/twitter.svg';

const styles = theme => ({
  icon: {
    display: 'block',
    fill: theme.palette.text.secondary,
    height: 24,
    width: 24,
  },
  iconButton: {
    margin: theme.spacing.unit,
  },
  root: {
    marginBottom: theme.spacing.unit * 4,
    textAlign: 'center',
  },
});

const SharingFooter = ({
  asPath,
  classes,
  hashtags,
  title,
}) => {
  if (!asPath) return <div style={{ display: 'none' }} />;

  const url = `${BASE_URL}${asPath}`;

  return (
    <div className={classes.root}>
      <Link href={`https://twitter.com/intent/tweet?text=${title || ''}&hashtags=${(hashtags && hashtags.join(',')) || ''}&url=${url}`}>
        <a>
          <IconButton className={classes.iconButton}>
            <TwitterIcon className={classes.icon} />
          </IconButton>
        </a>
      </Link>

      <Link href={`http://www.reddit.com/submit?url=${url}&title=${title || ''}`}>
        <a>
          <IconButton className={classes.iconButton}>
            <RedditIcon className={classes.icon} />
          </IconButton>
        </a>
      </Link>

      <Link href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}>
        <a>
          <IconButton className={classes.iconButton}>
            <FacebookIcon className={classes.icon} />
          </IconButton>
        </a>
      </Link>

      <Link href="http://www.hooli.xyz/">
        <a>
          <IconButton className={classes.iconButton}>
            <HooliIcon className={classes.icon} />
          </IconButton>
        </a>
      </Link>
    </div>
  );
};

SharingFooter.defaultProps = {
  asPath: undefined,
  hashtags: undefined,
  title: 'Awesome',
};

SharingFooter.propTypes = {
  asPath: PropTypes.string,
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  hashtags: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
};

export default withStyles(styles)(SharingFooter);
