import { AxiosRequestConfig } from 'axios';
import React, { createContext, FC, useContext, useReducer } from 'react';
import { HttpMethod, RestApiUrl, sendRequest } from '../../helper/axios';
import { CourseTypePayload } from '../../types/payloads';
import { useAuth } from '../auth-context';
import {
  CoursesActionType,
  coursesReducer,
  CoursesState,
  initialCoursesState
} from './coursesState';

type CoursesContextContent = CoursesState & {
  createCourseType: (payload: CourseTypePayload) => Promise<void>;
  updateCourseType: (id: string, payload: CourseTypePayload) => Promise<void>;
  deleteCourseType: (id: string) => Promise<void>;
  getCourseTypes: () => Promise<void>;
};

const CoursesContext = createContext<CoursesContextContent>(
  {} as CoursesContextContent
);

export const useCourses = () => useContext(CoursesContext);

const CoursesProvider: FC = props => {
  const [state, dispatch] = useReducer(coursesReducer, initialCoursesState);
  const { token } = useAuth();

  const createCourseType = async (payload: CourseTypePayload) => {
    dispatch({ type: CoursesActionType.SET_LOADING, payload: true });

    try {
      const requestConfig: AxiosRequestConfig = {
        method: HttpMethod.POST,
        url: RestApiUrl.CREATE_COURSE_TYPE,
        data: payload,
        headers: {
          authorization: `Bearer: ${token}`
        }
      };
      const {
        data: { courseType }
      } = await sendRequest(requestConfig);

      dispatch({
        type: CoursesActionType.ADD_COURSE_TYPE,
        payload: courseType
      });
    } catch (err) {
      dispatch({ type: CoursesActionType.SET_LOADING, payload: false });
      throw err.response.data;
    }
  };

  const updateCourseType = async (id: string, payload: CourseTypePayload) => {
    dispatch({ type: CoursesActionType.SET_LOADING, payload: true });

    try {
      const requestConfig: AxiosRequestConfig = {
        method: HttpMethod.POST,
        url: RestApiUrl.UPDATE_COURSE_TYPE + '/' + id,
        data: payload,
        headers: {
          authorization: `Bearer: ${token}`
        }
      };
      const {
        data: { courseType }
      } = await sendRequest(requestConfig);

      dispatch({
        type: CoursesActionType.UPDATE_COURSE_TYPE,
        payload: courseType
      });
    } catch (err) {
      dispatch({ type: CoursesActionType.SET_LOADING, payload: false });
      throw err.response.data;
    }
  };

  const deleteCourseType = async (id: string) => {
    dispatch({ type: CoursesActionType.SET_LOADING, payload: true });

    try {
      const requestConfig: AxiosRequestConfig = {
        method: HttpMethod.DELETE,
        url: RestApiUrl.DELETE_COURSE_TYPE + '/' + id,
        headers: {
          authorization: `Bearer: ${token}`
        }
      };
      const {
        data: { courseType }
      } = await sendRequest(requestConfig);

      dispatch({
        type: CoursesActionType.DELETE_COURSE_TYPE,
        payload: id
      });
    } catch (err) {
      dispatch({ type: CoursesActionType.SET_LOADING, payload: false });
      throw err.response.data;
    }
  };

  const getCourseTypes = async () => {
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
        data: { courseTypes }
      } = await sendRequest(requestConfig);

      dispatch({
        type: CoursesActionType.SET_COURSE_TYPES,
        payload: courseTypes
      });
    } catch (err) {
      dispatch({ type: CoursesActionType.SET_LOADING, payload: false });
      throw err.response.data;
    }
  };

  return (
    <CoursesContext.Provider
      value={{
        createCourseType,
        updateCourseType,
        deleteCourseType,
        getCourseTypes,
        ...state
      }}
      {...props}
    />
  );
};

export default CoursesProvider;
