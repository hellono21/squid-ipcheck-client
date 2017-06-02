// import fetch from 'dva/fetch';
import axios from 'axios';
import { apiBaseUrl } from './config';

axios.defaults.baseURL = apiBaseUrl;

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function fetch(options) {
  const {
    method = 'get',
    data,
    url,
  } = options;

  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(url, {
        params: data,
      });
    case 'delete':
      return axios.delete(url, {
        data,
      });
    case 'post':
      return axios.post(url, data);
    case 'put':
      return axios.put(url, data);
    case 'patch':
      return axios.patch(url, data);
    default:
      return axios(options);
  }

}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(options) {
  return fetch(options)
    // .then(checkStatus)
    // .then(parseJSON)
    .then(data => ( data ));
    // .catch(err => ({ err }));
}
