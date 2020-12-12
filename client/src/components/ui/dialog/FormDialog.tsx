import React, { FC, ReactNode } from 'react';
import {
  DialogContent,
  DialogActions,
  Button,
  Dialog,
  IconButton,
  Typography,
  DialogTitle
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import styles from './FormDialog.module.scss';

export interface FormDialogOptions {
  onClose: () => void;
  onSave: () => void;
  title: string;
  content: ReactNode;
}

interface Props extends FormDialogOptions {
  open: boolean;
}

const FormDialog: FC<Props> = ({ onClose, onSave, open, title, content }) => {
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
      <DialogContent>{content}</DialogContent>
      <DialogActions className={styles.actions}>
        <Button onClick={onSave} variant="contained" color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormDialog;
