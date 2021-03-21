import React, { createContext, FC, useContext, useReducer } from 'react';
import { useAuth } from '../auth-context';
import {
  coursesReducer,
  CoursesState,
  initialCoursesState
} from './coursesState';
import {
  useCoursesAPI,
  CoursesAPI,
  ParticipantsAPI,
  useParticipantsAPI
} from './hooks';
import { useWorklogsAPI, WorklogsAPI } from './hooks/useWorklogsAPI';

type CoursesContextContent = CoursesState &
  CoursesAPI &
  ParticipantsAPI &
  WorklogsAPI;

const CourseContext = createContext<CoursesContextContent>(
  {} as CoursesContextContent
);

export const useCourses = () => useContext(CourseContext);

const CoursesProvider: FC = props => {
  const [state, dispatch] = useReducer(coursesReducer, initialCoursesState);
  const { token } = useAuth();
  const coursesAPI = useCoursesAPI(dispatch, token);
  const participantsAPI = useParticipantsAPI(dispatch, token);
  const worklogsAPI = useWorklogsAPI(dispatch, token);

  return (
    <CourseContext.Provider
      value={{
        ...coursesAPI,
        ...participantsAPI,
        ...worklogsAPI,
        ...state
      }}
      {...props}
    />
  );
};

export default CoursesProvider;
