import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import classnames from 'classnames';
import moment from 'moment';
import Head from 'next/head';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import withRoot from '../../src/withRoot';
import { fetchLinksIfNeeded } from '../../state/links/actions';
import { fetchPostIfNeeded } from '../../state/posts/actions';
import AppBar from '../../components/AppBar';
import AuthorInfo from '../../components/AuthorInfo';
import SocialLinks from '../../components/SocialLinks';
import { BASE_URL } from '../../utils/constants';

const styles = theme => ({
  authorContainer: {
    alignItems: 'center',
    display: 'flex',
    marginBottom: theme.spacing.unit * 2,
  },
  authorInfo: {
    margin: theme.spacing.unit * 6,
    marginTop: theme.spacing.unit * 4,
  },
  authorFigure: {
    height: 16,
    margin: 0,
    marginRight: theme.spacing.unit,
    width: 16,
  },
  centerColumn: {
    [theme.breakpoints.down('xs')]: {
      gridColumn: '1 / span 1',
    },
    gridColumn: '2 / span 1',
  },
  date: {
    marginBottom: theme.spacing.unit * 2,
  },
  divider: {
    border: 0,
    borderTop: `1px solid ${theme.palette.text.secondary}`,
    height: 0,
    marginBottom: theme.spacing.unit * 2,
    opacity: 0.2,
    width: '100%',
  },
  fullWidth: {
    [theme.breakpoints.down('xs')]: {
      gridColumn: '1 / span 1',
    },
    gridColumn: '1 / span 3',
  },
  heroFigure: {
    display: 'block',
    margin: 0,
    overflow: 'hidden',
    padding: `${theme.spacing.unit * 2}px 0`,
  },
  heroImg: {
    display: 'block',
    margin: 0,
    padding: 0,
    width: '100%',
  },
  main: {
    ...theme.mixins.gutters(),
    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: 'auto',
    },
    gridTemplateColumns: `${theme.spacing.unit * 4}px auto ${theme.spacing.unit * 4}px`,
    display: 'grid',
    marginBottom: theme.spacing.unit * 4,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 0,
    maxWidth: 900,
  },
  root: {
    paddingTop: theme.spacing.unit * 6,
    paddingBottom: theme.spacing.unit * 6,
  },
  title: {
    marginBottom: theme.spacing.unit * 2,
  },
});

const Post = ({
  asPath,
  classes,
  content,
  metadata,
  published_at, // eslint-disable-line camelcase
  title,
}) => {
  const author = metadata && metadata.author;
  const authorName = author && author.title;
  const authorImageUrl = author && author.metadata && author.metadata.image
    && author.metadata.image.imgix_url;
  const heroUrl = metadata && metadata.hero && metadata.hero.imgix_url;

  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        {heroUrl && <meta property="og:image" content={`${heroUrl}?w=279&h=279&fit=crop&fm=png`} key="og_image" />}
        {heroUrl && <meta property="og:image:type" content="image/png" key="og_image_type" />}
        {heroUrl && <meta property="og:image:width" content="279" key="og_image_width" />}
        {heroUrl && <meta property="og:image:height" content="279" key="og_image_height" />}
        {content && <meta property="og:description" content={content} key="og_description" />}
        {title && <meta property="og:title" content={title} key="og_title" />}
        {asPath && <meta property="og:url" content={`${BASE_URL}${asPath}`} key="og_url" />}
      </Head>
      <AppBar title={title} />
      <div className={classes.root}>
        <main className={classes.main}>
          {
            (authorName || authorImageUrl) &&
            <div
              className={classnames([
                classes.authorContainer,
                classes.centerColumn,
              ])}
            >
              {
                authorImageUrl &&
                <figure className={classes.authorFigure}>
                  <img
                    alt=""
                    heght="16px"
                    src={`${authorImageUrl}?w=16&h=16&fit=crop`}
                    width="16px"
                  />
                </figure>
              }
              {
                authorName &&
                <Typography variant="display1">
                  {authorName}
                </Typography>
              }
            </div>
          }
          {
            title &&
            <Typography
              classes={{
                root: classnames([
                  classes.centerColumn,
                  classes.title,
                ]),
              }}
              variant="display3"
            >
              {title}
            </Typography>
          }
          {
            published_at && // eslint-disable-line camelcase
            <Typography
              classes={{
                root: classnames([
                  classes.centerColumn,
                  classes.date,
                ]),
              }}
              variant="subheading"
            >
              {moment(published_at).format('MMMM Do, YYYY')}
            </Typography>
          }
          <hr
            className={classnames([
            classes.centerColumn,
            classes.divider,
          ])}
          />
          {
            heroUrl &&
            <figure
              className={classnames([
                classes.heroFigure,
                classes.fullWidth,
              ])}
            >
              <img
                alt=""
                className={classes.heroImg}
                src={`${heroUrl}?w=900&fit=crop`}
              />
            </figure>
          }
          {
            content &&
            <span className={classes.centerColumn}>
              <Typography variant="body1" component="span">
                {/* eslint-disable-next-line react/no-danger */}
                <span dangerouslySetInnerHTML={{ __html: content }} />
              </Typography>
            </span>
          }
          <hr
            className={classnames([
            classes.centerColumn,
            classes.divider,
          ])}
          />
          {
            author &&
            <AuthorInfo
              {...author}
              className={classnames([
                classes.centerColumn,
                classes.authorInfo,
              ])}
            />
          }
          <hr
            className={classnames([
              classes.centerColumn,
              classes.divider,
            ])}
          />
        </main>
        <SocialLinks />
      </div>
    </Fragment>
  );
};

Post.getInitialProps = async ({ query, reduxStore }) => {
  const { slug } = query;
  const { dispatch } = reduxStore;

  try {
    await Promise.all([
      dispatch(fetchPostIfNeeded(slug)),
      dispatch(fetchLinksIfNeeded()),
    ]);
    const { posts } = reduxStore.getState();
    const { post } = posts[slug];
    return { ...post };
  } catch (e) {
    console.error(e); // eslint-disable-line no-console
    return { slug };
  }
};

Post.defaultProps = {
  asPath: undefined,
  content: undefined,
  metadata: undefined,
  published_at: undefined,
  title: undefined,
};

Post.propTypes = {
  asPath: PropTypes.string,
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  content: PropTypes.string,
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
  }),
  published_at: PropTypes.string,
  title: PropTypes.string,
};

export const BasicPost = withStyles(styles)(Post);

export default compose(
  withRoot,
  withStyles(styles),
)(Post);
