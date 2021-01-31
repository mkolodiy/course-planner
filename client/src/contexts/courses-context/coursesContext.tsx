import { AxiosRequestConfig } from 'axios';
import React, { createContext, FC, useContext, useReducer } from 'react';
import { HttpMethod, RestApiUrl, sendRequest } from '../../helper/axios';
import { CoursePayload } from '../../types/payloads';
import { useAuth } from '../auth-context';
import {
  CoursesActionType,
  coursesReducer,
  CoursesState,
  initialCoursesState
} from './coursesState';

type CoursesContextContent = CoursesState & {
  createCourse: (payload: CoursePayload) => Promise<void>;
  updateCourse: (id: string, payload: CoursePayload) => Promise<void>;
  deleteCourse: (id: string) => Promise<void>;
  getCourses: () => Promise<void>;
};

const CourseContext = createContext<CoursesContextContent>(
  {} as CoursesContextContent
);

export const useCourses = () => useContext(CourseContext);

const CourseProvider: FC = props => {
  const [state, dispatch] = useReducer(coursesReducer, initialCoursesState);
  const { token } = useAuth();

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

  const getCourses = async () => {
    dispatch({ type: CoursesActionType.SET_LOADING, payload: true });

    try {
      const requestConfig: AxiosRequestConfig = {
        method: HttpMethod.GET,
        url: RestApiUrl.GET_COURSE_TYPE,
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

  return (
    <CourseContext.Provider
      value={{
        createCourse: createCourse,
        updateCourse: updateCourse,
        deleteCourse: deleteCourse,
        getCourses: getCourses,
        ...state
      }}
      {...props}
    />
  );
};

export default CourseProvider;
