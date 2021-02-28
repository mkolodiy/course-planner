import { Course, Participant } from '../../types/models';

export interface CoursesState {
  courses: Course[];
  loading: boolean;
}

export enum CoursesActionType {
  ADD_COURSE = 'ADD_COURSE',
  UPDATE_COURSE = 'UPDATE_COURSE',
  DELETE_COURSE = 'DELETE_COURSE',
  ADD_PARTICIPANT = 'ADD_PARTICIPANT',
  SET_COURSES = 'SET_COURSE',
  SET_LOADING = 'SET_LOADING'
}

export interface CoursesAction {
  type: CoursesActionType;
  payload?: unknown;
}

export const initialCoursesState: CoursesState = {
  courses: [],
  loading: false
};

export const coursesReducer = (
  state: CoursesState,
  action: CoursesAction
): CoursesState => {
  switch (action.type) {
    case CoursesActionType.ADD_COURSE: {
      const course = action?.payload as Course;
      const { courses } = state;

      return {
        ...state,
        courses: [...courses, course],
        loading: false
      };
    }
    case CoursesActionType.UPDATE_COURSE: {
      const course = action?.payload as Course;
      const courses = [...state.courses];
      const itemIndex = courses.findIndex(
        existingCourse => existingCourse._id === course._id
      );
      courses[itemIndex] = course;

      return {
        ...state,
        courses: courses,
        loading: false
      };
    }
    case CoursesActionType.DELETE_COURSE: {
      const courseId = action?.payload as string;
      const courses = [...state.courses];
      const itemIndex = courses.findIndex(
        existingCourse => existingCourse._id === courseId
      );
      courses.splice(itemIndex, 1);

      return {
        ...state,
        courses,
        loading: false
      };
    }
    case CoursesActionType.SET_COURSES: {
      return {
        ...state,
        courses: action?.payload as Course[],
        loading: false
      };
    }
    case CoursesActionType.SET_LOADING: {
      return {
        ...state,
        loading: action?.payload as boolean
      };
    }
    case CoursesActionType.ADD_PARTICIPANT: {
      // @ts-ignore
      const courseId = action?.payload?.courseId as string;
      // @ts-ignore
      const participant = action?.payload?.participant as Participant;

      const courses = [...state.courses];
      const itemIndex = courses.findIndex(
        existingCourse => existingCourse._id === courseId
      );
      const course = { ...courses[itemIndex] };
      course.participants = [participant, ...course.participants];
      courses[itemIndex] = course;

      return {
        ...state,
        courses,
        loading: false
      };
    }
    default:
      return state;
  }
};
