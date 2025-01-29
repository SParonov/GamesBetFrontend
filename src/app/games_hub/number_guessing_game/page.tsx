"use client"

import BackButton from "@/components/BackButton";
import { useState } from "react";
import getHighScore from "@/utils/getHighScore";
import updateGameData from "@/utils/updateGameData";
import useCheckSession from "@/utils/useCheckSession";

export default function GuessingGame() {
  
  useCheckSession();

  const getRandomNumber = () => Math.floor(Math.random() * 100) + 1;

  const [score, setScore] = useState(100);
  const [highscore, setHighscore] = useState(100);
  const [targetNumber, setTargetNumber] = useState(getRandomNumber);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("Guess a number between 1 and 100");
  const [attempts, setAttempts] = useState(0);
  getHighScore(setHighscore, "game4");

  const handleGuess = () => {
    const numGuess = parseInt(guess, 10);
    if (isNaN(numGuess) || numGuess < 1 || numGuess > 100) {
      setMessage("Please enter a valid number between 1 and 100!");
      return;
    }

    setAttempts(attempts + 1);
    setScore(score - 10);

    if (numGuess < targetNumber) {
      setMessage("Too low! Try again.");
    } else if (numGuess > targetNumber) {
      setMessage("Too high! Try again.");
    } else {
      updateGameData("game4", score-10, score-10);
      setMessage(`🎉 Correct! You guessed it in ${attempts + 1} attempts.`);
    }
  };

  const handleRestart = () => {
    setTargetNumber(getRandomNumber());
    setGuess("");
    setMessage("Guess a number between 1 and 100");
    getHighScore(setHighscore, "game4");
    setScore(110);
    setAttempts(0);
  };

  return (
    <div style={{background: "linear-gradient(135deg, #00bcd4, #9c27b0)", height: '100vh'}}>
    <BackButton />
    <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-lg max-w-sm mx-auto">
      <h1 className="text-xl font-bold mb-4">Number Guessing Game 🎯</h1>
      <p className="text-gray-700 mb-2">{message}</p>
      <input
        type="number"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        className="border p-2 mb-2 rounded w-full"
        placeholder="Enter a number"
      />
      <button
        onClick={handleGuess}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Guess
      </button>
      <button
        onClick={handleRestart}
        className="mt-2 text-sm text-gray-600 underline"
      >
        Restart Game
      </button>
      <p className="text-gray-500 mt-2">Attempts: {attempts}</p>
      <p className="text-gray-500 mt-2">Score: {score}</p>
      <p className="text-gray-500 mt-2">Highcore: {highscore}</p>
    </div>
    </div>
  );
}