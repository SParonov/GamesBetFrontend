"use client";
import { useEffect, useState } from "react";
import Logo from "@/components/Logo";
import useCheckSession from "@/utils/useCheckSession";
import getUserEmail from "@/utils/getUserEmail";
import { Badge, Button, Typography} from "@mui/material";
import GameMenu from "@/components/GameMenu";
import { DataGrid } from "@mui/x-data-grid";
import { friendsCol, invite } from "@/utils/datagrid";
import api from "@/utils/axios";
import UserSelector from "@/components/UserSelector";
import getFriends from "@/utils/getFriends";
import hasBadge from "@/utils/hasBadge";

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
  const [badge1, setBadge1] = useState(false);
  const [badge2, setBadge2] = useState(false);
  const [badge3, setBadge3] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const x = async () => {
      try{
      const res1=Boolean(await hasBadge("Badge1", getUserEmail()));
      setBadge1(res1);
      const res2=Boolean(await hasBadge("Badge2", getUserEmail()));
      setBadge2(res2);
      const res3=Boolean(await hasBadge("Badge3", getUserEmail()));
      setBadge3(res3);
      }
      finally{
        setLoading(false);
      }
    }
    const email = getUserEmail();
    setEmail(email);
    x();
  }, []);

  // if(loading){
  //   return (
  //       <div>
  //         <h1>Loading...</h1>
  //       </div>
  //     );
  // }

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
              setInvites(res.data.invites.map((email:string) => ({id: email})));
          }
        } catch (err) {
          console.log(err);
      }
  };

  useEffect(() => {
    getFriends(setFriends, true);
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

  return <>
      <Logo />
      <GameMenu current="" />
      <div style={{ textAlign: "center" }}>
        <Typography style={{ marginTop: 40, fontSize: 50 }}>
          User Info
        </Typography>
      </div>
      <div style={{ position: "absolute", top: 250, marginLeft: '25%' }}>
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
              backgroundSize: 'cover', 
              backgroundPosition: 'center',
              ...(badge1 && {backgroundImage : "url(/img/Badge1.png)"})
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
              backgroundSize: 'cover', 
              backgroundPosition: 'center',
              ...(badge2 && {backgroundImage : "url(/img/Badge2.png)"})
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
              backgroundSize: 'cover', 
              backgroundPosition: 'center',
              ...(badge3 && {backgroundImage : "url(/img/Badge3.png)"})
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
                outline: "none !important",
                fontSize: 20,
              },
              ".MuiDataGrid-cell p": {
                outline: "none",
                fontSize: 20,
              },
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
                outline: "none !important",
                fontSize: 20,
              },
              ".MuiDataGrid-cell p": {
                outline: "none",
                fontSize: 20,
              },
            }}
          />
        </div>
        <UserSelector
          openDialog={openDialog}
          openSnackbar={openSnackbar}
          setOpenDialog={setOpenDialog}
          setOpenSnackbar={setOpenSnackbar}
          handler={sendInvite}
          isError={isError}
          snackbarMessage={snackbarMessage}
          friends={potentialFriends}
          headerMessage={"Potential Friends"}
        />
      </div>
    </>
}
