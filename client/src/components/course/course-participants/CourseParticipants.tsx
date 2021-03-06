import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React, { FC } from 'react';
import { useCourses } from '../../../contexts/courses-context';
import { useDialog } from '../../../contexts/dialog-context';
import { isEmpty } from '../../../helper/checkUtils';
import { Course } from '../../../types/models';
import { ParticipantPayload } from '../../../types/payloads';
import SectionTitle from '../../ui/section-title';
import AddForm from './add-form/AddForm';
import styles from './CourseParticipants.module.scss';

interface Props {
  course: Course;
}

const CourseParticipants: FC<Props> = ({ course }) => {
  const { openDialog } = useDialog();
  const { createParticipant } = useCourses();

  const { _id: courseId, participants } = course;

  const onSubmit = (data: ParticipantPayload) =>
    createParticipant(courseId, data);

  const handleAddParticipant = () =>
    openDialog({
      title: 'New Participant',
      formId: 'add-participant-form',
      content: <AddForm onSubmit={onSubmit} />,
      closeButtonText: 'Add'
    });

  return (
    <div className={styles.courseParticipants}>
      <SectionTitle title="Participants">
        <IconButton
          aria-label="Add"
          size="small"
          className={styles.btn}
          onClick={handleAddParticipant}
          type="submit"
        >
          <Add />
        </IconButton>
      </SectionTitle>
      {!isEmpty(participants) ? (
        <Paper variant="outlined">
          <TableContainer>
            <Table aria-label="Participants table">
              <TableHead>
                <TableRow>
                  <TableCell>First name</TableCell>
                  <TableCell>Last name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {participants.map(participant => (
                  <TableRow key={participant._id}>
                    <TableCell>{participant.firstName}</TableCell>
                    <TableCell>{participant.lastName}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      ) : (
        <div>Participant list is empty</div>
      )}
    </div>
  );
};

export default CourseParticipants;
