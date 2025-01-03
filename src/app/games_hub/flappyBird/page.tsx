// FlappyBird.js
"use client";
import React, { useState, useEffect, useRef } from 'react';
import './FlappyBird.css';

const FlappyBird = () => {
  const [birdPosition, setBirdPosition] = useState(300);
  const [pipePosition, setPipePosition] = useState(500);
  const [pipeHeight, setPipeHeight] = useState(200);
  const [gameRunning, setGameRunning] = useState(false);
  const [score, setScore] = useState(0);

  const gameAreaHeight = 600;
  const gameAreaWidth = 400;
  const birdSize = 30;
  const pipeWidth = 50;
  const gravity = 2;
  const jumpHeight = 50;
  const pipeSpeed = 5;

  const birdRef = useRef(null);

  useEffect(() => {
    let gameInterval: string | number | NodeJS.Timeout | undefined;

    if (gameRunning) {
      gameInterval = setInterval(() => {
        setBirdPosition((prev) => Math.min(prev + gravity, gameAreaHeight - birdSize));
        setPipePosition((prev) => {
          if (prev <= -pipeWidth) {
            setScore((prevScore) => prevScore + 1);
            setPipeHeight(Math.floor(Math.random() * (gameAreaHeight - 200)) + 100);
            return gameAreaWidth;
          }
          return prev - pipeSpeed;
        });
      }, 30);
    }

    return () => clearInterval(gameInterval);
  }, [gameRunning]);

  useEffect(() => {
    if (
      birdPosition < 0 ||
      (pipePosition < birdSize + 50 &&
        ((birdPosition < pipeHeight - 150) || (birdPosition + birdSize > pipeHeight)))
    ) {
      setGameRunning(false);
      alert(`Game Over! Score: ${score}`);
      setScore(0);
      setBirdPosition(300);
      setPipePosition(500);
      setPipeHeight(200);
    }
  }, [birdPosition, pipePosition, pipeHeight, score]);

  const handleJump = () => {
    if (gameRunning) {
      setBirdPosition((prev) => Math.max(prev - jumpHeight, 0));
    }
  };

  const startGame = () => {
    setGameRunning(true);
  };

  return (
    <div
      className="game-area"
      style={{ height: gameAreaHeight, width: gameAreaWidth }}
      onClick={handleJump}
    >
      <div
        className="bird"
        style={{ top: birdPosition, width: birdSize, height: birdSize }}
        ref={birdRef}
      ></div>
      <div
        className="pipe"
        style={{
          left: pipePosition,
          height: pipeHeight - 150,
          top: 0,
          width: pipeWidth,
        }}
      ></div>
      <div
        className="pipe"
        style={{
          left: pipePosition,
          height: gameAreaHeight - pipeHeight,
          bottom: 0,
          width: pipeWidth,
        }}
      ></div>
      {!gameRunning && (
        <button className="start-button" onClick={startGame}>
          Start Game
        </button>
      )}
      <div className="score">Score: {score}</div>
    </div>
  );
};

export default FlappyBird;