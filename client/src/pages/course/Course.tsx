import React, { FC, useEffect } from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import CourseDetails from '../../components/course/course-details';
import CourseParticipants from '../../components/course/course-participants';
import CourseWorklogs from '../../components/course/course-worklogs/CourseWorklogs';
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
      <CourseDetails course={selectedCourse} />
      <CourseParticipants course={selectedCourse} />
      <CourseWorklogs course={selectedCourse} />
    </>
  );
};

export default Course;
