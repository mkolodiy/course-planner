export interface SignInPayload {
  email: string;
  password?: string;
}

export interface SignUpPayload extends SignInPayload {
  firstName: string;
  lastName: string;
}

export interface CourseTypePayload {
  name: string;
  courseDuration: number;
  unitDuration: number;
}
