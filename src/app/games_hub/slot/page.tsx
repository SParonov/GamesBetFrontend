'use client'
import React, { useState } from 'react';
import './SlotMachine.css'; // Create this CSS file for styling

const SlotMachine = () => {
  const symbols = ['🍒', '🍋', '🍉', '⭐', '🔔', '7️⃣']; // Slot machine symbols
  const [reels, setReels] = useState(['?', '?', '?']);
  const [spinning, setSpinning] = useState(false);
  const [message, setMessage] = useState('');

  const spinReels = () => {
    setSpinning(true);
    setMessage('');

    const interval = setInterval(() => {
      setReels([
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
      ]);
    }, 100);

    setTimeout(() => {
      clearInterval(interval);

      const finalReels = [
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
      ];

      setReels(finalReels);
      setSpinning(false);
      checkResult(finalReels);
    }, 2000); // Spin duration (2 seconds)
  };

  const checkResult = (finalReels: any[]) => {
    if (finalReels[0] === finalReels[1] && finalReels[1] === finalReels[2]) {
      setMessage('🎉 Jackpot! You won!');
    } else {
      setMessage('Try again!');
    }
  };

  return (
    <div className="slot-machine">
      <h1>Slot Machine</h1>
      <div className="reels">
        {reels.map((symbol, index) => (
          <div key={index} className="reel">
            {symbol}
          </div>
        ))}
      </div>
      <button onClick={spinReels} disabled={spinning}>
        {spinning ? 'Spinning...' : 'Spin'}
      </button>
      <p>{message}</p>
    </div>
  );
};

export default SlotMachine;