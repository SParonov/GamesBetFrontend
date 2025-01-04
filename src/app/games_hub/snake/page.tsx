"use client";

import { KeyboardEvent, useEffect, useRef, useState } from "react";
import useCheckSession from "@/utils/useCheckSession";
import { Typography } from "@mui/material";
import BackButton from "@/components/BackButton";
import getHighScore from "@/utils/getHighScore";
import updateGameData from "@/utils/updateGameData";


const GRID_SIZE = 30; // Number of cells in each row and column
const INITIAL_SNAKE_LENGTH = 3; // Initial length of the snake
const INITIAL_DIRECTION: Direction = "DOWN"; // Initial direction of the snake

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

type Point = {
  x: number;
  y: number;
};

export default function Snake() {
  const [snake, setSnake] = useState<Point[]>([
    { x: 2, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: 0 },
  ]);
  const [food, setFood] = useState<Point>({ x: 0, y: 0 });
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [highScore, setHighScore] = useState(0)
  const [currScore, setCurrScore] = useState(0);
  const [gameHasStarted, setGameHasStarted] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  useCheckSession(gameHasStarted);
  
  useEffect(() => {
    if (gridRef.current) {
        gridRef.current.focus();
    }

    getHighScore(setHighScore, 'game1');
  }, [])

  useEffect(() => {
    if(gameOver == false) return;

    updateGameData('game1', currScore, highScore);
  }, [gameOver])


  useEffect(() => {
    if (!gameOver && gameHasStarted) {
      const interval = setInterval(moveSnake, 45);
      return () => clearInterval(interval);
    }
  }, [snake, direction, gameHasStarted]);

  const initGame = (): void => {
    const initialSnake: Point[] = [];
    for (let i = 0; i < INITIAL_SNAKE_LENGTH; i++) {
      initialSnake.push({ x: i, y: 0 });
    }
    setDirection(INITIAL_DIRECTION);
    setSnake(initialSnake);
    generateFood();
  };

  const moveSnake = async () => {
    const newSnake = [...snake];
    const head = { ...newSnake[0] };

    switch (direction) {
      case "UP":
        head.y -= 1;
        break;
      case "DOWN":
        head.y += 1;
        break;
      case "LEFT":
        head.x -= 1;
        break;
      case "RIGHT":
        head.x += 1;
        break;
      default:
        break;
    }

    // Check if game over
    if (
      head.x < 0 ||
      head.x >= GRID_SIZE ||
      head.y < 0 ||
      head.y >= GRID_SIZE ||
      newSnake.some((segment) => segment.x === head.x && segment.y === head.y)
    ) {
      setGameOver(true);
      if(currScore > highScore) {
        setHighScore(currScore);
      }   

      return;
    }

    newSnake.unshift(head);

    // Check if snake eats food
    if (head.x === food.x && head.y === food.y) {
      setCurrScore(prev => prev + 1);  
      generateFood();
    } else {
      newSnake.pop();
    }

    // Update the snake state
    setSnake(newSnake);
  };


  const generateFood = (): void => {
    const x = Math.floor(Math.random() * GRID_SIZE);
    const y = Math.floor(Math.random() * GRID_SIZE);
    setFood({ x, y });
  };

  const handleStartOfGame = () => {
    setGameHasStarted(true);
    setGameOver(false);
    setCurrScore(0);
    initGame();
    if (gridRef.current) {
        gridRef.current.focus();
    }
  }

  const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === "ArrowUp" && direction !== "DOWN") {
      setDirection("UP");
    }
    if (event.key === "ArrowDown" && direction !== "UP") {
      setDirection("DOWN");
    }
    if (event.key === "ArrowLeft" && direction !== "RIGHT") {
      setDirection("LEFT");
    }
    if (event.key === "ArrowRight" && direction !== "LEFT") {
      setDirection("RIGHT");
    }
    if (event.key == "Enter") {
        handleStartOfGame();
    }
  };


  return (
    <div style={{background: "linear-gradient(45deg, #9c27b0, #00bcd4)"}}>
        <BackButton />
        <Typography style={{position: "absolute", left: 755, fontSize: 60, color: 'white'}}>SNAKE GAME</Typography>
        <Typography style={{position: 'absolute', left: "35%", fontSize: 20, top: "14%", color: 'white'}}>Press Enter to Start</Typography>
        <div
        className="flex justify-center items-center h-screen"
        onKeyDown={handleKeyPress}
        tabIndex={0}
        ref={gridRef}
        >
        <div className="absolute grid grid-cols-20 grid-rows-20 border-4">
            {gameOver && (
            <div className="absolute inset-0 flex justify-center items-center text-4xl font-bold text-purple-600">
                Game Over!
            </div>
            )}
            {Array.from({ length: GRID_SIZE }).map((_, y) => (
            <div key={y} className="flex">
                {Array.from({ length: GRID_SIZE }).map((_, x) => (
                <div
                    key={x}
                    className={`w-5 h-5 
                    ${food.x === x && food.y === y ? 
                        "bg-red-500" : snake.some((segment) => segment.x === x && segment.y === y) ? 
                        "bg-green-700" : (x + y) % 2 == 0 ? 
                        "bg-green-400" : "bg-green-500"}
                    `}
                ></div>
                ))}
            </div>
            ))}
        </div>
        </div>
        <div style={{position: 'absolute', top: "40%", left: "20%"}}>
            <Typography style={{ fontSize: 25, marginBottom: 20, color: 'white'}}>Coins earned: {currScore}</Typography>
            <Typography style={{ fontSize: 25, color: 'white'}}>High Score: {highScore}</Typography>
        </div>
    </div>
  );
}

