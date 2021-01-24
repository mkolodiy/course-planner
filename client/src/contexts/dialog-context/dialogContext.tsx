import React, {
  useContext,
  createContext,
  FC,
  useState,
  ReactElement
} from 'react';
import FormDialog from '../../components/ui/form-dialog';

interface DialogContextContent {
  openDialog: (options: DialogOptions) => void;
  closeDialog: () => void;
}

export interface DialogOptions {
  onClose?: () => void;
  onSave?: () => void;
  title: string;
  closeButtonText?: string;
  formId?: string;
  content: ReactElement;
}

const DialogContext = createContext<DialogContextContent>(
  {} as DialogContextContent
);

export const useDialog = () => useContext(DialogContext);

const DialogProvider: FC = props => {
  const [dialogOptions, setDialogOptions] = useState<DialogOptions | null>(
    null
  );

  const openDialog = (options: DialogOptions) => {
    setDialogOptions(options);
  };

  const closeDialog = () => {
    dialogOptions?.onClose?.();
    setDialogOptions(null);
  };

  return (
    <>
      <DialogContext.Provider value={{ openDialog, closeDialog }} {...props}>
        {props.children}
        {!!dialogOptions && (
          <FormDialog
            open={!!dialogOptions}
            onClose={closeDialog}
            onSave={dialogOptions?.onSave}
            title={dialogOptions?.title}
            closeButtonText={dialogOptions?.closeButtonText}
            formId={dialogOptions?.formId || ''}
          >
            {dialogOptions?.content}
          </FormDialog>
        )}
      </DialogContext.Provider>
    </>
  );
};

export default DialogProvider;
