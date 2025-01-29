import api from "./axios";
import getUserEmail from "./getUserEmail";

const updateGameData = async (game: string, currScore: number, highScore: number) => {
    try {
      await api.put(`/updateGamesData/${game}/${getUserEmail()}`, {coins: currScore, highscore: highScore});
  } catch(err: any) {
      console.log(err);
  }
}

export default updateGameData;