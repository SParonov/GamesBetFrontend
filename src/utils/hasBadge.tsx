import api from "./axios"

const hasBadge = async (BadgeName:string, UserEmail:string|undefined) :Promise<boolean>=> {
    const res = await api.post("/hasBadge", {BadgeName:BadgeName, UserEmail:UserEmail});
    //console.log(res.data);
    return res.data;
}

export default hasBadge