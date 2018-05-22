import React from 'react';
import App, { Container } from 'next/app';
import { Provider } from 'react-redux';
import { PageTransition } from 'next-page-transitions';

import withReduxStore from '../lib/withReduxStore';
import AppContainer from '../components/AppContainer';

class CustomApp extends App {
  componentDidUpdate() {
    if (!window.previouslyLoaded) {
      window.previouslyLoaded = true;
    }
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props;

    return (
      <Container>
        <Provider store={reduxStore}>
          <AppContainer>
            <PageTransition
              timeout={300}
              classNames="page-transition"
            >
              <Component {...pageProps} />
            </PageTransition>
            <style jsx global>
              {`
                .page-transition-enter {
                  opacity: 0;
                }
                .page-transition-enter-active {
                  opacity: 1;
                  transition: opacity 300ms;
                }
                .page-transition-exit {
                  opacity: 1;
                }
                .page-transition-exit-active {
                  opacity: 0;
                  transition: opacity 300ms;
                }
              `}
            </style>
          </AppContainer>
        </Provider>
      </Container>
    );
  }
}

CustomApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps };
};

export { CustomApp as DisconnectedCustomApp };

export default withReduxStore(CustomApp);
