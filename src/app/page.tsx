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
      <Typography style={{marginTop: 20}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris a massa elit. 
        Aenean a velit a neque pharetra consequat. Suspendisse efficitur nec nibh eget semper. 
        Duis et velit vel est porttitor consequat. Morbi purus dolor, hendrerit eu posuere quis, 
        mperdiet et nisl. Proin elementum tincidunt aliquam. Sed at massa pellentesque, molestie purus quis, 
        ullamcorper urna. Nulla facilisi. Praesent pulvinar, leo nec varius egestas, nisl diam volutpat velit, 
        in efficitur nisi massa ut mi. Mauris eu eros dapibus, facilisis erat vitae, mollis orci. Ut sit amet metus
        fermentum, euismod mauris et, efficitur lectus.
      </Typography>
    </div>
    <div style={{textAlign: 'center', marginLeft: '40%', marginRight: '40%', marginTop: 30}}>
      <Button style={{marginRight: 20}} variant="contained" href="/login">Login</Button>
      <Button style={{}} href="/signup" variant="contained">Sign up</Button>
    </div>
  </div>;
}
