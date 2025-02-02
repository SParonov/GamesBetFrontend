import api from "./axios";
import getUserEmail from "./getUserEmail";

const getCoins = async () => {
  try {
    const res = await api.get(`/getCoins/${getUserEmail()}`);
    return res.data.coins;
  } catch (err: any) {
    console.log(err);
  }
};

export default getCoins;
