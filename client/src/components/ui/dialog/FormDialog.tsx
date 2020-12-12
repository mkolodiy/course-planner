import React, { FC } from 'react';
import {
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  Dialog,
  IconButton,
  Typography,
  DialogTitle
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import styles from './FormDialog.module.scss';

interface Props {
  onClose: () => void;
  onSave: () => void;
  open: boolean;
  title: string;
}

const FormDialog: FC<Props> = ({ onClose, onSave, open, title }) => {
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle disableTypography className={styles.title}>
        <Typography variant="h6" className={styles.titleText}>
          {title}
        </Typography>
        <IconButton
          aria-label="close"
          className={styles.titleBtn}
          onClick={onClose}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <form>tets</form>
      </DialogContent>
      <DialogActions className={styles.actions}>
        <Button onClick={onClose} variant="contained" color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormDialog;
