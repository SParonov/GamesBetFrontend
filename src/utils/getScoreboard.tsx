import api from "./axios"

const getScoreboard = async (setFirstCol: React.Dispatch<React.SetStateAction<any>>, setSecondCol: React.Dispatch<React.SetStateAction<any>>) => {
    // try {
      const res = await api.get("/handleScoreboard");
      console.log(res.data)
      setFirstCol(res.data.scoreboard.map((Row:{Email:string, Coins:number})=>Row.Email))
      setSecondCol(res.data.scoreboard.map((Row:{Email:string, Coins:number})=>Row.Coins))
    // } catch (err) {
    //   console.log(err);
    // }
};

export default getScoreboard;