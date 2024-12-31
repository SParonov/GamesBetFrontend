"use client"
import GameMenu from "@/components/GameMenu";
import Logo from "@/components/Logo";
import useCheckSession from "@/utils/useCheckSession";

export default function Scoreboard() {
    useCheckSession();
    return <>
        <Logo />
        <GameMenu current = "scoreboard"/>
    </>
}