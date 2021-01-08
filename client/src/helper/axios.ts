import axios, { AxiosRequestConfig } from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5050/api/v1/'
});

export enum RestApiUrl {
  SIGN_IN = 'auth/signin',
  SIGN_UP = 'auth/signup',
  GET_PROFILE = 'users/profile',
  UPDATE_PROFILE = 'users/profile',
  CREATE_COURSE_TYPE = 'coursetypes',
  GET_COURSE_TYPE = 'coursetypes'
}

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST'
}

export const sendRequest = (config: AxiosRequestConfig) => {
  return instance.request(config);
};

export default instance;
