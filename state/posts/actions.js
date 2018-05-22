import fetch from 'isomorphic-unfetch';
import { API_URL } from '../../utils/constants';

const actionTypes = {
  CATCH_POST_FETCH_ERROR: 'CATCH_POST_FETCH_ERROR',
  RECEIVE_POST: 'RECEIVE_POST',
  REQUEST_POST: 'REQUEST_POST',
};

const catchPostFetchError = (error, slug) => ({
  type: actionTypes.CATCH_POST_FETCH_ERROR,
  error,
  slug,
});

const receivePost = post => ({
  type: actionTypes.RECEIVE_POST,
  post,
  slug: post && post.slug,
});

const requestPost = slug => ({
  type: actionTypes.REQUEST_POST,
  slug,
});

const fetchPost = slug => (dispatch) => {
  dispatch(requestPost(slug));

  return fetch(`${API_URL}/post/${slug}`)
    .then(res => res.json())
    .then(json => dispatch(receivePost(json.object)))
    .catch(err => dispatch(catchPostFetchError(err, slug)));
};

const shouldFetchPost = (slug, state) => {
  const { posts } = state;

  if (!posts[slug]) return true;
  if (posts[slug].isLoading) return false;
  return !posts[slug].post;
};

const fetchPostIfNeeded = slug => (dispatch, getState) => {
  if (shouldFetchPost(slug, getState())) return dispatch(fetchPost(slug));
  return Promise.resolve();
};

export {
  actionTypes,
  catchPostFetchError,
  fetchPost,
  fetchPostIfNeeded,
  receivePost,
  requestPost,
  shouldFetchPost,
};
