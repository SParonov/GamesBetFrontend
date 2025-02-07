"use client"
import GameMenu from "@/components/GameMenu";
import Logo from "@/components/Logo";
import useCheckSession from "@/utils/useCheckSession";
import { useEffect, useState } from "react";
import getActivities from "@/utils/getActivities";
import getUserEmail from "@/utils/getUserEmail";
import { Box, Typography, Container, Paper, CircularProgress, Chip, Grid } from "@mui/material";
import { CheckCircle, SportsEsports, MonetizationOn } from "@mui/icons-material";

interface Activity {
  Game: string;
  RequiredCoins: number;
  Reward: number;
}

export default function Activities() {
    useCheckSession();
    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => { 
        const fetchActivities = async () => {
            try {
                await getActivities(getUserEmail(), setActivities);
            } finally {
                setLoading(false);
            }
        };
        fetchActivities();
    }, []);

    const getGameName = (gameCode: string) => {
        switch(gameCode) {
            case "Game1": return "Snake Game";
            case "Game3": return "Flappy Bird";
            default: return "Number Guessing Game";
        }
    };

    return (
        <>
            <Logo />
            <GameMenu current="activities" />
            
            <Box sx={{ mt: 4, mb: 8 }}>
                <Typography variant="h4" sx={{ 
                    mb: 4,
                    textAlign: 'center',
                    color: 'primary.main',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2
                }}>
                    <SportsEsports fontSize="large" />
                    Game Challenges
                </Typography>

                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <CircularProgress color="primary" />
                    </Box>
                ) : activities?.length === 0 ? (
                    <Typography variant="body1" sx={{ textAlign: 'center', color: 'text.secondary' }}>
                        No current activities available
                    </Typography>
                ) : (
                    <Grid container spacing={3}>
                        {activities?.map((activity, index) => (
                            <Grid item xs={12} md={6} key={index}>
                                <Paper elevation={3} sx={{ 
                                    p: 3,
                                    borderRadius: 2,
                                    transition: 'transform 0.2s',
                                    '&:hover': { transform: 'translateY(-4px)' },
                                    position: 'relative'
                                }}>
                                    <Chip
                                        label="Active"
                                        color="success"
                                        icon={<CheckCircle />}
                                        sx={{ position: 'absolute', top: -10, right: -10 }}
                                    />
                                    
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <MonetizationOn color="warning" sx={{ mr: 1 }} />
                                        <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
                                            {getGameName(activity.Game)}
                                        </Typography>
                                    </Box>

                                    <Box sx={{ 
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        bgcolor: 'action.hover',
                                        p: 2,
                                        borderRadius: 1,
                                        mt: 2
                                    }}>
                                        <Typography variant="body2" color="text.secondary">
                                            Required Coins:
                                        </Typography>
                                        <Chip 
                                            label={activity.RequiredCoins} 
                                            color="primary" 
                                            variant="outlined"
                                        />
                                    </Box>

                                    <Box sx={{ 
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        bgcolor: 'success.light',
                                        p: 2,
                                        borderRadius: 1,
                                        mt: 2
                                    }}>
                                        <Typography variant="body2" color="text.secondary">
                                            Reward:
                                        </Typography>
                                        <Chip 
                                            label={`+${activity.Reward} coins`} 
                                            color="success" 
                                            variant="filled"
                                        />
                                    </Box>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Box>
        </>
    );
}