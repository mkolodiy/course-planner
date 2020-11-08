import React, { FC } from 'react';
import { useAuth } from '../../contexts/auth-context/authContext';

const Courses: FC = () => {
  const { isAuthenticated } = useAuth();
  const authOk = isAuthenticated();
  return <div>Courses: {JSON.stringify(authOk)}</div>;
};

export default Courses;
