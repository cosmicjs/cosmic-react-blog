import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import classnames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

import { Link } from '../../routes';

const styles = theme => ({
  iconButton: {
    margin: theme.spacing.unit * 1,
  },
  image: {
    display: 'block',
    fill: theme.palette.primary.main,
    margin: 0,
    padding: 0,
  },
  root: {
    textAlign: 'center',
  },
});

const SocialLinks = ({
  classes,
  className,
  links,
}) => (
  <div className={classnames([classes.root, className])}>
    {
      links && links.items && links.items.map(item => (
        <Link href={item.url} key={item.slug}>
          <a>
            <IconButton className={classes.iconButton}>
              <img
                alt={item.content}
                className={classes.image}
                height={36}
                src={`${item.icon}?w=36&h=36`}
                width={36}
              />
            </IconButton>
          </a>
        </Link>
      ))
    }
  </div>
);

SocialLinks.defaultProps = {
  className: undefined,
  links: [],
};

SocialLinks.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  className: PropTypes.string,
  links: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({
      icon: PropTypes.string,
      url: PropTypes.string,
    })),
  }),
};

const mapStateToProps = state => ({
  links: state.links,
});

export const DisconnectedSocialLinks = withStyles(styles)(SocialLinks);

export default compose(
  withStyles(styles),
  connect(mapStateToProps),
)(SocialLinks);
