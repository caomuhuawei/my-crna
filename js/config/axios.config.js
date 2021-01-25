import axios from 'axios';
import Qs from 'qs';
import {allStore} from '../store/configureStore';
const loading = [];
const localLoading = [];
const serviceConfig = {
  url: '/',
  method: 'get',
  transformResponse: [(data) => Qs.parse(data)],
  timeout: 2 * 60 * 1000,
  responseType: 'json',
  withCredentials: true,
};
// Axios Instance.
const axiosInstance = axios.create(serviceConfig);

const whenError = (errorMsg) => {
  const cancelToken = axios.CancelToken;
  const source = cancelToken.source();
  console.error(`errorMsg:${errorMsg}`);
  source.cancel(
    'All Request canceled because NO AUTH Info find or token is expired.',
  );
};

const configHeaders = (options, loadingType = 0) => {
  const newOptions = {headers: {}};
  newOptions.headers = Object.assign(options.headers, {
    'Content-Type': options.headers['Content-Type'] || 'application/json',
    loadingType,
  });
  return newOptions;
};

const resetLoading = (rs, loadingType) => {
  if (loadingType === 2) {
    return;
  }
  const {setLocalLoading, setLoading} = allStore.common;
  const targetLoading = loadingType === 1 ? localLoading : loading;
  const index = targetLoading.indexOf(rs);
  if (index > -1) {
    targetLoading.splice(index, 1);
  }
  if (targetLoading.length < 1) {
    loadingType === 1 ? setLocalLoading(false) : setLoading(false);
  }
};
// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const {setLocalLoading, setLoading} = allStore.common;
    const {loadingType} = config.headers;
    switch (
      loadingType //默认0：全局loading, 1:局部loading, 2:无loading
    ) {
      case 1:
        setLocalLoading(true);
        if (localLoading.indexOf(config.url) < 0) {
          localLoading.push(config.url);
        }
        break;
      case 2:
        break;
      default:
        setLoading(true);
        if (loading.indexOf(config.url) < 0) {
          loading.push(config.url);
        }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    const {data, config = {}} = response;
    const {headers} = config;
    resetLoading(config.url, headers.loadingType);
    if (data.success) {
      return response;
    }
    return Promise.reject(data);
  },
  (error) => {
    const {response} = error;
    const {url, headers} = response.config;
    resetLoading(url, headers.loadingType);
    whenError();
    return Promise.reject(error);
  },
);

const getAndDel = (url, params, method) => {
  const {query, options, loadingType = 0} = params;
  let queryString = '';
  if (query) {
    queryString = `${url}?${Qs.stringify(query)}`;
  } else {
    queryString = url;
  }
  return axiosInstance[method](
    queryString,
    configHeaders(options, loadingType),
  );
};

const putAndPost = (url, params, method) => {
  const {data, options, loadingType} = params;
  return axiosInstance[method](url, data, configHeaders(options, loadingType));
};

export default {
  get: (url, params = {}) => {
    getAndDel(url, params, 'get');
  },
  put: (url, params = {}) => {
    putAndPost(url, params, 'put');
  },
  post: (url, params = {}) => {
    putAndPost(url, params, 'post');
  },
  del: (url, params = {}) => {
    getAndDel(url, params, 'del');
  },
};
