import { CourseType } from '../../types/models';

export interface CoursesState {
  courseTypes: CourseType[];
  loading: boolean;
}

export enum CoursesActionType {
  ADD_COURSE_TYPE = 'ADD_COURSE_TYPE',
  SET_COURSE_TYPES = 'SET_COURSE_TYPES',
  SET_LOADING = 'SET_LOADING'
}

interface CoursesAction {
  type: CoursesActionType;
  payload?: unknown;
}

export const initialCoursesState: CoursesState = {
  courseTypes: [],
  loading: false
};

export const coursesReducer = (
  state: CoursesState,
  action: CoursesAction
): CoursesState => {
  switch (action.type) {
    case CoursesActionType.ADD_COURSE_TYPE:
      const courseType = action?.payload as CourseType;
      const { courseTypes } = state;

      return {
        ...state,
        courseTypes: [...courseTypes, courseType],
        loading: false
      };
    case CoursesActionType.SET_COURSE_TYPES:
      return {
        ...state,
        courseTypes: action?.payload as CourseType[],
        loading: false
      };
    case CoursesActionType.SET_LOADING:
      return {
        ...state,
        loading: action?.payload as boolean
      };
    default:
      return state;
  }
};
