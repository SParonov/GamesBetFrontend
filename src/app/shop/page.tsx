"use client"
import GameMenu from "@/components/GameMenu"
import Logo from "@/components/Logo"
import useCheckSession from "@/utils/useCheckSession";
import buyGame from "@/utils/buyGame";
import getUserEmail from "@/utils/getUserEmail";
import { useEffect } from "react";
import { Button, Typography, Box, Container, Paper, Grid } from "@mui/material";
import { useState } from "react";
import hasGame from "@/utils/hasGame";
import buyBadge from "@/utils/buyBadge";
import hasBadge from "@/utils/hasBadge";
import getCoins from "@/utils/getCoins";

export default function Shop() {
    useCheckSession();
    const [loading, setLoading] = useState(true);
    const [gameStates, setGameStates] = useState({
        game2: true, game3: true, game4: true, game5: true, game6: true,
        badge1: true, badge2: true, badge3: true
    });
    const [coins, setCoins] = useState(getCoins());

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [
                    game2, game3, game4, game5, game6,
                    badge1, badge2, badge3
                ] = await Promise.all([
                    hasGame("Game2", getUserEmail()),
                    hasGame("Game3", getUserEmail()),
                    hasGame("Game4", getUserEmail()),
                    hasGame("Game5", getUserEmail()),
                    hasGame("Game6", getUserEmail()),
                    hasBadge("Badge1", getUserEmail()),
                    hasBadge("Badge2", getUserEmail()),
                    hasBadge("Badge3", getUserEmail()),
                ]);

                setGameStates({
                    game2: Boolean(game2), game3: Boolean(game3),
                    game4: Boolean(game4), game5: Boolean(game5),
                    game6: Boolean(game6), badge1: Boolean(badge1),
                    badge2: Boolean(badge2), badge3: Boolean(badge3)
                });
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [coins]);

    if(loading) return <Typography variant="h4" sx={{ p: 4 }}>Loading...</Typography>;

    const createGameButton = (gameId: string, price: number, image: string, disabled: boolean) => (
        <Button
            variant="contained"
            disabled={disabled}
            onClick={async () => {
                await buyGame(gameId, getUserEmail(), price);
                setCoins(getCoins());
            }}
            sx={{
                width: 200,
                height: 200,
                m: 2,
                backgroundImage: `url(/img/${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: disabled ? 0.5 : 1,
                position: 'relative',
                '&:hover': { opacity: disabled ? 0.5 : 0.9 },
                transition: 'opacity 0.3s'
            }}
        >
            <Box sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                bgcolor: 'rgba(0,0,0,0.7)',
                color: 'white',
                p: 1,
                textAlign: 'center'
            }}>
                <Typography variant="body1">{gameId}</Typography>
                <Typography variant="subtitle2">{price} Coins</Typography>
            </Box>
        </Button>
    );

    return (
        <>
            <Logo />
            <GameMenu current="shop" />
            
            <Paper elevation={3} sx={{ p: 3, m: 3, bgcolor: 'background.paper', marginTop:10}}>
                <Typography variant="h4" sx={{ mb: 3, textAlign: 'center', color: 'primary.main' }}>
                    🪙 You have {coins} coins
                </Typography>

                <Typography variant="h5" sx={{ mt: 4, mb: 2, color: 'text.secondary' }}>
                    Available Games
                </Typography>
                <Grid container justifyContent="center">
                    {createGameButton("Game2", 100, "slot_machine_game.avif", gameStates.game2)}
                    {createGameButton("Game3", 200, "flappy_bird_game.png", gameStates.game3)}
                    {createGameButton("Game4", 300, "number_guessing_game.webp", gameStates.game4)}
                    {createGameButton("Game5", 400, "tic_tac_toe.jpg", gameStates.game5)}
                    {createGameButton("Game6", 500, "number_guessing_game.webp", gameStates.game6)}
                </Grid>

                <Typography variant="h5" sx={{ mt: 6, mb: 2, color: 'text.secondary' }}>
                    Premium Badges
                </Typography>
                <Grid container justifyContent="center">
                    {createGameButton("Badge1", 40, "Badge1.png", gameStates.badge1)}
                    {createGameButton("Badge2", 400, "Badge2.png", gameStates.badge2)}
                    {createGameButton("Badge3", 400, "Badge3.png", gameStates.badge3)}
                </Grid>
            </Paper>
        </>
    );
}
