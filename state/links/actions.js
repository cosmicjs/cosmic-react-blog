import fetch from 'isomorphic-unfetch';
import { API_URL } from '../../utils/constants';

const actionTypes = {
  CATCH_LINKS_FETCH_ERROR: 'CATCH_LINKS_FETCH_ERROR',
  RECEIVE_LINKS: 'RECEIVE_LINKS',
  REQUEST_LINKS: 'REQUEST_LINKS',
};

const catchLinksFetchError = err => ({
  type: actionTypes.CATCH_LINKS_FETCH_ERROR,
  error: err.message,
});

const receiveLinks = json => ({
  type: actionTypes.RECEIVE_LINKS,
  items: json.objects && json.objects.map(object => ({
    content: object.content,
    icon: object.metadata && object.metadata.icon && object.metadata.icon.imgix_url,
    slug: object.slug,
    url: object.metadata && object.metadata.url,
  })),
});

const requestLinks = () => ({
  type: actionTypes.REQUEST_LINKS,
});

const fetchLinks = () => (dispatch) => {
  dispatch(requestLinks());

  return fetch(`${API_URL}/social-links`)
    .then(res => res.json())
    .then(json => dispatch(receiveLinks(json)))
    .catch(error => dispatch(catchLinksFetchError(error)));
};

const shouldFetchLinks = (state) => {
  const { links } = state;

  if (!links) return true;
  if (links.isLoading) return false;
  return !links.items || !links.items.length;
};

const fetchLinksIfNeeded = () => (dispatch, getState) => {
  if (shouldFetchLinks(getState())) return dispatch(fetchLinks());
  return Promise.resolve();
};

export {
  actionTypes,
  fetchLinks,
  fetchLinksIfNeeded,
  catchLinksFetchError,
  receiveLinks,
  requestLinks,
  shouldFetchLinks,
};
