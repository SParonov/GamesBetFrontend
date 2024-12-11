"use client"
import { useState } from "react";
import Link from "next/link";
import { Button, TextField, Typography } from "@mui/material";
import axios, { HttpStatusCode } from "axios";
import { useRouter } from "next/navigation";

export default function SignUp() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [email, setEmail] = useState("");
    const [passwordErr, setPasswordErr] = useState({mess: "", isErr: false});
    const [emailErr, setEmailErr] = useState({mess: "", isErr: false});
    const router = useRouter();

    const onClickHandler = async () => {
        const api = axios.create(
            {baseURL: "http://localhost:8081"}
        )

        try {
            const obj =  JSON.stringify({
                username,
                password,
                passwordConfirm,
                email,
            })

            const res = await api.put("/signup", obj);

            if(res.status == HttpStatusCode.Ok) {
                router.push("/games_hub");
                localStorage.setItem('sessionData', JSON.stringify(res.data));
            }

        } catch(err: any) {
            if(err.response.data.includes("Different password added on confirm password")) {
                setPasswordErr({mess: "Different password added on confirm password", isErr: true});
            }
            if(err.response.data.includes("Invalid email syntax")) {
                setEmailErr({mess: "Invalid email syntax", isErr: true});
            }
            if(err.response.data.includes("Duplicate entry")) {
                setEmailErr({mess: "The email you provided is taken", isErr: true});
            }
            console.log(err)
        }
    }
    
    return <div style={{marginLeft: '40%', marginRight: '40%', textAlign: 'center', marginTop: 100}}>
        <Typography fontSize={30} style={{marginTop: 20}}>Create your new account</Typography>
        <div style={{marginLeft: 20, marginRight: 20}}>
            <TextField label="Username" size="small" fullWidth  style={{marginTop: 40}} 
            onChange={(e) => setUsername(e.target.value)}/>
            <TextField label="Password" type="password" size="small" fullWidth style={{marginTop: 25}} 
            onChange={(e) => {
                setPassword(e.target.value)
                setPasswordErr({mess: "", isErr: false})
            }}
            error={passwordErr.isErr}/>
            <TextField label="Confirm password" type="password" size="small" fullWidth style={{marginTop: 25}} 
            onChange={(e) => {
                setPasswordConfirm(e.target.value)
                setPasswordErr({mess: "", isErr: false})
            }}
            error={passwordErr.isErr}
            helperText = {passwordErr.isErr ? passwordErr.mess : " "}/> 
            <TextField label="Email address" size="small" fullWidth style={{marginTop: 5}}
            onChange={(e) => {
                setEmail(e.target.value)
                setEmailErr({mess: "", isErr: false}) 
            }}
            error = {emailErr.isErr}
            helperText = {emailErr.isErr ? emailErr.mess : " "}/> 
            <Button size="large" fullWidth variant="contained" style={{marginRight: 5, marginTop: 20}} onClick={onClickHandler}>Sign up</Button>
        </div>
        <div style={{marginTop: 10}}>
            <Typography fontSize={14} component="span" style={{marginRight: 5}}>Have an account?</Typography>
            <Link href="/login">Login</Link>
        </div>
    </div>
}