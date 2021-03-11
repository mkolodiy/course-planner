import { AxiosRequestConfig } from 'axios';
import { Dispatch } from 'react';
import { HttpMethod, RestApiUrl, sendRequest } from '../../../helper/axios';
import { ParticipantPayload } from '../../../types/payloads';
import { CoursesAction, CoursesActionType } from '../coursesState';

export interface ParticipantsAPI {
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
}

export const useCoursesAPI = (
  dispatch: Dispatch<CoursesAction>,
  token: string
): ParticipantsAPI => {
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

  return { createParticipant, updateParticipant, deleteParticipant };
};
