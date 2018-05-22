import fetch from 'isomorphic-unfetch';
import { receivePost } from '../posts/actions';
import { API_URL } from '../../utils/constants';

const actionTypes = {
  CATCH_PAGE_FETCH_ERROR: 'CATCH_PAGE_FETCH_ERROR',
  RECEIVE_PAGE: 'RECEIVE_PAGE',
  REQUEST_PAGE: 'REQUEST_PAGE',
};

const catchPageFetchError = (page, error) => ({
  type: actionTypes.CATCH_PAGE_FETCH_ERROR,
  error,
  page,
});

const receivePage = (page, json) => ({
  type: actionTypes.RECEIVE_PAGE,
  page,
  slugs: json.objects && json.objects.map(object => object.slug),
});

const requestPage = page => ({
  type: actionTypes.REQUEST_PAGE,
  page,
});

const fetchPage = page => (dispatch) => {
  dispatch(requestPage(page));

  return fetch(`${API_URL}/posts/page/${page}`)
    .then(res => res.json())
    .then((json) => {
      dispatch(receivePage(page, json));
      return json.objects.forEach(post => dispatch(receivePost(post)));
    })
    .catch(error => catchPageFetchError(page, error));
};

const shouldFetchPage = (page, state) => {
  const { pages } = state;

  if (!pages[page]) return true;
  if (pages[page].isLoading) return false;
  return pages[page].slugs && !pages[page].slugs.length;
};

const fetchPageIfNeeded = page => (dispatch, getState) => {
  if (shouldFetchPage(page, getState())) return dispatch(fetchPage(page));
  return Promise.resolve();
};

export {
  actionTypes,
  catchPageFetchError,
  fetchPage,
  fetchPageIfNeeded,
  receivePage,
  requestPage,
  shouldFetchPage,
};
