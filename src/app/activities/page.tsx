"use client"
import GameMenu from "@/components/GameMenu";
import Logo from "@/components/Logo";
import useCheckSession from "@/utils/useCheckSession";

export default function Activities() {
    useCheckSession();
    return <>
        <Logo />
        <GameMenu current = "activities"/>
    </>
}