import React, { FC } from 'react';
import { useUser } from '../../contexts/user-context';
import styles from './Profile.module.scss';

const Profile: FC = () => {
  const { user } = useUser();
  return <div>profile: {JSON.stringify(user)}</div>;
};

export default Profile;
