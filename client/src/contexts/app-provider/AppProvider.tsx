import React, { FC } from 'react';
import AuthProvider from '../auth-context';
import DialogProvider from '../dialog-context/dialogContext';
import UserProvider from '../user-context/userContext';

const AppProvider: FC = ({ children }) => (
  <AuthProvider>
    <UserProvider>
      <DialogProvider>{children}</DialogProvider>
    </UserProvider>
  </AuthProvider>
);

export default AppProvider;
