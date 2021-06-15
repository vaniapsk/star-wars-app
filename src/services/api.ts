import axios from 'axios';
import axiosRetry from 'axios-retry';

const api = axios.create({
  baseURL: 'https://swapi.dev/api',
});

const retryDelay = (retryNumber = 0) => {
  const seconds = 2 ** retryNumber * 1000;
  const randomMs = 1000 * Math.random();
  return seconds + randomMs;
};

axiosRetry(api, {
  retries: 2,
  retryDelay,
  // retry on Network Error & 5xx responses
  retryCondition: axiosRetry.isRetryableError,

});

export default api;
