import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Headroom from 'react-headroom';
import classnames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import BackIcon from '@material-ui/icons/ArrowBack';
import SettingsIcon from '@material-ui/icons/Settings';

import AppearanceDialog from '../AppearanceDialog';
import handleBackBtnClick from '../../utils/handleBackBtnClick';

const styles = theme => ({
  appearanceBtn: {
    justifySelf: 'end',
  },
  backBtn: {
    justifySelf: 'start',
  },
  header: {
    alignItems: 'center',
    backgroundColor: theme.palette.background.default,
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
    display: 'grid',
    gridTemplateColumns: '1fr auto 1fr',
    padding: theme.spacing.unit,
    transition: 'border-bottom ease 0.3s',
  },
  header_topOfPage: {
    borderBottom: '1px solid rgba(0, 0, 0, 0)',
  },
  title: {
    opacity: 1,
    overflow: 'hidden',
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    textOverflow: 'ellipsis',
    transition: 'opacity ease 0.3s',
    whiteSpace: 'nowrap',
  },
  title_topOfPage: {
    opacity: 0,
  },
});

class AppBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      atTopOfPage: true,
      appearanceDialogOpen: false,
    };

    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(event) {
    try {
      const pageY = event.pageY
        ? event.pageY // firefox
        : event.path.find(path => path.scrollY).scrollY; // chrome
      if (pageY > 40 && this.state.atTopOfPage) {
        this.setState({ atTopOfPage: false });
      } else if (pageY <= 40 && !this.state.atTopOfPage) {
        this.setState({ atTopOfPage: true });
      }
    } catch (e) {
      // Do nothing
    }
  }

  render() {
    const { classes, title } = this.props;
    const { atTopOfPage, appearanceDialogOpen } = this.state;

    return (
      <Fragment>
        <Headroom>
          <header
            className={classnames({
              [classes.header]: true,
              [classes.header_topOfPage]: atTopOfPage,
            })}
          >
            <IconButton
              aria-label="Back"
              className={classes.backBtn}
              onClick={handleBackBtnClick}
            >
              <BackIcon />
            </IconButton>
            <Typography
              className={classnames({
                [classes.title]: true,
                [classes.title_topOfPage]: atTopOfPage,
              })}
              variant="title"
            >
              {title}
            </Typography>
            <IconButton
              aria-label="Appearance"
              className={classes.appearanceBtn}
              onClick={() => this.setState({ appearanceDialogOpen: !appearanceDialogOpen })}
            >
              <SettingsIcon />
            </IconButton>
          </header>
        </Headroom>
        <AppearanceDialog
          open={appearanceDialogOpen}
          onClose={() => this.setState({ appearanceDialogOpen: false })}
        />
      </Fragment>
    );
  }
}

AppBar.defaultProps = {
  title: '',
};

AppBar.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  title: PropTypes.string,
};

export default withStyles(styles)(AppBar);
