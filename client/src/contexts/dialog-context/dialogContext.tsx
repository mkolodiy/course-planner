import React, {
  useContext,
  createContext,
  FC,
  useState,
  ReactElement
} from 'react';
import { Dialog, Modal } from '@material-ui/core';
import { isEmpty } from '../../helper/checkUtils';

interface DialogContextContent {
  openDialog: (options: DialogOptions) => void;
  closeDialog: () => void;
}

export interface DialogOptions {
  content: ReactElement;
}

const DialogContext = createContext<DialogContextContent>(
  {} as DialogContextContent
);

export const useDialog = () => useContext(DialogContext);

const DialogProvider: FC = props => {
  const [dialogOptions, setDialogOptions] = useState<DialogOptions>(
    {} as DialogOptions
  );

  const openDialog = (options: DialogOptions) => {
    setDialogOptions(options);
  };

  const closeDialog = () => {
    setDialogOptions({} as DialogOptions);
  };

  return (
    <>
      <DialogContext.Provider value={{ openDialog, closeDialog }} {...props} />
      {/* <Modal open={!isEmpty(dialogOptions)} onClose={closeDialog}>
        {dialogOptions?.content}
      </Modal> */}
      <Dialog open={!isEmpty(dialogOptions)} onClose={closeDialog}>
        {dialogOptions?.content}
      </Dialog>
    </>
  );
};

export default DialogProvider;
