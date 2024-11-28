"use client"
import { ChangeEvent, useState } from "react";
import Link from "next/link";
import { Button, TextField, Typography } from "@mui/material";
import axios, { AxiosError, HttpStatusCode } from "axios";
import { useRouter } from "next/navigation";

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordErr, setPasswordErr] = useState({mess: "", isErr: false});
    const [emailErr, setEmailErr] = useState({mess: "", isErr: false});
    const router = useRouter();

    const onClickHandler = async () => {
        const api = axios.create(
            {baseURL: "http://localhost:8081"}
        )

        try {
            const obj =  JSON.stringify({
                password,
                email,
            })

            const res = await api.put("/login", obj);

            if(res.status == HttpStatusCode.Ok) {
                router.push("/games_hub");
            }

        } catch(err: any) {
            if(err.response.data.includes("Invalid email and password combination")){
                setEmailErr({mess:"Invalid email and password combination", isErr: true})
            }
            /*if(err.response.data.includes("mssql")) {
                setEmailErr({mess: "The email you provided is taken", isErr: true});
            }

            if(err.response.data.includes("Different password added on confirm password")) {
                setPasswordErr({mess: "Different password added on confirm password", isErr: true});
            }
            if(err.response.data.includes("Invalid email syntax")) {
                setEmailErr({mess: "Invalid email syntax", isErr: true});
            }*/
        }
    }
    
    return <div style={{marginLeft: '40%', marginRight: '40%', textAlign: 'center', marginTop: 100}}>
        <Typography fontSize={30} style={{marginTop: 20}}>Log in</Typography>
        <div style={{marginLeft: 20, marginRight: 20}}>
            <TextField label="Email address" size="small" fullWidth
            onChange={(e) => {
                setEmail(e.target.value)
                setEmailErr({mess: "", isErr: false}) 
            }}
            error = {emailErr.isErr}
            helperText = {emailErr.isErr ? emailErr.mess : " "}/> 
            <TextField label="Password" type="password" size="small" fullWidth style={{marginTop: 20}} 
            onChange={(e) => {
                setPassword(e.target.value)
                setPasswordErr({mess: "", isErr: false})
            }}
            error={passwordErr.isErr}
            helperText = {passwordErr.isErr ? passwordErr.mess : " "}/> 
            <Button size="large" fullWidth variant="contained" style={{marginRight: 5, marginTop: 20}} onClick={onClickHandler}>Log in</Button>
        </div>
        <div style={{marginTop: 10}}>
            <Typography fontSize={14} component="span" style={{marginRight: 5}}>Don't have an account?</Typography>
            <Link href="/signup">Signup</Link>
        </div>
    </div>
}