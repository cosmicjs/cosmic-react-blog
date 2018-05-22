import { actionTypes } from './actions';

const {
  CATCH_METADATA_FETCH_ERROR,
  RECEIVE_SITE_METADATA,
  REQUEST_SITE_METADATA,
} = actionTypes;

const defaultRootState = {
  error: undefined,
  finishedLoadAt: undefined,
  isLoading: false,
  logo: undefined,
  startedLoadAt: undefined,
  tag: undefined,
  title: undefined,
};

const rootReducer = (state = defaultRootState, action) => {
  switch (action.type) {
    case CATCH_METADATA_FETCH_ERROR:
      return {
        ...state,
        error: action.error,
        finishedLoadAt: Date.now(),
        isLoading: false,
      };
    case RECEIVE_SITE_METADATA:
      return {
        ...state,
        error: undefined,
        finishedLoadAt: Date.now(),
        isLoading: false,
        logo: action.logo,
        tag: action.tag,
        title: action.title,
      };
    case REQUEST_SITE_METADATA:
      return {
        ...state,
        error: undefined,
        isLoading: true,
        startedLoadAt: Date.now(),
      };
    default:
      return state;
  }
};

export default rootReducer;
