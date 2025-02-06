import { Dispatch, SetStateAction } from "react";
import api from "./axios"


export default async function getActivities(Email:string|undefined, setActivities:Dispatch<SetStateAction<Activity[] | undefined>>){
    const res = await api.post("/getActivities", {Email:Email});
    //console.log(res.data);

    let newActivities: Activity[]=[];
    res.data.map((d:{RequiredCoins:number, Game:string, Reward:number})=>{
        newActivities.push(d);
    });
    setActivities(newActivities);
}