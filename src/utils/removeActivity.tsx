import api from "./axios"
export default async function removeActivity(Email:string|undefined, RequiredCoins:number, Game:string, Reward:number){
    const res = await api.post("/removeActivity", {Email:Email, RequiredCoins:RequiredCoins, Game:Game, Reward:Reward});

}