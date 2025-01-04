import api from "./axios";
import getUserEmail from "./getUserEmail";

const getHighScore = async (setHighScore: (arg: number) => void, game: string) => {
    try {
        const res = await api.get(`/getGamesData/${game}/${getUserEmail()}`);
        if(res.data) {
          setHighScore(res.data.highscore);
        }
      } catch(err: any) {
        console.log(err);
      }
}

export default getHighScore;