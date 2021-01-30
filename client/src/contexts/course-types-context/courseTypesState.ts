import { CourseType } from '../../types/models';

export interface CourseTypesState {
  courseTypes: CourseType[];
  loading: boolean;
}

export enum CourseTypesActionType {
  ADD_COURSE_TYPE = 'ADD_COURSE_TYPE',
  UPDATE_COURSE_TYPE = 'UPDATE_COURSE_TYPE',
  DELETE_COURSE_TYPE = 'DELETE_COURSE_TYPE',
  SET_COURSE_TYPES = 'SET_COURSE_TYPES',
  SET_LOADING = 'SET_LOADING'
}

export interface CourseTypesAction {
  type: CourseTypesActionType;
  payload?: unknown;
}

export const initialCourseTypesState: CourseTypesState = {
  courseTypes: [],
  loading: false
};

export const courseTypesReducer = (
  state: CourseTypesState,
  action: CourseTypesAction
): CourseTypesState => {
  switch (action.type) {
    case CourseTypesActionType.ADD_COURSE_TYPE: {
      const courseType = action?.payload as CourseType;
      const { courseTypes } = state;

      return {
        ...state,
        courseTypes: [...courseTypes, courseType],
        loading: false
      };
    }
    case CourseTypesActionType.UPDATE_COURSE_TYPE: {
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
    case CourseTypesActionType.DELETE_COURSE_TYPE: {
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
    case CourseTypesActionType.SET_COURSE_TYPES: {
      return {
        ...state,
        courseTypes: action?.payload as CourseType[],
        loading: false
      };
    }
    case CourseTypesActionType.SET_LOADING: {
      return {
        ...state,
        loading: action?.payload as boolean
      };
    }
    default:
      return state;
  }
};
