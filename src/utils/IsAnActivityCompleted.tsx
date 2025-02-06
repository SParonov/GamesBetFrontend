import { act } from "react";
import api from "./axios";
import getActivities from "./getActivities";
import removeActivity from "./removeActivity";

export default async function isAnActivityCompleted(Email:string|undefined, Game:string, Score:number){
    const res=await api.post("/getActivities", {Email:Email});
    res.data.map((activity:{RequiredCoins:number, Game:string, Reward:number})=>{
        if(Game==activity.Game&&Score>=activity.RequiredCoins){
            removeActivity(Email, activity.RequiredCoins, activity.Game, activity.Reward);
        }
    })
}