import fetch from 'isomorphic-unfetch';
import { API_URL } from '../../utils/constants';

const actionTypes = {
  CATCH_METADATA_FETCH_ERROR: 'CATCH_METADATA_FETCH_ERROR',
  RECEIVE_SITE_METADATA: 'RECEIVE_SITE_METADATA',
  REQUEST_SITE_METADATA: 'REQUEST_SITE_METADATA',
};

const catchMetadataFetchError = error => ({
  type: actionTypes.CATCH_METADATA_FETCH_ERROR,
  error,
});

const receiveSiteMetadata = json => ({
  type: actionTypes.RECEIVE_SITE_METADATA,
  logo: json.object && json.object.metadata && json.object.metadata.site_logo,
  tag: json.object && json.object.metadata && json.object.metadata.site_tag,
  title: json.object && json.object.metadata && json.object.metadata.site_title,
});

const requestSiteMetadata = () => ({
  type: actionTypes.REQUEST_SITE_METADATA,
});

const fetchSiteMetadata = () => (dispatch) => {
  dispatch(requestSiteMetadata());

  return fetch(`${API_URL}/meta`)
    .then(res => res.json())
    .then(json => dispatch(receiveSiteMetadata(json)))
    .catch(error => dispatch(catchMetadataFetchError(error)));
};

const shouldFetchSiteMetadata = (state) => {
  const { metadata } = state;

  if (!metadata) return true;
  if (metadata.isLoading) return false;
  return !metadata.logo || !metadata.tag || !metadata.title;
};

const fetchSiteMetadataIfNeeded = () => (dispatch, getState) => {
  if (shouldFetchSiteMetadata(getState())) return dispatch(fetchSiteMetadata());
  return Promise.resolve();
};

export {
  actionTypes,
  fetchSiteMetadata,
  fetchSiteMetadataIfNeeded,
  catchMetadataFetchError,
  receiveSiteMetadata,
  requestSiteMetadata,
  shouldFetchSiteMetadata,
};
