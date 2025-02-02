import api from "./axios"

const hasGame = async (GameName:string, UserEmail:string|undefined) :Promise<boolean>=> {
    const res = await api.post("/hasGame", {GameName:GameName, UserEmail:UserEmail});
    //console.log(res.data);
    return res.data;
}

export default hasGame
