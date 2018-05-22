import { actionTypes } from './actions';

const {
  CATCH_LINKS_FETCH_ERROR,
  RECEIVE_LINKS,
  REQUEST_LINKS,
} = actionTypes;

const defaultRootState = {
  error: undefined,
  finishedLoadAt: undefined,
  isLoading: false,
  items: undefined,
  startedLoadAt: undefined,
};

const rootReducer = (state = defaultRootState, action) => {
  switch (action.type) {
    case CATCH_LINKS_FETCH_ERROR:
      return {
        ...state,
        error: action.error,
        finishedLoadAt: Date.now(),
        isLoading: false,
      };
    case RECEIVE_LINKS:
      return {
        ...state,
        error: undefined,
        finishedLoadAt: Date.now(),
        isLoading: false,
        items: action.items,
      };
    case REQUEST_LINKS:
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
