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
import { Add, Delete, Edit } from '@material-ui/icons';
import React, { FC } from 'react';
import { useCourses } from '../../../contexts/courses-context';
import { useDialog } from '../../../contexts/dialog-context';
import { isEmpty } from '../../../helper/checkUtils';
import { Course, Participant } from '../../../types/models';
import { ParticipantPayload } from '../../../types/payloads';
import SectionTitle from '../../ui/section-title';
import AddForm from './add-form/AddForm';
import styles from './CourseParticipants.module.scss';

interface Props {
  course: Course;
}

const CourseParticipants: FC<Props> = ({ course }) => {
  const { openDialog } = useDialog();
  const {
    createParticipant,
    updateParticipant,
    deleteParticipant
  } = useCourses();

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

  const handleEditParticipant = (participant: Participant) => async () => {
    const { _id } = participant;
    openDialog({
      title: 'Update Participant',
      closeButtonText: 'Update',
      formId: 'add-participant-form',
      content: (
        <AddForm
          onSubmit={(data: ParticipantPayload) =>
            updateParticipant(_id, courseId, data)
          }
          participant={participant}
        />
      )
    });
  };

  const handleDeleteParticipant = (participant: Participant) => async () => {
    const { _id } = participant;
    await deleteParticipant(_id, courseId);
  };

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
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {participants.map(participant => (
                  <TableRow key={participant._id}>
                    <TableCell>{participant.firstName}</TableCell>
                    <TableCell>{participant.lastName}</TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="Edit"
                        size="small"
                        onClick={handleEditParticipant(participant)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        aria-label="Delete"
                        size="small"
                        onClick={handleDeleteParticipant(participant)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
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
