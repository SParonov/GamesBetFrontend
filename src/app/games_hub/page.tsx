"use client"
import GameMenu from "../../components/GameMenu";
import Logo from "../../components/Logo";
import useCheckSession from "@/utils/useCheckSession";
import { usePathname, useRouter } from "next/navigation";
import GameButton from "@/components/GameButton";
import { useState, useEffect } from "react";
import hasGame from "@/utils/hasGame";
import getUserEmail from "@/utils/getUserEmail";
import getCoins from "@/utils/getCoins";

export type sessionData = {
    CreatedAt: string,
    ExpiresAt: string,
    ID: string,
    UserEmail: string
}

export default function GamesHub() {
    useCheckSession();

    const [loading, setLoading] = useState(true);
    const [game2, setGame2] = useState(true);
    const [game3, setGame3] = useState(true);
    const [game4, setGame4] = useState(true);
    const [game5, setGame5] = useState(true);
    useEffect(()=>{
        const temp = async () => {
            try{
                const res2=Boolean(await hasGame("Game2", getUserEmail()));
                setGame2(res2);
                const res3=Boolean(await hasGame("Game3", getUserEmail()));
                setGame3(res3);
                const res4=Boolean(await hasGame("Game4", getUserEmail()));
                setGame4(res4);
                const res5=Boolean(await hasGame("Game5", getUserEmail()));
                setGame5(res5);
            }
            finally{
                setLoading(false);
            }
        };
        temp();
        getCoins();
    },[])
    if(loading){
        return (
            <div>
              <h1>Loading...</h1>
            </div>
          );
    }

    return <>
        <Logo />
        <GameMenu current = "games"/>
        <div style={{position: 'fixed', display: 'flex', justifyContent:'center', top: "20%", left: 0, right: 0}}>
            <GameButton marginLeft={0} game="/snake" imgUrl='/img/snake_game.png' unlocked={true}/>
            <GameButton marginLeft={10} game="/slot" imgUrl='/img/slot_machine_game.avif' unlocked={game2}/>
            <GameButton marginLeft={10} game="/flappy_bird" imgUrl='/img/flappy_bird_game.png' unlocked={game3}/>
            <GameButton marginLeft={10} game="/number_guessing_game" imgUrl='/img/number_guessing_game.webp' unlocked={game4}/>
        </div>
        <div style={{position: 'fixed', display: 'flex', justifyContent:'center', top: "50%", left: 0, right: 0}}>
            <GameButton marginLeft={0} game="/online_gateway?game=tic_tac_toe_online" imgUrl='/img/tic_tac_toe.jpg' unlocked={game5}/>
        </div>
    </>
}