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
  UPDATE_COURSE_TYPE = 'coursetypes',
  DELETE_COURSE_TYPES = 'coursetypes',
  GET_COURSE_TYPES = 'coursetypes',
  CREATE_COURSE = 'courses',
  UPDATE_COURSE = 'courses',
  DELETE_COURSE = 'courses',
  GET_COURSES = 'courses'
}

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE'
}

export const sendRequest = (config: AxiosRequestConfig) => {
  return instance.request(config);
};

export default instance;
