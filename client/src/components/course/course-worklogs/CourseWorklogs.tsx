import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Checkbox
} from '@material-ui/core';
import { Add, ExpandMore } from '@material-ui/icons';
import React, { FC, useState } from 'react';
import { useCourses } from '../../../contexts/courses-context';
import { isEmpty } from '../../../helper/checkUtils';
import { formatDate } from '../../../helper/dateUtils';
import { Course, Participant, Worklog } from '../../../types/models';
import SectionTitle from '../../ui/section-title';
import styles from './CourseWorklogs.module.scss';

interface Props {
  course: Course;
}

type PresenceStateValue = Map<string, boolean>;
type PresenceState = Map<string, PresenceStateValue>;

const getParticipantFullName = (participant: Participant) =>
  `${participant.firstName} ${participant.lastName}`;

const createInitialPresenceState = (worklogs: Worklog[]) => {
  const presenceState: PresenceState = new Map();

  for (const { _id, worklogEntries } of worklogs) {
    const stateValue: PresenceStateValue = new Map();

    for (const { _id, present } of worklogEntries) {
      stateValue.set(_id, present);
    }

    presenceState.set(_id, stateValue);
  }

  return presenceState;
};

const CourseWorklogs: FC<Props> = ({ course }) => {
  const { createWorklog } = useCourses();
  const { _id: courseId, worklogs, participants } = course;

  const [presenceState, setPresenceState] = useState(
    createInitialPresenceState(worklogs)
  );

  const handlePresenceState = (
    worklogId: string,
    worklogEntryId: string
  ) => () => {
    const prevValue = presenceState.get(worklogId)?.get(worklogEntryId);
    setPresenceState(prevPresenceState => {
      // @ts-ignore
      const worklogState = prevPresenceState
        .get(worklogId)
        .set(worklogEntryId, !prevValue);
      return new Map(prevPresenceState.set(worklogId, new Map(worklogState)));
    });
  };

  const getChecked = (worklogId: string, worklogEntryId: string) =>
    presenceState.get(worklogId)?.get(worklogEntryId);

  const handleCreateWorklog = async () => {
    await createWorklog(courseId);
  };

  const renderWorklog = (
    { _id: worklogId, date, worklogEntries }: Worklog,
    index: number
  ) => {
    return (
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls={`panel${index}a-header`}
          id={`panel${index}a-header`}
        >
          <Typography>{formatDate(date)}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Paper variant="outlined" className={styles.paper}>
            <TableContainer>
              <Table aria-label="Course types table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Present</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {worklogEntries.map(
                    ({ _id: worklogEntryId, present, participant }) => (
                      <TableRow key={worklogEntryId}>
                        <TableCell>
                          {getParticipantFullName(participant)}
                        </TableCell>
                        <TableCell>
                          <Checkbox
                            checked={
                              getChecked(worklogId, worklogEntryId) || present
                            }
                            onChange={handlePresenceState(
                              worklogId,
                              worklogEntryId
                            )}
                          />
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </AccordionDetails>
      </Accordion>
    );
  };

  return (
    <>
      <SectionTitle title="Worklogs">
        {isEmpty(worklogs) && !isEmpty(participants) && (
          <IconButton
            aria-label="Add"
            size="small"
            className={styles.btn}
            onClick={handleCreateWorklog}
            type="submit"
          >
            <Add />
          </IconButton>
        )}
      </SectionTitle>
      {isEmpty(worklogs) ? (
        <div>Worklog list is empty</div>
      ) : (
        worklogs.map(renderWorklog)
      )}
    </>
  );
};

export default CourseWorklogs;
