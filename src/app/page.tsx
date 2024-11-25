"use client";
import Link from "next/link";
import { IconButton, Typography } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return <div>
    <IconButton onClick={() => router.push("/about")}>
      <InfoIcon />
    </IconButton>
    <Typography>WELCOME TO</Typography>
    <Typography>GAMES BET</Typography>
    <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris a massa elit. 
      Aenean a velit a neque pharetra consequat. Suspendisse efficitur nec nibh eget semper. 
      Duis et velit vel est porttitor consequat. Morbi purus dolor, hendrerit eu posuere quis, 
      mperdiet et nisl. Proin elementum tincidunt aliquam. Sed at massa pellentesque, molestie purus quis, 
      ullamcorper urna. Nulla facilisi. Praesent pulvinar, leo nec varius egestas, nisl diam volutpat velit, 
      in efficitur nisi massa ut mi. Mauris eu eros dapibus, facilisis erat vitae, mollis orci. Ut sit amet metus
       fermentum, euismod mauris et, efficitur lectus.
    </Typography>
    <Link style={{marginRight: 20}} href="/login">Login</Link>
    <Link href="/register">Register</Link>
  </div>;
}
