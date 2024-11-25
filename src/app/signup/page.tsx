"use client"
import { useState } from "react";
import Link from "next/link";
import { Button, TextField, Typography } from "@mui/material";
import axios from "axios";

export default function SignUp() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [email, setEmail] = useState("");

    const onClickHandler = async () => {
        console.log(username, password, passwordConfirm, email);
        const api = axios.create(
            {baseURL: "http://localhost:8081"}
        )

        try {
            const res = await api.put("/signup", JSON.stringify({
                username,
                password,
                passwordConfirm,
                email,
            }));
        } catch(e) {
            console.log(e);
        }
    }
    
    return <div style={{marginLeft: '40%', marginRight: '40%', textAlign: 'center', marginTop: 100}}>
        <Typography fontSize={30} style={{marginTop: 20}}>Create your new account</Typography>
        <div style={{marginLeft: 20, marginRight: 20}}>
            <TextField label="Username" size="small" fullWidth  style={{marginTop: 40}} onChange={(e) => setUsername(e.target.value)}/>
            <TextField label="Password" size="small" fullWidth style={{marginTop: 20}} onChange={(e)=> setPassword(e.target.value)}/>
            <TextField label="Confirm password" size="small" fullWidth style={{marginTop: 20}} onChange={(e) => setPasswordConfirm(e.target.value)}/> 
            <TextField label="Email address" size="small" fullWidth style={{marginTop: 20}} onChange={(e) => setEmail(e.target.value)}/> 
            <Button size="large" fullWidth variant="contained" style={{marginTop: 30}} onClick={onClickHandler}>Sign up</Button>
        </div>
        <div style={{marginTop: 10}}>
            <Typography fontSize={14} component="span" style={{marginRight: 5}}>Have an account?</Typography>
            <Link href="/login">Login</Link>
        </div>
    </div>
}