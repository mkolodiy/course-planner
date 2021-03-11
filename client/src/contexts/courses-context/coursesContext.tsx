import { AxiosRequestConfig } from 'axios';
import React, { createContext, FC, useContext, useReducer } from 'react';
import { HttpMethod, RestApiUrl, sendRequest } from '../../helper/axios';
import { CoursePayload, ParticipantPayload } from '../../types/payloads';
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
  createParticipant: (
    courseId: string,
    payload: ParticipantPayload
  ) => Promise<void>;
  updateParticipant: (
    id: string,
    courseId: string,
    payload: ParticipantPayload
  ) => Promise<void>;
  deleteParticipant: (id: string, courseId: string) => Promise<void>;
};

const CourseContext = createContext<CoursesContextContent>(
  {} as CoursesContextContent
);

export const useCourses = () => useContext(CourseContext);

const CoursesProvider: FC = props => {
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

  const createParticipant = async (
    courseId: string,
    payload: ParticipantPayload
  ) => {
    dispatch({ type: CoursesActionType.SET_LOADING, payload: true });

    try {
      const requestConfig: AxiosRequestConfig = {
        method: HttpMethod.POST,
        url: RestApiUrl.CREATE_PARTICIPANT + '/' + courseId,
        data: payload,
        headers: {
          authorization: `Bearer: ${token}`
        }
      };
      const {
        data: { participant }
      } = await sendRequest(requestConfig);

      dispatch({
        type: CoursesActionType.ADD_PARTICIPANT,
        payload: {
          participant,
          courseId
        }
      });
    } catch (err) {
      dispatch({ type: CoursesActionType.SET_LOADING, payload: false });
      throw err.response.data;
    }
  };

  const updateParticipant = async (
    id: string,
    courseId: string,
    payload: ParticipantPayload
  ) => {
    dispatch({ type: CoursesActionType.SET_LOADING, payload: true });

    try {
      const requestConfig: AxiosRequestConfig = {
        method: HttpMethod.POST,
        url: RestApiUrl.UPDATE_PARTICIPANT + '/' + id,
        data: payload,
        headers: {
          authorization: `Bearer: ${token}`
        }
      };
      const {
        data: { participant }
      } = await sendRequest(requestConfig);

      dispatch({
        type: CoursesActionType.UPDATE_PARTICIPANT,
        payload: {
          participant,
          courseId
        }
      });
    } catch (err) {
      dispatch({ type: CoursesActionType.SET_LOADING, payload: false });
      throw err.response.data;
    }
  };

  const deleteParticipant = async (id: string, courseId: string) => {
    dispatch({ type: CoursesActionType.SET_LOADING, payload: true });

    try {
      const requestConfig: AxiosRequestConfig = {
        method: HttpMethod.DELETE,
        url: RestApiUrl.DELETE_PARTICIPANT + '/' + id,
        headers: {
          authorization: `Bearer: ${token}`
        }
      };
      await sendRequest(requestConfig);

      dispatch({
        type: CoursesActionType.DELETE_PARTICIPANT,
        payload: {
          participantId: id,
          courseId
        }
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
        createParticipant,
        updateParticipant,
        deleteParticipant,
        ...state
      }}
      {...props}
    />
  );
};

export default CoursesProvider;
