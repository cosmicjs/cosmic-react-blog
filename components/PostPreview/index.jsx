import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { compose } from 'recompose';

import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';

import { Router } from '../../routes';

const styles = theme => ({
  authorAndDate: {
    alignItems: 'center',
    display: 'flex',
  },
  authorImage: {
    display: 'block',
    margin: '0 8px 0 0',
    padding: 0,
  },
  date: {
    display: 'inline-block',
    paddingLeft: theme.spacing.unit,
  },
  button: {
    margin: 0,
    marginBottom: theme.spacing.unit * 3,
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    backgroundColor: 'transparent',
    borderStyle: 'none',
    color: 'inherit',
    cursor: 'pointer',
    display: 'flex',
    fontSize: 'inherit',
    textAlign: 'inherit',
    textDecoration: 'inherit',
    width: '100%',
  },
  content: {
    flex: 1,
  },
  heroFigure: {
    padding: 0,
    paddingLeft: theme.mixins.gutters().paddingLeft * 2,
    display: 'block',
    flex: 'none',
    margin: 0,
  },
  heroImage: {
    boxShadow: '4px 4px 0px 0px rgba(0,0,0,0.7)',
    display: 'block',
    height: 140,
    margin: 0,
    padding: 0,
    width: 140,
  },
  root: {
    display: 'block',
    margin: '0 auto',
    maxWidth: 720,
  },
});

const PostPreview = ({
  classes,
  metadata,
  published_at, // eslint-disable-line camelcase
  slug,
  title,
}) => {
  const authorName = metadata && metadata.author && metadata.author.title;
  const authorImage = metadata && metadata.author && metadata.author.metadata
    && metadata.author.metadata.image && metadata.author.metadata.image.imgix_url;
  const heroImage = metadata && metadata.hero && metadata.hero.imgix_url;
  const teaser = metadata && metadata.teaser;

  return (
    <Fragment>
      <li className={classes.root}>
        <button
          className={classes.button}
          onClick={() => Router.pushRoute('post', { slug })}
        >
          <div className={classes.content}>
            {
              title &&
              <Typography variant="headline">
                {title}
              </Typography>
            }
            {
              teaser &&
              <Typography variant="body2" component="span">
                {/* eslint-disable-next-line react/no-danger */}
                <p dangerouslySetInnerHTML={{ __html: teaser }} />
              </Typography>
            }
            <Typography variant="subheading" className={classes.authorAndDate}>
              {
                authorImage &&
                <img
                  alt=""
                  className={classes.authorImage}
                  height="16px"
                  src={`${authorImage}?w=16&h=16&fit=crop`}
                  width="16px"
                />
              }
              {authorName}
              {
                published_at && // eslint-disable-line camelcase
                ` ‧ ${moment(published_at).format('MMM D, YYYY')}`
              }
            </Typography>
          </div>
          <Hidden only="xs">
            <figure className={classes.heroFigure}>
              {
                heroImage &&
                <img
                  alt=""
                  className={classes.heroImage}
                  height="140px"
                  src={`${heroImage}?w=140&h=140&fit=crop`}
                  width="140px"
                />
              }
            </figure>
          </Hidden>
        </button>
      </li>
    </Fragment>
  );
};

PostPreview.defaultProps = {
  metadata: undefined,
  published_at: undefined,
};

PostPreview.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  metadata: PropTypes.shape({
    author: PropTypes.shape({
      content: PropTypes.string,
      metadata: PropTypes.shape({
        image: PropTypes.shape({
          imgix_url: PropTypes.string,
        }),
      }),
      title: PropTypes.string,
    }),
    hero: PropTypes.shape({
      imgix_url: PropTypes.string,
    }),
    teaser: PropTypes.string,
  }),
  published_at: PropTypes.string,
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export const PurePostPreview = PostPreview;

export default compose(
  withStyles(styles),
  withWidth(),
)(PostPreview);
