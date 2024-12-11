"use client"
import { Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type sessionData = {
    CreatedAt: string,
    ExpiresAt: string,
    ID: string,
    UserEmail: string
}

export default function GamesHub() {
    const router = useRouter();
    useEffect(() => {
        const sessionData = localStorage.getItem("sessionData");
        if (!sessionData) {
            alert("Не съществува сесия, моля първо се логнете (или регистрирайте)");
            router.push("/login");
        } else {
            const parsedSessionData: sessionData = JSON.parse(sessionData!);
            if (Date.parse(parsedSessionData.ExpiresAt) <= Date.now()) {
                alert("Сесията Ви е изтекла, за да продължите, моля логнете се отново");
                router.push("/login");
            }
        }
    }, [])
    return <Typography>This is the GamesHub page!</Typography>
}