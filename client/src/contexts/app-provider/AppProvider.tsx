import React, { FC } from 'react';
import AuthProvider from '../auth-context';
import UserProvider from '../user-context/userContext';

const AppProvider: FC = ({ children }) => (
  <AuthProvider>
    <UserProvider>{children}</UserProvider>
  </AuthProvider>
);

export default AppProvider;
