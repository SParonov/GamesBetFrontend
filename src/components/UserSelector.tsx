import React, { FC } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, Button, Snackbar, Alert } from '@mui/material';

interface UserSelector {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  openSnackbar: boolean;
  setOpenSnackbar: React.Dispatch<React.SetStateAction<boolean>>;
  snackbarMessage: string;
  isError: boolean;
  friends: string[];
  handler: (email: string) => void;
  headerMessage: string;
}

const UserSelector: FC<UserSelector> = ({
  openDialog,
  setOpenDialog,
  openSnackbar,
  setOpenSnackbar,
  snackbarMessage,
  isError,
  friends,
  handler,
  headerMessage,
}) => {
  return (
    <div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={1000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={isError ? "error" : "success"}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{headerMessage}</DialogTitle>
        <DialogContent style={{ maxHeight: 400, overflowY: "auto" }}>
          {friends.length > 0 ? (
            <List>
              {friends.map((email, index) => (
                <ListItem key={index}>
                  <Button onClick={() => handler(email)}>
                    {index + 1}. {email}
                  </Button>
                </ListItem>
              ))}
            </List>
          ) : (
            "No friends :("
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserSelector;
