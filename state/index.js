import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

import appearance from './appearance/reducer';
import links from './links/reducer';
import metadata from './metadata/reducer';
import pages from './pages/reducer';
import posts from './posts/reducer';

const rootReducer = combineReducers({
  appearance,
  links,
  metadata,
  pages,
  posts,
});

const initializeStore = (initialState = {}) => createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunkMiddleware)),
);

export default initializeStore;
