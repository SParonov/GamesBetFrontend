'use client'
import React, { useCallback, useEffect, useState } from 'react';
import useCheckSession from '@/utils/useCheckSession';
import BackButton from '@/components/BackButton';
import { Button, Typography } from '@mui/material';

import './SlotMachine.css'; // Create this CSS file for styling
import api from '@/utils/axios';
import getUserEmail from '@/utils/getUserEmail';
import getHighScore from '@/utils/getHighScore';
import updateGameData from '@/utils/updateGameData';

const SYMBOLS = ['🍒', '🍋', '🍉', '⭐', '🔔', '7️⃣']; // Slot machine SYMBOLS
const SPIN_TAX = 10;

export default function SlotMachine() {
  const [reels, setReels] = useState(['?', '?', '?']);
  const [spinning, setSpinning] = useState(false);
  const [message, setMessage] = useState('');
  const [currScore, setCurrScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [email, setEmail] = useState<string | undefined>("");

  useCheckSession();

  useEffect(() => {
    setEmail(getUserEmail());
    getHighScore(setHighScore, 'game2');
  }, [])

  useEffect(() => {
    if(spinning == true) return;

    updateGameData('game2', currScore, highScore);

  }, [spinning])


  const spinReels = async () => {
    try {
      const res = await api.put("/updateCoins", {coins: SPIN_TAX, email: email});

      if(!res.data.EnoughCoins) {
        alert("Not enough coins");
        return;
      }
    } catch(err: any) {
      console.log(err);
    }

    setSpinning(true);
    setMessage('');
    setCurrScore(0);


    const interval = setInterval(() => {
      setReels([
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      ]);
    }, 100);

    setTimeout(() => {
      clearInterval(interval);

      const finalReels = [
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      ];

      setReels(finalReels);
      setSpinning(false);
      checkResult(finalReels);
    }, 2000); // Spin duration (2 seconds)
  };

  const checkResult = useCallback((finalReels: any[]) => {
    let coinsEarned = 0;
    if (finalReels[0] == finalReels[1] && finalReels[1] == finalReels[2]) {
      if (finalReels[0] == '7️⃣') {
        setMessage('🎉 Jackpot! You won 1000 coins!');
        coinsEarned = 1000;
      } else {
        setMessage('🎉 Nice! You won 500 coins!');
        coinsEarned = 500;
      }
    } else {
      if (finalReels[0] == finalReels[1]) {

        if(finalReels[0] == '7️⃣') {
          setMessage('You got two 7\'s! You won 250 coins!');
          coinsEarned = 250;
        } else {
          setMessage('You got two matching symbols! You won 50 coins!');
          coinsEarned = 50;
        }

      } else if (finalReels[1] == finalReels[2]) {

          if(finalReels[1] == '7️⃣') {
            setMessage('You got two 7\'s! You won 250 coins!');
            coinsEarned = 250;
          } else {
            setMessage('You got two matching symbols! You won 50 coins!');
            coinsEarned = 50;
          }

      } else if (finalReels[0] == finalReels[2]) {

          if(finalReels[0] == '7️⃣') {
            setMessage('You got two 7\'s! You won 250 coins!');
            coinsEarned = 250;
          } else {
            setMessage('You got two matching symbols! You won 50 coins!');
            coinsEarned = 50;
          }
      } else {
        setMessage('Try again!');
      }
    }
    setCurrScore(coinsEarned);
    if(coinsEarned > highScore) {
      setHighScore(coinsEarned);
    }
  }, [highScore]);

  return <div style={{background: "linear-gradient(45deg, #00bcd4, #9c27b0)", height: '100vh'}}>
    <BackButton />
    <Typography style={{display: 'flex', justifyContent: 'center', fontSize: 60, color: 'white'}}>SLOT MACHINE</Typography>
    <div className="slot-machine" style={{marginTop: 100}}>
      <div className="reels">
        {reels.map((symbol, index) => (
          <div key={index} className="reel">
            {symbol}
          </div>
        ))}
      </div>
      <Button style={{width: '20%'}} onClick={spinReels} disabled={spinning} variant='contained' color='secondary' size='large'>
        {spinning ? 'Spinning...' : 'Spin (10 coins)'}
      </Button>
      <Typography style = {{color: 'white', marginTop: 20, fontSize: 26}}>{message}</Typography>
      <div style={{display: 'flex', justifyContent: 'center', marginTop: 200, position: 'fixed', top: '25%', left: 0, right: 0}}>
            <Typography style={{ fontSize: 25, color: 'white'}}>Highest winnings: {highScore}</Typography>
        </div>
    </div>
  </div>
};