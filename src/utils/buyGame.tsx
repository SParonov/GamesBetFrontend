import api from "./axios";

const buyGame = async(GameName:string, Email:string|undefined, Price:number) => {
    try{
        await api.post("/buyGame", {GameName:GameName, Email:Email, Price});
    }
    catch(err:any){
        console.log(err);
    }
}

export default buyGame