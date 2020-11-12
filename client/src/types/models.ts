export enum Role {
  TRAINER = 'TRAINER',
  ADMIN = 'ADMIN'
}

export interface User {
  _id: string;
  roles: Role[];
}

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
