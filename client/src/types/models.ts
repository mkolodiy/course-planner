export interface Error {
  name: string;
}

export interface ValidationError extends Error {
  cause: {
    name: string;
    error: {
      message: string;
    };
  };
}

export enum Role {
  TRAINER = 'TRAINER',
  ADMIN = 'ADMIN'
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  roles: Role[];
}

export interface CourseType {
  _id: string;
  name: string;
  courseDuration: number;
  unitDuration: number;
  createdAt: string;
  updatedAt: string;
}

export interface Course {
  _id: string;
  name: string;
  type: CourseType;
  startDate: string;
  endDate: string;
}
