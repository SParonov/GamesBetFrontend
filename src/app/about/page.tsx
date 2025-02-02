"use client"
import Logo from "@/components/Logo";
import useCheckSession from "@/utils/useCheckSession";

export default function About() {
    useCheckSession();
    return <>
        <Logo />
    </>
}