import React, { FC } from 'react';
import AuthProvider from '../auth-context';
import CoursesProvider from '../course-context';
import DialogProvider from '../dialog-context/dialogContext';
import UserProvider from '../user-context/userContext';

const AppProvider: FC = ({ children }) => (
  <AuthProvider>
    <UserProvider>
      <CoursesProvider>
        <DialogProvider>{children}</DialogProvider>
      </CoursesProvider>
    </UserProvider>
  </AuthProvider>
);

export default AppProvider;
