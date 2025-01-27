"use client";
import { useEffect, useState } from "react";
import Logo from "@/components/Logo";
import useCheckSession from "@/utils/useCheckSession";
import getUserEmail from "@/utils/getUserEmail";
import {
  Alert,
  Badge,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  Snackbar,
  Typography,
} from "@mui/material";
import GameMenu from "@/components/GameMenu";
import { DataGrid } from "@mui/x-data-grid";
import { friendsCol, invite } from "@/utils/datagrid";
import api from "@/utils/axios";

export default function UserInfo() {
  const [friends, setFriends] = useState([]);
  const [potentialFriends, setPotentialFriends] = useState([]);
  const [invites, setInvites] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isError, setIsError] = useState(false);

  useCheckSession();

  const [email, setEmail] = useState<string | undefined>("");
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const email = getUserEmail();
    setEmail(email);
  }, []);

  const getFriends = async () => {
    try {
      const res = await api.get(`/getFriends/${getUserEmail()}`);
      if (res.data.friends) {
        setFriends(res.data.friends.map((email: string) => ({ id: email })));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getPottentialNewFriends = async () => {
    try {
      const res = await api.get(`/getPotentialNewFriends/${getUserEmail()}`);
      setPotentialFriends(res.data.potentialFriends);
    } catch (err) {
      console.log(err);
    }
  };

  const getInvites = async () => {
      try {
          const res = await api.get(`/getFriendInvites/${getUserEmail()}`);
          if (res.data.invites) {
              setInvites(res.data.invites.map((email:string) => ({id: email, confirm: () => <Button/>, decline: 'decline'})));
          }
        } catch (err) {
          console.log(err);
      }
  };

  useEffect(() => {
    getFriends();
    getInvites();
    getPottentialNewFriends();
  }, [refresh]);

  const sendInvite = async (pottFriendEmail: string) => {
    setOpenSnackbar(true);
    try {
      const res = await api.put(`/inviteFriend/${email}/${pottFriendEmail}`);
      if (res.status == 200) {
        setSnackbarMessage(`Invite sent to ${pottFriendEmail}`);
      }
      setRefresh((prev) => !prev);
    } catch (err) {
      console.log(err);
      setIsError(true);
      setSnackbarMessage("Failed to send invite");
    }
  };

  return (
    <>
      <Logo />
      <GameMenu current="" />
      <div style={{ textAlign: "center" }}>
        <Typography style={{ marginTop: 40, fontSize: 50 }}>
          User Info
        </Typography>
      </div>
      <div style={{ position: "absolute", top: 250, left: 170 }}>
        <Typography style={{ fontSize: 30 }}>Email: {email}</Typography>
        <div style={{ position: "absolute", top: 100, width: 500 }}>
          <Typography style={{ fontSize: 30 }} component="span">
            Badges:
          </Typography>
          <Badge
            style={{
              borderStyle: "solid",
              borderColor: "black",
              borderWidth: 2,
              width: 60,
              height: 60,
              borderRadius: "50%",
              marginLeft: 25,
            }}
          />
          <Badge
            style={{
              borderStyle: "solid",
              borderColor: "black",
              borderWidth: 2,
              width: 60,
              height: 60,
              borderRadius: "50%",
              marginLeft: 45,
            }}
          />
          <Badge
            style={{
              borderStyle: "solid",
              borderColor: "black",
              borderWidth: 2,
              width: 60,
              height: 60,
              borderRadius: "50%",
              marginLeft: 45,
            }}
          />
        </div>
        <div>
          <Typography style={{ position: "absolute", top: 200, fontSize: 30 }}>
            Friends:
          </Typography>
          <DataGrid
            style={{ width: 400, height: 200, top: 215 }}
            columns={friendsCol}
            rows={friends}
            hideFooter
            sx={{
                ".MuiDataGrid-cell": {
                    outline: 'none !important',
                    fontSize: 20
                },
                ".MuiDataGrid-cell p": {
                  outline: 'none',
                  fontSize: 20
                }
              }}
          />
          <Button
            style={{ position: "absolute", top: 460, left: 260 }}
            onClick={() => setOpenDialog(true)}
          >
            Add a friend
          </Button>
        </div>
        <div>
          <Typography
            style={{
              position: "absolute",
              top: 0,
              left: 500,
              fontSize: 30,
              width: 250,
            }}
          >
            Friend requests:
          </Typography>
          <DataGrid
            style={{
              position: "absolute",
              width: 510,
              height: 500,
              top: 50,
              left: 500,
            }}
            columns={invite(setRefresh)}
            rows={invites}
            hideFooter
            sx={{
                ".MuiDataGrid-cell": {
                    outline: 'none !important',
                    fontSize: 20
                },
                ".MuiDataGrid-cell p": {
                  outline: 'none',
                  fontSize: 20
                }
              }}
          />
        </div>
        <div></div>
        <div>
          <Typography
            style={{
              position: "absolute",
              top: 0,
              left: 1100,
              fontSize: 30,
              width: 250,
            }}
          >
            Game invites:
          </Typography>
          <DataGrid
            style={{
              position: "absolute",
              width: 510,
              height: 500,
              top: 50,
              left: 1100,
            }}
            columns={invite(setRefresh)}
            hideFooter
            sx={{
                ".MuiDataGrid-cell": {
                    outline: 'none !important',
                    fontSize: 20
                },
                ".MuiDataGrid-cell p": {
                  outline: 'none',
                  fontSize: 20
                }
              }}
          />
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
              <DialogTitle>Potential Friends</DialogTitle>
              <DialogContent style={{ maxHeight: 400, overflowY: "auto" }}>
                <List>
                  {potentialFriends.map((email, index) => (
                    <ListItem key={index}>
                      <Button onClick={() => sendInvite(email)}>
                        {index}. {email}
                      </Button>
                    </ListItem>
                  ))}
                </List>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenDialog(false)} color="primary">
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </div>
    </>
  );
}
