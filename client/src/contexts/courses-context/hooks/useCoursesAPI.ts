import { AxiosRequestConfig } from 'axios';
import { Dispatch } from 'react';
import { HttpMethod, RestApiUrl, sendRequest } from '../../../helper/axios';
import { CoursePayload } from '../../../types/payloads';
import { CoursesAction, CoursesActionType } from '../coursesState';

export interface CoursesAPI {
  getCourses: () => Promise<void>;
  createCourse: (payload: CoursePayload) => Promise<void>;
  updateCourse: (id: string, payload: CoursePayload) => Promise<void>;
  deleteCourse: (id: string) => Promise<void>;
}

export const useParticipantsAPI = (
  dispatch: Dispatch<CoursesAction>,
  token: string
): CoursesAPI => {
  const getCourses = async () => {
    dispatch({ type: CoursesActionType.SET_LOADING, payload: true });

    try {
      const requestConfig: AxiosRequestConfig = {
        method: HttpMethod.GET,
        url: RestApiUrl.GET_COURSES,
        headers: {
          authorization: `Bearer: ${token}`
        }
      };
      const {
        data: { courses }
      } = await sendRequest(requestConfig);

      dispatch({
        type: CoursesActionType.SET_COURSES,
        payload: courses
      });
    } catch (err) {
      dispatch({ type: CoursesActionType.SET_LOADING, payload: false });
      throw err.response.data;
    }
  };

  const createCourse = async (payload: CoursePayload) => {
    dispatch({ type: CoursesActionType.SET_LOADING, payload: true });

    try {
      const requestConfig: AxiosRequestConfig = {
        method: HttpMethod.POST,
        url: RestApiUrl.CREATE_COURSE,
        data: payload,
        headers: {
          authorization: `Bearer: ${token}`
        }
      };
      const {
        data: { course }
      } = await sendRequest(requestConfig);

      dispatch({
        type: CoursesActionType.ADD_COURSE,
        payload: course
      });
    } catch (err) {
      dispatch({ type: CoursesActionType.SET_LOADING, payload: false });
      throw err.response.data;
    }
  };

  const updateCourse = async (id: string, payload: CoursePayload) => {
    dispatch({ type: CoursesActionType.SET_LOADING, payload: true });

    try {
      const requestConfig: AxiosRequestConfig = {
        method: HttpMethod.POST,
        url: RestApiUrl.UPDATE_COURSE + '/' + id,
        data: payload,
        headers: {
          authorization: `Bearer: ${token}`
        }
      };
      const {
        data: { course }
      } = await sendRequest(requestConfig);

      dispatch({
        type: CoursesActionType.UPDATE_COURSE,
        payload: course
      });
    } catch (err) {
      dispatch({ type: CoursesActionType.SET_LOADING, payload: false });
      throw err.response.data;
    }
  };

  const deleteCourse = async (id: string) => {
    dispatch({ type: CoursesActionType.SET_LOADING, payload: true });

    try {
      const requestConfig: AxiosRequestConfig = {
        method: HttpMethod.DELETE,
        url: RestApiUrl.DELETE_COURSE + '/' + id,
        headers: {
          authorization: `Bearer: ${token}`
        }
      };
      await sendRequest(requestConfig);

      dispatch({
        type: CoursesActionType.DELETE_COURSE,
        payload: id
      });
    } catch (err) {
      dispatch({ type: CoursesActionType.SET_LOADING, payload: false });
      throw err.response.data;
    }
  };

  return { getCourses, createCourse, updateCourse, deleteCourse };
};
