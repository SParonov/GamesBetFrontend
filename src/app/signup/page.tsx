"use client"
import { ChangeEvent, useState } from "react";
import Link from "next/link";
import { Button, TextField, Typography } from "@mui/material";
import axios, { AxiosError, HttpStatusCode } from "axios";
import { useRouter } from "next/navigation";

export default function SignUp() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [email, setEmail] = useState("");
    const [passwordErr, setPasswordErr] = useState({mess: "", isErr: false});
    const [emailErr, setEmailErr] = useState({mess: "", isErr: false});
    const router = useRouter();

    const onChangePassword = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=> {
        setPassword(e.target.value)
        setPasswordErr({mess: "", isErr: false})
    }

    const onChangeEmail = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEmail(e.target.value)
        setEmailErr({mess: "", isErr: false})
    }

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
            }

        } catch(err: any) {
            console.log(err.response.data)
            if(err.response.data.includes("mssql")) {
                setEmailErr({mess: "The email you provided is taken", isErr: true});
            }

            if(err.response.data.includes("Different password added on confirm password")) {
                setPasswordErr({mess: err.data, isErr: true});
            }
        }
    }
    
    return <div style={{marginLeft: '40%', marginRight: '40%', textAlign: 'center', marginTop: 100}}>
        <Typography fontSize={30} style={{marginTop: 20}}>Create your new account</Typography>
        <div style={{marginLeft: 20, marginRight: 20}}>
            <TextField label="Username" size="small" fullWidth  style={{marginTop: 40}} 
            onChange={(e) => setUsername(e.target.value)}/>
            <TextField label="Password" size="small" fullWidth style={{marginTop: 20}} 
            onChange={onChangePassword}
            error={passwordErr.isErr}/>
            <TextField label="Confirm password" size="small" fullWidth style={{marginTop: 20}} 
            onChange={onChangePassword}
            error={passwordErr.isErr}
            helperText = {passwordErr.isErr && passwordErr.mess}/> 
            <TextField label="Email address" size="small" fullWidth style={{marginTop: 20}} 
            onChange={onChangeEmail}
            error = {emailErr.isErr}
            helperText = {emailErr.isErr && emailErr.mess}/> 
            <Button size="large" fullWidth variant="contained" style={{marginTop: 30}} onClick={onClickHandler}>Sign up</Button>
        </div>
        <div style={{marginTop: 10}}>
            <Typography fontSize={14} component="span" style={{marginRight: 5}}>Have an account?</Typography>
            <Link href="/login">Login</Link>
        </div>
    </div>
}