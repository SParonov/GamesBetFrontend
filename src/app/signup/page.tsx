import { Button, TextField, Typography } from "@mui/material";
import Link from "next/link";

export default function SignUp() {
    return <div style={{marginLeft: '40%', marginRight: '40%', textAlign: 'center', marginTop: 100}}>
        <Typography fontSize={30} style={{marginTop: 20}}>Create your new account</Typography>
        <div style={{marginLeft: 20, marginRight: 20}}>
            <TextField required label="Username" size="small" fullWidth  style={{marginTop: 40}}/>
            <TextField required label="Password" size="small" fullWidth style={{marginTop: 20}}/>
            <TextField required label="Default password" size="small" fullWidth style={{marginTop: 20}}/> 
            <TextField required label="Email address" size="small" fullWidth style={{marginTop: 20}}/> 
            <Button size="large" fullWidth variant="contained" style={{marginTop: 30}}>Sign up</Button>
        </div>
        <div style={{marginTop: 10}}>
            <Typography fontSize={14} component="span" style={{marginRight: 5}}>Have an account?</Typography>
            <Link href="/login">Login</Link>
        </div>
    </div>
}