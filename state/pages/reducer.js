import { actionTypes } from './actions';

const {
  CATCH_PAGE_FETCH_ERROR,
  RECEIVE_PAGE,
  REQUEST_PAGE,
} = actionTypes;

const defaultPageState = {
  error: undefined,
  finishedLoadAt: undefined,
  isLoading: false,
  startedLoadAt: undefined,
  slugs: undefined,
};

const page = (state = defaultPageState, action) => {
  switch (action.type) {
    case CATCH_PAGE_FETCH_ERROR:
      return {
        ...state,
        error: action.error,
        finishedLoadAt: Date.now(),
        isLoading: false,
      };
    case RECEIVE_PAGE:
      return {
        ...state,
        error: undefined,
        finishedLoadAt: Date.now(),
        isLoading: false,
        slugs: action.slugs,
      };
    case REQUEST_PAGE:
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

const defaultRootState = {};

const rootReducer = (state = defaultRootState, action) => {
  switch (action.type) {
    case CATCH_PAGE_FETCH_ERROR:
    case RECEIVE_PAGE:
    case REQUEST_PAGE:
      return {
        ...state,
        [action.page]: page(state[action.page], action),
      };
    default:
      return state;
  }
};

export default rootReducer;
