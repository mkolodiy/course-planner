import { ErrorOption } from 'react-hook-form';
import { ValidationError } from '../types/models';

export const setValidationError = (
  err: ValidationError,
  cb: (name: string, options: ErrorOption) => void
) => {
  const {
    cause: { name, error }
  } = err;
  cb(name, error);
};
