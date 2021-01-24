import { CourseType } from '../../types/models';

export interface CoursesState {
  courseTypes: CourseType[];
  loading: boolean;
}

export enum CoursesActionType {
  ADD_COURSE_TYPE = 'ADD_COURSE_TYPE',
  UPDATE_COURSE_TYPE = 'UPDATE_COURSE_TYPE',
  DELETE_COURSE_TYPE = 'DELETE_COURSE_TYPE',
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
    case CoursesActionType.ADD_COURSE_TYPE: {
      const courseType = action?.payload as CourseType;
      const { courseTypes } = state;

      return {
        ...state,
        courseTypes: [...courseTypes, courseType],
        loading: false
      };
    }
    case CoursesActionType.UPDATE_COURSE_TYPE: {
      const courseType = action?.payload as CourseType;
      const courseTypes = [...state.courseTypes];
      const itemIndex = courseTypes.findIndex(
        existingCourseType => existingCourseType._id === courseType._id
      );
      courseTypes[itemIndex] = courseType;

      return {
        ...state,
        courseTypes,
        loading: false
      };
    }
    case CoursesActionType.DELETE_COURSE_TYPE: {
      const courseTypeId = action?.payload as string;
      const courseTypes = [...state.courseTypes];
      const itemIndex = courseTypes.findIndex(
        existingCourseType => existingCourseType._id === courseTypeId
      );
      courseTypes.splice(itemIndex, 1);

      return {
        ...state,
        courseTypes,
        loading: false
      };
    }
    case CoursesActionType.SET_COURSE_TYPES: {
      return {
        ...state,
        courseTypes: action?.payload as CourseType[],
        loading: false
      };
    }
    case CoursesActionType.SET_LOADING: {
      return {
        ...state,
        loading: action?.payload as boolean
      };
    }
    default:
      return state;
  }
};
