"use client";
import UserSelector from "@/components/UserSelector"; 
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Snackbar, Alert, InputLabel, Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import getFriends from "@/utils/getFriends";
import useCheckSession from "@/utils/useCheckSession";
import BackButton from "@/components/BackButton";
import api from "@/utils/axios";
import getUserEmail from "@/utils/getUserEmail";

export default function OnlineGateway() {
    const searchParams = useSearchParams();
    const game = searchParams.get('game');

    const [openOnlineDialog, setOpenOnlineDialog] = useState(false);
    const [openUserSelectorDialog, setOpenUserSelectorDialog] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [friends, setFriends] = useState<string[]>([]);
    const [selectedFriend, setSelectedFriend] = useState<string>('');
    const [selectedDate, setSelectedDate] = useState<string>('');

    useCheckSession();

    useEffect(() => {
        getFriends(setFriends, false);
    }, []);

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(event.target.value);
    };

    const handleSubmit = async () => {
        if (!selectedFriend || !selectedDate) {
            setSnackbarMessage("Please select a friend and a date.");
            setIsError(true);
            setOpenSnackbar(true);
            return;
        }

        const currentDate = new Date();
        const selectedDateObj = new Date(selectedDate);

        if (selectedDateObj < currentDate) {
            setSnackbarMessage("The selected date must be in the future.");
            setIsError(true);
            setOpenSnackbar(true);
            return;
        }
        const tomorrow = new Date(currentDate);
        tomorrow.setDate(currentDate.getDate() + 1);

        if (selectedDateObj > tomorrow) {
            setSnackbarMessage("The selected date must be within the next 24 hours.");
            setIsError(true);
            setOpenSnackbar(true);
            return;
        }

        console.log(`Friend: ${selectedFriend}, Date: ${selectedDate}`);

        try {
            api.post("/addToScheduler", {player1: getUserEmail(), player2: selectedFriend, startDate: selectedDate, game: game})
        } catch (err) {
            console.log(err);
        }

        setOpenOnlineDialog(false);
        setSnackbarMessage("Invitation sent successfully.");
        setIsError(false);
        setOpenSnackbar(true);
    };


    return (
        <div style={{background: "linear-gradient(45deg,rgb(15, 9, 70), rgb(172, 98, 56))", height: '100vh', display: 'flex', justifyContent: 'center'}}>
            <BackButton />
            <div style={{ width: '30%', borderStyle: 'solid', borderWidth: 2, marginTop: 300, textAlign: 'center', position: 'absolute'}}>
                <Typography fontSize={40} style={{marginBottom: 30, marginTop: 20, color: 'white'}}>Choose how you want to play</Typography>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "20px"}}>
                    <Button variant="contained" color="primary" style={{marginLeft: 70}}>Play offline</Button>
                    <Button variant="contained" color="secondary" style={{marginRight: 70}} onClick={() => setOpenOnlineDialog(true)}>
                        Play online
                    </Button>

                    <Dialog open={openOnlineDialog} onClose={() => setOpenOnlineDialog(false)} maxWidth="sm" fullWidth>
                        <DialogTitle>Play Online</DialogTitle>
                        <DialogContent>
                            <UserSelector
                                openDialog={openUserSelectorDialog}
                                openSnackbar={openSnackbar}
                                setOpenDialog={setOpenUserSelectorDialog}
                                setOpenSnackbar={setOpenSnackbar}
                                handler={(friend: string) => {
                                    setSelectedFriend(friend)
                                    setOpenUserSelectorDialog(false);
                                }}
                                isError={false}
                                snackbarMessage={""}
                                friends={friends}
                                headerMessage={'Select a Friend'}
                            />

                            <TextField
                                label="Select Date"
                                type="datetime-local"
                                value={selectedDate}
                                onChange={handleDateChange}
                                fullWidth
                                margin="normal"
                                slotProps={{inputLabel: {shrink: true}}}
                            />
                            <Button fullWidth variant="outlined" onClick={() => setOpenUserSelectorDialog(true)}>Select a friend</Button>
                            <Typography style={{position: 'absolute', marginTop: 30}}>Selected friend: {selectedFriend}</Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpenOnlineDialog(false)} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={handleSubmit} color="secondary">
                                Submit
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
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
        </div>
    );
}
