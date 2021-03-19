import classes from '*.module.css';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  Typography
} from '@material-ui/core';
import { Add, ExpandMore } from '@material-ui/icons';
import React, { FC } from 'react';
import { useCourses } from '../../../contexts/courses-context';
import { Course } from '../../../types/models';
import SectionTitle from '../../ui/section-title';
import styles from './CourseWorklogs.module.scss';

interface Props {
  course: Course;
}

const CourseWorklogs: FC<Props> = ({ course }) => {
  const { createWorklog } = useCourses();
  const { _id: courseId, worklogs } = course;

  const handleCreateWorklog = async () => {
    await createWorklog(courseId);
  };

  return (
    <>
      <SectionTitle title="Participants">
        <IconButton
          aria-label="Add"
          size="small"
          className={styles.btn}
          onClick={handleCreateWorklog}
          type="submit"
        >
          <Add />
        </IconButton>
      </SectionTitle>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Accordion 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default CourseWorklogs;
