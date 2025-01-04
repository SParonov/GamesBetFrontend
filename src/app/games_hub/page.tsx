"use client"
import React, { useRef } from "react";
import GameMenu from "../../components/GameMenu";
import Logo from "../../components/Logo";
import useCheckSession from "@/utils/useCheckSession";
import { Button } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import GameButton from "@/components/GameButton";

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
            <GameButton marginLeft={0} game="/snake" imgUrl='/img/snake_game.png' unlocked={true}/>
            <GameButton marginLeft={10} game="/slot" imgUrl='/img/slot_machine_game.avif' unlocked={true}/>
            <GameButton marginLeft={10} game="/flappyBird" imgUrl='/img/flappy_bird_game.png' unlocked={true}/>
            <GameButton marginLeft={10} game="/slot" imgUrl='/img/slot_machine_game.avif' unlocked={false}/>
        </div>
        <div style={{position: 'absolute', left: 490, top: "50%"}}>
            <Button sx={{width: 175, height: 175, backgroundColor: '#007FFF', '&:hover': {backgroundColor: '#0066CC'}, opacity: 0.2}} disabled={true}/>
            <Button sx={{width: 175, height: 175, backgroundColor: '#007FFF', '&:hover': {backgroundColor: '#0066CC'}, opacity: 0.2, marginLeft: 10}} disabled={true}/>
            <Button sx={{width: 175, height: 175, backgroundColor: '#007FFF', '&:hover': {backgroundColor: '#0066CC'}, opacity: 0.2, marginLeft: 10}} disabled={true}/>
            <Button sx={{width: 175, height: 175, backgroundColor: '#007FFF', '&:hover': {backgroundColor: '#0066CC'}, opacity: 0.2, marginLeft: 10}} disabled={true}/>
        </div>
    </>
}