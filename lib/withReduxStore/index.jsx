/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import initializeStore from '../../state';

const isServer = typeof window === 'undefined';
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__';

const getOrCreateStore = (initialState) => {
  if (isServer) {
    return initializeStore(initialState);
  }

  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = initializeStore(initialState);
  }

  return window[__NEXT_REDUX_STORE__];
};

const withStore = App => class Redux extends Component {
  static async getInitialProps(appContext) {
    const reduxStore = getOrCreateStore();

    appContext.ctx.reduxStore = reduxStore; // eslint-disable-line no-param-reassign

    let appProps = {};
    if (App.getInitialProps) {
      appProps = await App.getInitialProps(appContext);
    }

    return {
      ...appProps,
      initialReduxState: reduxStore.getState(),
    };
  }

  static defaultProps = {
    initialReduxState: {},
  };

  static propTypes = {
    initialReduxState: PropTypes.shape({}),
  };

  constructor(props) {
    super(props);
    this.reduxStore = getOrCreateStore(props.initialReduxState);
  }

  render() {
    return <App {...this.props} reduxStore={this.reduxStore} />;
  }
};

export default withStore;
