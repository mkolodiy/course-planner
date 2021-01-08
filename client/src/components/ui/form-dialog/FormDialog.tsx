import React, { FC } from 'react';
import {
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
  DialogTitle,
  Dialog
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import styles from './FormDialog.module.scss';

interface Props {
  onClose?: () => void;
  onSave?: () => void;
  title?: string;
  open: boolean;
  formId: string;
}

const FormDialog: FC<Props> = ({
  onClose,
  onSave,
  title,
  open,
  formId,
  children
}) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle disableTypography className={styles.title}>
        <Typography variant="h6" className={styles.titleText}>
          {title}
        </Typography>
        <IconButton
          aria-label="close"
          className={styles.titleBtn}
          onClick={onClose}
          size="small"
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions className={styles.actions}>
        <Button
          onClick={onSave}
          variant="contained"
          color="primary"
          form={formId}
          type="submit"
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormDialog;
