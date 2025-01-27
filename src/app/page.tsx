"use client";
import { Button, IconButton, Typography } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import { useRouter } from "next/navigation";
import Logo from "../components/Logo";

export default function Home() {
  const router = useRouter();
  return <div>
    <Logo />
    <IconButton style={{position: 'absolute', top: 10, right: 20}} onClick={() => router.push("/about")}>
      <InfoIcon fontSize="large"/>
    </IconButton>
    <div style = {{textAlign: 'center', marginLeft: '40%', marginRight: '40%', marginTop: 50}}>
      <Typography style={{fontSize: 50}}>WELCOME TO</Typography>
      <Typography style={{fontSize: 60}}>GAMES BET</Typography>
        <Typography style={{marginTop: 20}}>{"The Game Hub Project \n" +
          "is a web-based platform built\n" +
          "using Golang, JavaScript, and\n" +
          "SQL that allows users to play simple\n" + 
          "games, earn coins, track their\n" + 
          "scores, and view a leaderboard.\n" + 
          "The platform features user\n" +
          "authentication, enabling players\n" +
          "to sign up, log in, and securely\n" +
          "store their game progress and scores.\n" + 
          "The backend, developed in Golang,\n" +
          "handles API requests, game logic, and\n" +
          "database operations, while the\n" +
          "frontend, built using JavaScript (Next js),\n" + 
          "provides an interactive and \n" + 
          "responsive user interface."}
        </Typography>
    </div>
    <div style={{textAlign: 'center', marginLeft: '40%', marginRight: '40%', marginTop: 30}}>
      <Button style={{marginRight: 20}} variant="contained" href="/login">Login</Button>
      <Button style={{}} href="/signup" variant="contained">Sign up</Button>
    </div>
  </div>;
}
