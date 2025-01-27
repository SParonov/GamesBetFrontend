import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
    const router = useRouter();
    
    return <Button style={{position: 'absolute', top: 20, right: 20}} variant="contained" onClick = {() => {
        router.push("/login");
        localStorage.removeItem("sessionData")}}>Logout</Button>
}