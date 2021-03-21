import { AxiosRequestConfig } from 'axios';
import { Dispatch } from 'react';
import { HttpMethod, RestApiUrl, sendRequest } from '../../../helper/axios';
import { CoursePayload } from '../../../types/payloads';
import { CoursesAction, CoursesActionType } from '../coursesState';

export interface WorklogsAPI {
  createWorklog: (courseId: string) => Promise<void>;
}

export const useWorklogsAPI = (
  dispatch: Dispatch<CoursesAction>,
  token: string
): WorklogsAPI => {
  const createWorklog = async (courseId: string) => {
    dispatch({ type: CoursesActionType.SET_LOADING, payload: true });

    try {
      const requestConfig: AxiosRequestConfig = {
        method: HttpMethod.POST,
        url: RestApiUrl.CREATE_WORKLOG + '/' + courseId,
        headers: {
          authorization: `Bearer: ${token}`
        }
      };
      const {
        data: { worklogs }
      } = await sendRequest(requestConfig);

      dispatch({
        type: CoursesActionType.ADD_WORKLOGS,
        payload: {
          courseId,
          worklogs
        }
      });
    } catch (err) {
      dispatch({ type: CoursesActionType.SET_LOADING, payload: false });
      throw err.response.data;
    }
  };

  return { createWorklog };
};
