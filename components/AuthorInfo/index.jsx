import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  content: {
    [`@media screen and (max-width: ${theme.breakpoints.values.sm}px)`]: {
      flexDirection: 'column',
      marginLeft: 0,
      marginTop: theme.spacing.unit * 2,
    },
    marginLeft: theme.spacing.unit * 4,
    marginTop: 0,
  },
  image: {
    boxShadow: '4px 4px 0px 0px rgba(0,0,0,0.7)',
    display: 'block',
    flex: 'none',
    height: 120,
    margin: 0,
    padding: 0,
    width: 120,
  },
  root: {
    [`@media screen and (max-width: ${theme.breakpoints.values.sm}px)`]: {
      flexDirection: 'column',
    },
    alignItems: 'center',
    display: 'flex',
    margin: '0 auto',
  },
});

const AuthorInfo = ({
  classes,
  className,
  title,
  content,
  metadata,
}) => {
  const imageUrl = metadata && metadata.image && metadata.image.imgix_url;

  return (
    <div className={classnames([classes.root, className])}>
      {
        imageUrl &&
        <img
          alt={title}
          className={classes.image}
          height={120}
          src={imageUrl}
          width={120}
        />
      }
      {
        content &&
        <Typography
          classes={{ root: classes.content }}
          component="div"
          variant="body2"
        >
          {/* eslint-disable-next-line react/no-danger */}
          <span dangerouslySetInnerHTML={{ __html: content }} />
        </Typography>
      }
    </div>
  );
};

AuthorInfo.defaultProps = {
  className: undefined,
  content: undefined,
  metadata: undefined,
};

AuthorInfo.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  content: PropTypes.string,
  metadata: PropTypes.shape({
    image: PropTypes.shape({
      imgix_url: PropTypes.string,
    }),
  }),
};

export default withStyles(styles)(AuthorInfo);
