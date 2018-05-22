import { actionTypes } from './actions';

const {
  CATCH_POST_FETCH_ERROR,
  RECEIVE_POST,
  REQUEST_POST,
} = actionTypes;

const defaultPostState = {
  error: undefined,
  finishedLoadAt: undefined,
  isLoading: false,
  startedLoadAt: undefined,
  post: undefined,
};

const post = (state = defaultPostState, action) => {
  switch (action.type) {
    case CATCH_POST_FETCH_ERROR:
      return {
        ...state,
        error: action.error,
        finishedLoadAt: Date.now(),
        isLoading: false,
      };
    case RECEIVE_POST:
      return {
        ...state,
        error: undefined,
        finishedLoadAt: Date.now(),
        isLoading: false,
        post: action.post,
      };
    case REQUEST_POST:
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
    case CATCH_POST_FETCH_ERROR:
    case RECEIVE_POST:
    case REQUEST_POST:
      return {
        ...state,
        [action.slug]: post(state[action.slug], action),
      };
    default:
      return state;
  }
};

export default rootReducer;
