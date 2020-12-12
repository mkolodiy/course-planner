import React, { FC } from 'react';
import SectionTitle from '../../components/ui/section-title';
import { useAuth } from '../../contexts/auth-context/authContext';

const Courses: FC = () => {
  const { user } = useAuth();
  return (
    <>
      <SectionTitle title="Courses" />
    </>
  );
};

export default Courses;
