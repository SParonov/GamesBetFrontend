import api from "./axios";
import getUserEmail from "./getUserEmail";

const getFriends = async (setFriends: React.Dispatch<React.SetStateAction<any>>, obj: boolean) => {
    try {
      const res = await api.get(`/getFriends/${getUserEmail()}`);
      if (res.data.friends) {
        if (obj) {
            setFriends(res.data.friends.map((email: string) => ({ id: email })));
        } else {
            setFriends(res.data.friends);
        }
      }
    } catch (err) {
      console.log(err);
    }
};

export default getFriends;
