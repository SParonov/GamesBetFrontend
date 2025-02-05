"use client"
import GameMenu from "@/components/GameMenu"
import Logo from "@/components/Logo"
import useCheckSession from "@/utils/useCheckSession";
import buyGame from "@/utils/buyGame";
import getUserEmail from "@/utils/getUserEmail";
import { useEffect } from "react";
import { Button, Typography, Box } from "@mui/material";
import { useState } from "react";
import hasGame from "@/utils/hasGame";
import buyBadge from "@/utils/buyBadge";
import hasBadge from "@/utils/hasBadge";

export default function Shop() {

    useCheckSession();
    const [loading, setLoading] = useState(true);
    const [game2, setGame2] = useState(true);
    const [game3, setGame3] = useState(true);
    const [game4, setGame4] = useState(true);
    const [game5, setGame5] = useState(true);
    const [game6, setGame6] = useState(true);
    const [badge1, setBadge1] = useState(true);
    const [badge2, setBadge2] = useState(true);
    const [badge3, setBadge3] = useState(true);
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
                const res6=Boolean(await hasGame("Game6", getUserEmail()));
                setGame6(res6);
                const res7=Boolean(await hasBadge("Badge1", getUserEmail()));
                setBadge1(res7);
                const res8=Boolean(await hasBadge("Badge2", getUserEmail()));
                setBadge2(res8);
                const res9=Boolean(await hasBadge("Badge3", getUserEmail()));
                setBadge3(res9);
                
            }
            finally{
                setLoading(false);
            }
        };
        temp();
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
        <GameMenu current = "shop"/>
        <div>
        <Button 
        sx={{width: 175,
            height: 175,
            top: 200,
            left : 100,
            //marginLeft: 5, 
            backgroundColor: 'green',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: "url(/img/slot_machine_game.avif)"}}
        variant="contained"
        onClick={()=>{buyGame("Game2", getUserEmail(), 100)}}
        disabled={game2} />

        100 Coins
        <Button 
        sx={{width: 175,
            height: 175,
            top: 200,
            left : 100,
            marginLeft: 5, 
            backgroundColor: 'green',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: "url(/img/flappy_bird_game.png)"}}
        variant="contained"
        onClick={()=>{buyGame("Game3", getUserEmail(), 200)}}
        disabled={game3} />
        200 Coins
        <Button 
        sx={{width: 175,
            height: 175,
            top: 200,
            left : 100,
            marginLeft: 5, 
            backgroundColor: 'green',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: "url(/img/number_guessing_game.webp)"}}
        variant="contained"
        onClick={()=>{buyGame("Game4", getUserEmail(), 300)}}
        disabled={game4} />
        300 Coins
        <Button 
        sx={{width: 175,
            height: 175,
            top: 200,
            left : 100,
            marginLeft: 5, 
            backgroundColor: 'green',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: "url(/img/tic_tac_toe.jpg)"}}
        variant="contained"
        onClick={()=>{buyGame("Game5", getUserEmail(), 400)}}
        disabled={game5} />
        400 Coins
        <Button 
        sx={{width: 175,
            height: 175,
            top: 200,
            left : 100,
            marginLeft: 5, 
            backgroundColor: 'green',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: "url(/img/number_guessing_game.webp)"}}
        variant="contained"
        onClick={()=>{buyGame("Game6", getUserEmail(), 500)}}
        disabled={game6} />
        500 Coins
        </div>
        <div>
        <Button 
        sx={{width: 175,
            height: 175,
            top: 50,
            left : 100,
            marginLeft: 35, 
            marginTop:40,
            backgroundColor: 'green',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: "url(/img/Badge1.png)"}}
        variant="contained"
        onClick={()=>{buyBadge("Badge1", getUserEmail(), 40)}}
        disabled={badge1} />
        Coins 40
        <Button 
        sx={{width: 175,
            height: 175,
            top: 50,
            left : 100,
            marginLeft: 5, 
            marginTop:40, 
            backgroundColor: 'green',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: "url(/img/Badge2.png)"}}
        variant="contained"
        onClick={()=>{buyBadge("Badge2", getUserEmail(), 400)}}
        disabled={badge2} />
        400 Coins
        <Button 
        sx={{width: 175,
            height: 175,
            top: 50,
            left : 100,
            marginLeft: 5, 
            marginTop:40,
            backgroundColor: 'green',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: "url(/img/Badge3.png)"}}
        variant="contained"
        onClick={()=>{buyBadge("Badge3", getUserEmail(), 400)}}
        disabled={badge3} />
        400 Coins
        </div>
    </>
}