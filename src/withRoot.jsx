/* source: https://github.com/mui-org/material-ui/blob/master/examples/nextjs/src/withRoot.js */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import css from 'styled-jsx/css';

import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import getPageContext from './getPageContext';
import { THEMES } from '../utils/constants';
import createCustomTheme from '../utils/createCustomTheme';

function withRoot(Component) {
  class WithRoot extends React.Component {
    constructor(props, context) {
      super(props, context);

      this.pageContext = this.props.pageContext || getPageContext();
    }

    componentDidMount() {
      // Remove the server-side injected CSS.
      const jssStyles = document.querySelector('#jss-server-side');
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    }

    pageContext = null;

    render() {
      const { htmlFontSize, theme } = this.props.appearance;
      const muiTheme = createCustomTheme({
        htmlFontSize,
        theme,
      });
      const bodyBackgroundStyle = css`body { transition: background-color ease 0.3s; }`;

      return (
        <MuiThemeProvider
          theme={muiTheme}
          sheetsManager={this.pageContext.sheetsManager}
        >
          <CssBaseline />
          <Component {...this.props} />
          <style jsx global>{bodyBackgroundStyle}</style>
        </MuiThemeProvider>
      );
    }
  }

  WithRoot.defaultProps = {
    pageContext: undefined,
  };

  WithRoot.propTypes = {
    appearance: PropTypes.shape({
      htmlFontSize: PropTypes.number.isRequired,
      theme: PropTypes.oneOf(Object.getOwnPropertyNames(THEMES)
        .map(key => THEMES[key])).isRequired,
    }).isRequired,
    pageContext: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  };

  WithRoot.getInitialProps = (ctx) => {
    if (Component.getInitialProps) {
      return Component.getInitialProps(ctx);
    }

    return {};
  };

  const mapStateToProps = state => ({
    appearance: state.appearance,
  });

  return connect(mapStateToProps)(WithRoot);
}

export default withRoot;
