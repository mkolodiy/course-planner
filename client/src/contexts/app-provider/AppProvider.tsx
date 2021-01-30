import React, { FC } from 'react';
import AuthProvider from '../auth-context';
import CourseTypesProvider from '../course-types-context';
import DialogProvider from '../dialog-context/dialogContext';
import UserProvider from '../user-context/userContext';

const AppProvider: FC = ({ children }) => (
  <AuthProvider>
    <UserProvider>
      <CourseTypesProvider>
        <DialogProvider>{children}</DialogProvider>
      </CourseTypesProvider>
    </UserProvider>
  </AuthProvider>
);

export default AppProvider;
