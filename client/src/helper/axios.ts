import axios, { AxiosRequestConfig } from 'axios';
import { Http2SecureServer } from 'http2';

const instance = axios.create({
  baseURL: 'http://localhost:5050/api/v1/'
});

export enum RestApiUrl {
  SIGN_IN = 'auth/signin',
  SIGN_UP = 'auth/signup'
}

export enum HttpMethod {
  POST = 'POST'
}

export const sendRequest = (config: AxiosRequestConfig) => {
  return instance.request(config);
};

export const createRequestConfig = (
  method: HttpMethod,
  url: RestApiUrl,
  data: any
): AxiosRequestConfig => ({
  method,
  url,
  data
});

export default instance;
