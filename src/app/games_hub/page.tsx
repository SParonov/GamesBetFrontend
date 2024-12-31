"use client"
import React, { useRef } from "react";
import GameMenu from "../../components/GameMenu";
import Logo from "../../components/Logo";
import useCheckSession from "@/utils/useCheckSession";
import { Box, Button } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";


export type sessionData = {
    CreatedAt: string,
    ExpiresAt: string,
    ID: string,
    UserEmail: string
}

export default function GamesHub() {
    const router = useRouter();
    const pathname = usePathname();
    useCheckSession();
    return <>
        <Logo />
        <GameMenu current = "games"/>
        <div style={{position: 'absolute', left: 490, top: "20%"}}>
            <Button sx={{width: 175, height: 175, backgroundColor: '#007FFF', '&:hover': {backgroundColor: '#0066CC'}}} onClick={() => router.push(pathname + "/snake")}/>
            <Button sx={{width: 175, height: 175, backgroundColor: '#007FFF', '&:hover': {backgroundColor: '#0066CC'}, opacity: 0.2, marginLeft: 10}} disabled={true}/>
            <Button sx={{width: 175, height: 175, backgroundColor: '#007FFF', '&:hover': {backgroundColor: '#0066CC'}, opacity: 0.2, marginLeft: 10}} disabled={true}/>
            <Button sx={{width: 175, height: 175, backgroundColor: '#007FFF', '&:hover': {backgroundColor: '#0066CC'}, opacity: 0.2, marginLeft: 10}} disabled={true}/>
        </div>
        <div style={{position: 'absolute', left: 490, top: "50%"}}>
            <Button sx={{width: 175, height: 175, backgroundColor: '#007FFF', '&:hover': {backgroundColor: '#0066CC'}, opacity: 0.2}} disabled={true}/>
            <Button sx={{width: 175, height: 175, backgroundColor: '#007FFF', '&:hover': {backgroundColor: '#0066CC'}, opacity: 0.2, marginLeft: 10}} disabled={true}/>
            <Button sx={{width: 175, height: 175, backgroundColor: '#007FFF', '&:hover': {backgroundColor: '#0066CC'}, opacity: 0.2, marginLeft: 10}} disabled={true}/>
            <Button sx={{width: 175, height: 175, backgroundColor: '#007FFF', '&:hover': {backgroundColor: '#0066CC'}, opacity: 0.2, marginLeft: 10}} disabled={true}/>
        </div>
    </>
}