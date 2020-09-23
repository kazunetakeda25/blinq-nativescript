import axios from './axios.helper';
import { compileUrl } from '../url.helper';
import { ObjectToFormData } from '../formData.helper';
import { handleApiError } from './apiError.helper';
import { ACCOUNT } from '../../constants';

const REQUEST_TYPE = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DEL: 'DEL',
};

const getDefaultParams = () => ({
  PublicKey: ACCOUNT.PUBLIC_KEY,
  Hash: ACCOUNT.HASH,
  Timestamp: ACCOUNT.TIME_STAMP,
});

const getCurrencySelected = () => {
  const store = require('~/store').default;
  const { GETTERS } = require('~/store/menu');
  const selectedCurrency = store.getters[GETTERS.SELECTED_CURRENCY_DETAIL];
  return {
    CurrencyCode: selectedCurrency && selectedCurrency.Code || '',
    CurrencyExchangeRate: selectedCurrency && selectedCurrency.ExchangeRate || '',
  };
};

const toggleLoading = (isLoading) => {
  const storeModule = require('~/store');
  const store = storeModule.default;
  const { MUTATORS } = storeModule;
  if (isLoading) {
    store.commit(MUTATORS.ADD_PROCESSING);
  } else {
    store.commit(MUTATORS.REMOVE_PROCESSING);
  }
};

/**
 * Requests to API
 * @param {String} type
 * @param {String} endpoint
 * @param {Object} queryParam
 * @param {Object} data
 * @param {import('axios').AxiosRequestConfig} options
 * If you wish to send FormData instead of JSON, set options.useFormData to true.
 */
const request = (type, endpoint, queryParam = {}, data = {}, options = {
    useFormData: false,
    listResponse: false,
    rawResponse: false,
  }) => {
  
  let req;
  const url = compileUrl(endpoint, Object.assign({}, queryParam, getDefaultParams(), getCurrencySelected()));
  let formData = { ...data, ...getDefaultParams(), ...getCurrencySelected() };
  const reqOptions = { ...options };
  if (options.useFormData) {
    formData = ObjectToFormData({ ...data });
    reqOptions.headers = { 'Content-Type': 'multipart/form-data' };
  }
  console.log(`URL: ${url}, DATA: ${JSON.stringify(formData)}`);
  switch (type) {
    case REQUEST_TYPE.POST:
      req = axios.post(url, formData, reqOptions);
      break;

    case REQUEST_TYPE.PUT:
      req = axios.put(url, formData, reqOptions);
      break;

    case REQUEST_TYPE.DEL:
      req = axios.delete(url, reqOptions);
      break;

    default:
      req = axios.get(url, reqOptions);
      break;
  }
  toggleLoading(true);
  return req.then(response => {
    toggleLoading(false);
    if (options.rawResponse) {
      return response.data;
    }
    if (options.listResponse) {
      return response.data.Content;
    }
    return response.data.Content[0];
  }).catch(reason => {
    toggleLoading(false);
    return handleApiError(url, reason);
  });
};

/**
 * Send GET Request to API
 * @param {String} url
 * @param {Object} queryParam
 * @param {AxiosRequestConfig} options
 */
const get = (url, queryParam = {}, options = {}) => (
  request(REQUEST_TYPE.GET, url, queryParam, null, options)
);

/**
 * Send POST Request to API
 * @param {String} url
 * @param {Object} queryParam
 * @param {Object} data
 * @param {AxiosRequestConfig} options
 * If you wish to send FormData instead of JSON, set options.useFormData to true.
 */
const post = (url, queryParam = {}, data = {}, options = {}) => (
  request(REQUEST_TYPE.POST, url, queryParam, data, options)
);

/**
 * Send PUT Request to API
 * @param {String} url
 * @param {Object} queryParam
 * @param {Object} data
 * @param {AxiosRequestConfig} options
 * If you wish to send FormData instead of JSON, set options.useFormData to true.
 */
const put = (url, queryParam = {}, data = {}, options = {}) => (
  request(REQUEST_TYPE.PUT, url, queryParam, data, options)
);

/**
 * Send DELETE Request to API
 * @param {String} url
 * @param {Object} queryParam
 * @param {AxiosRequestConfig} options
 */
const remove = (url, queryParam = {}, options = {}) => (
  request(REQUEST_TYPE.DEL, url, queryParam, null, options)
);

export default {
  get,
  post,
  put,
  delete: remove,
};
