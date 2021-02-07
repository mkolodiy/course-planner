import React, { FC, useEffect } from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import CourseDetails from '../../components/course/course-details';
import LoadingSpinner from '../../components/ui/loading-spinner';
import { useCourses } from '../../contexts/courses-context';

interface Params {
  id: string;
}

const Course: FC<RouteComponentProps<Params>> = ({ match }) => {
  const { push } = useHistory();
  const { courses } = useCourses();
  const {
    params: { id }
  } = match;
  const selectedCourse = courses.find(course => course._id === id);

  useEffect(() => {
    if (!selectedCourse) {
      push('/');
    }
  }, []);

  if (!selectedCourse) {
    return null;
  }

  return (
    <>
      <CourseDetails onSubmit={() => {}} course={selectedCourse} />
    </>
  );
};

export default Course;
