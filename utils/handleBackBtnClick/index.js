import { Router } from '../../routes';

const handleBackBtnClick = () => {
  // window.previouslyLoaded is set to true the first time App is loaded.
  // /pages/_app.jsx
  if (window.previouslyLoaded) {
    return Router.back();
  }

  return Router.pushRoute('/');
};

export default handleBackBtnClick;
