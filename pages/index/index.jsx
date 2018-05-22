import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import Head from 'next/head';

import Typography from '@material-ui/core/Typography';

import withRoot from '../../src/withRoot';
import { fetchLinksIfNeeded } from '../../state/links/actions';
import { fetchSiteMetadataIfNeeded } from '../../state/metadata/actions';
import { fetchPageIfNeeded } from '../../state/pages/actions';
import PostPreview from '../../components/PostPreview';
import SocialLinks from '../../components/SocialLinks';

const styles = theme => ({
  divider: {
    border: 0,
    borderTop: `1px solid ${theme.palette.text.secondary}`,
    height: 0,
    marginBottom: theme.spacing.unit * 6,
    maxWidth: 700,
    opacity: 0.2,
    width: '100%',
  },
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 6,
    paddingBottom: theme.spacing.unit * 6,
  },
  logo: {
    display: 'block',
    margin: '0 auto',
    maxinWidth: 700,
    overflow: 'hidden',
    paddingTop: theme.spacing.unit * 6,
    paddingBottom: theme.spacing.unit * 6,
  },
  postPreviews: {
    listStyle: 'none',
    marginBottom: theme.spacing.unit * 4,
    marginTop: theme.spacing.unit * 4,
    padding: 0,
  },
  postPreviewsHeaderContainer: {
    marginTop: theme.spacing.unit * 4,
    padding: 0,
  },
  postPreviewsHeader: {
    margin: '0 auto',
    maxWidth: 700,
    position: 'relative',
  },
  postPreviewsHeaderTitle: {
    bottom: -1,
    borderBottom: `1px solid ${theme.palette.text.secondary}`,
    display: 'inline-block',
    padding: theme.spacing.unit,
    position: 'absolute',
    left: 0,
  },
  postPreviewsHeaderContainerDivider: {
    border: 0,
    borderTop: `1px solid ${theme.palette.text.secondary}`,
    disaplay: 'block',
    height: 0,
    margin: '0 auto',
    maxWidth: 700,
    opacity: 0.2,
    padding: 0,
    width: '100%',
  },
  tag: {
    display: 'block',
    textAlign: 'center',
  },
  title: {
    display: 'block',
    textAlign: 'center',
  },
});

const Index = ({
  classes,
  metadata,
  page,
  pages,
  posts,
}) => {
  let postPreviews;
  try {
    postPreviews = pages[page].slugs.map(slug => posts[slug]);
  } catch (e) {
    postPreviews = undefined;
  }

  return (
    <div className={classes.root}>
      <Head>
        <title>{(metadata && metadata.title) || 'Cosmic Blog'}</title>
        {
          metadata && metadata.logo && metadata.logo.imgix_url &&
          <meta property="og:image" content={`${metadata.logo.imgix_url}?h=279&w=279&fit=crop&fm=png`} key="og_image" />
        }
        {
          metadata && metadata.logo && metadata.logo.imgix_url &&
          <meta property="og:image:type" content="image/png" key="og_image_type" />
        }
        {
          metadata && metadata.logo && metadata.logo.imgix_url &&
          <meta property="og:image:width" content="279" key="og_image_width" />
        }
        {
          metadata && metadata.logo && metadata.logo.imgix_url &&
          <meta property="og:image:height" content="279" key="og_image_height" />
        }
        <meta property="og:description" content="Clean, minimalist, content-first Blog powered by Cosmic JS" key="og_description" />
        <meta property="og:title" content="Cosmic Blog" key="og_title" />
        <meta property="og:url" content="http://cosmicblog.chriso.io" key="og_url" />
      </Head>
      {
        metadata && metadata.title &&
        <Typography className={classes.title} variant="display4" gutterBottom>
          {metadata.title}
        </Typography>
      }
      {
        metadata && metadata.tag &&
        <Typography className={classes.tag} variant="subheading" gutterBottom>
          {metadata.tag}
        </Typography>
      }
      {
        metadata && metadata.logo && metadata.logo.imgix_url &&
        <img
          alt=""
          className={classes.logo}
          src={`${metadata.logo.imgix_url}?w=auto&h=250&fit=crop`}
        />
      }
      <div className={classes.postPreviewsHeaderContainer}>
        <div className={classes.postPreviewsHeader}>
          <Typography className={classes.postPreviewsHeaderTitle} variant="title">
            Most Recent
          </Typography>
        </div>
        <hr className={classes.postPreviewsHeaderContainerDivider} />
      </div>
      {
        postPreviews &&
        <ul className={classes.postPreviews}>
          {
            postPreviews.map(({ post }) => <PostPreview key={post.slug} {...post} />)
          }
        </ul>
      }
      <hr className={classes.divider} />
      <SocialLinks />
    </div>
  );
};

Index.getInitialProps = async ({ query, reduxStore }) => {
  const { p } = query;
  const page = p && parseInt(p, 10) > 1 ? parseInt(p, 10) : 1;

  try {
    const { dispatch } = reduxStore;
    await Promise.all([
      dispatch(fetchLinksIfNeeded()),
      dispatch(fetchPageIfNeeded(page)),
      dispatch(fetchSiteMetadataIfNeeded()),
    ]);
  } catch (e) {
    console.error(e); // eslint-disable-line no-console
    // Do nothing
  }

  return { page };
};

Index.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  metadata: PropTypes.shape({
    logo: PropTypes.shape({
      imgix_url: PropTypes.string,
    }),
    tag: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  page: PropTypes.number.isRequired,
  pages: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  posts: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

const mapStateToProps = state => ({
  metadata: state.metadata,
  pages: state.pages,
  posts: state.posts,
});

export const DisconnectedIndex = withStyles(styles)(Index);

export default compose(
  connect(mapStateToProps),
  withRoot,
  withStyles(styles),
)(Index);
