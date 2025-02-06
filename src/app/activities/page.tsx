"use client"
import GameMenu from "@/components/GameMenu";
import Logo from "@/components/Logo";
import useCheckSession from "@/utils/useCheckSession";
import { useEffect, useState } from "react";
import getActivities from "@/utils/getActivities";
import getUserEmail from "@/utils/getUserEmail";


export default function Activities() {
    useCheckSession();

    const [activities, setActivities] = useState<Activity[]>();

    useEffect(()=>{ 
        getActivities(getUserEmail(), setActivities);
        console.log(activities);
    },[]);

    useEffect(() => {
    }, [activities]); 

    return <>
        <Logo />
        <GameMenu current = "activities"/>
        {activities?.map((activity, index) => (
                <div key={index}>
                    <h3>Game: {activity.Game=="Game1"?"snake game":(activity.Game=="Game3"?"flappy bird": "number guessing game")}</h3>
                    <p>Required Coins: {activity.RequiredCoins}</p>
                    <p>Reward: {activity.Reward}</p>
                    <br></br>
                </div>
            ))}
    </>
}