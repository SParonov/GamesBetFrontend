"use client"
import GameMenu from "@/components/GameMenu"
import Logo from "@/components/Logo"
import useCheckSession from "@/utils/useCheckSession";
import buyGame from "@/utils/buyGame";
import getUserEmail from "@/utils/getUserEmail";
import { useEffect } from "react";
import { Button, Typography, Box } from "@mui/material";

export default function Shop() {
    useCheckSession();
    return <>
        <Logo />
        <GameMenu current = "shop"/>
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
        onClick={()=>{buyGame("Game2", getUserEmail(), 100)}} />
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
        onClick={()=>{buyGame("Game3", getUserEmail(), 200)}} />
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
        onClick={()=>{buyGame("Game4", getUserEmail(), 300)}} />
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
        onClick={()=>{buyGame("Game5", getUserEmail(), 400)}} />
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
        onClick={()=>{buyGame("Game6", getUserEmail(), 500)}} />
        500 Coins
    </>
}