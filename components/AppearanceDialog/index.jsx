import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';

import FontSizeIcon from '../../assets/svg/baseline-title-24px.svg';
import {
  decreaseFontSize,
  increaseFontSize,
  setTheme,
} from '../../state/appearance/actions';
import { THEMES } from '../../utils/constants';

const styles = theme => ({
  button: {
    flex: 1,
  },
  dialog: {
    // width: 250,
    padding: theme.spacing.unit,
  },
  decreaseFontSizeBtn: {
    fill: theme.palette.text.primary,
    height: '1.5rem',
    width: '1.5rem',
  },
  fontSizeBtnsContainer: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
    display: 'flex',
    paddingBottom: theme.spacing.unit,
    width: '100%',
  },
  increaseFontSizeBtn: {
    fill: theme.palette.text.primary,
    height: '2.2rem',
    width: '2.2rem',
  },
  label: {
    fontFamily: theme.typography.sansFontFamily,
    fontSize: '1.3rem',
  },
  switchContainer: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing.unit,
  },
  themeBtnsContainer: {
    display: 'flex',
  },
});

const AppearanceDialog = ({
  classes,
  dispatch,
  onClose,
  open,
  theme,
}) => (
  <Dialog
    aria-labelledby="Appearance"
    onClose={onClose}
    open={open}
    classes={{ paper: classes.dialog }}
  >
    <div className={classes.fontSizeBtnsContainer}>
      <Button
        classes={{ root: classes.button }}
        onClick={() => dispatch(decreaseFontSize())}
      >
        <FontSizeIcon className={classes.decreaseFontSizeBtn} />
      </Button>
      <Button
        classes={{ root: classes.button }}
        onClick={() => dispatch(increaseFontSize())}
      >
        <FontSizeIcon className={classes.increaseFontSizeBtn} />
      </Button>
    </div>
    <div className="themeBtnsContainer">
      <FormGroup
        classes={{
          root: classes.switchContainer,
        }}
      >
        <FormControlLabel
          control={
            <Switch
              checked={theme === THEMES.DARK}
              onChange={() =>
                dispatch(setTheme(theme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK))
              }
              value="theme"
            />
          }
          classes={{
            label: classes.label,
          }}
          label="Night mode"
        />
      </FormGroup>
    </div>
  </Dialog>
);

AppearanceDialog.defaultProps = {
  open: false,
};

AppearanceDialog.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  dispatch: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  theme: PropTypes.oneOf(Object.getOwnPropertyNames(THEMES)
    .map(prop => THEMES[prop])).isRequired,
};

const mapStateToProps = state => ({
  theme: state.appearance.theme,
});

export const DisconnectedAppearanceDialog = withStyles(styles)(AppearanceDialog);

export default compose(
  connect(mapStateToProps),
  withStyles(styles),
)(AppearanceDialog);
