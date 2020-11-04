export enum Role {
  TRAINER = 'TRAINER',
  ADMIN = 'ADMIN'
}

export interface User {
  _id: string;
  roles: Role[];
}
