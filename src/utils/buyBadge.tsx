import api from "./axios";

export default async function buyBadge(BadgeName:string, UserEmail:string|undefined, Price:number){
    try{
        const res=await api.post("/buyBadge", {BadgeName:BadgeName, UserEmail:UserEmail, Price:Price});
    }
    catch(err){
        console.log(err);
    }
}