"use client";
import { useEffect, useState } from "react";
import { pusherClient } from "@/utils/pusher/pusher";
import { useRouter } from "next/compat/router";
import BackButton from "@/components/BackButton";
import useCheckSession from "@/utils/useCheckSession";
import { Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";

export default function TicTacToeOnline() {
  const router = useRouter();
  const ID = router?.query.ID;
  const searchParams = useSearchParams();

  const user = searchParams.get("user");
  const friend = searchParams.get("friend");

  const sorted = [user, friend].sort();
  const playerX = sorted[0];
  const playerO = sorted[1];

  const [board, setBoard] = useState<Array<string | null>>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [playerToMove, setPlayerToMove] = useState(playerX);
  const [gameHasEnded, setGameHasEnded] = useState(false);
  const [gameState, setGameState] = useState<string | null>(null);

  useCheckSession();

  useEffect(() => {
    setPlayerToMove(isXNext ? playerX : playerO);
  }, [isXNext, playerX, playerO]);

  useEffect(() => {
    pusherClient.subscribe(`game-${ID}`);

    pusherClient.bind(
      "move-made",
      (data: { index: number; player: "X" | "O" }) => {
        setBoard((prevBoard) => {
          const newBoard = [...prevBoard];
          newBoard[data.index] = data.player;
          return newBoard;
        });
        setIsXNext(data.player === "X" ? false : true);
      }
    );

    return () => {
      pusherClient.unsubscribe(`game-${ID}`);
    };
  }, [ID]);

  const checkGameState = (board: Array<string | null>) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]; 
      }
    }

    return board.includes(null) ? null : "draw";
  };

  useEffect(() => {
    const result = checkGameState(board);
    setGameState(result);
    if (result) setGameHasEnded(true);
  }, [board]);

  const handleMove = async (index: number) => {
    if (board[index] || gameHasEnded) return;

    const player = isXNext ? "X" : "O";

    setBoard((prevBoard) => {
      const newBoard = [...prevBoard];
      newBoard[index] = player;
      return newBoard;
    });
    setIsXNext(!isXNext);

    await fetch("/api/move", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ID: `game-${ID}`,
        move: { index, player },
      }),
    });
  };

  return (
    <div style={{ marginTop: 100 }}>
      {gameHasEnded && <BackButton />}
      <div className="flex flex-col items-center space-y-4">
        <Typography className="font-bold" fontSize={60}>
          TIC TAC TOE ONLINE
        </Typography>
        <p>
          {gameState
            ? gameState === "draw"
              ? "It's a draw!"
              : `Winner: ${gameState === 'X' ? playerX?.split('@')[0] : playerO?.split('@')[0]}`
            : `Current Player: ${playerToMove?.split('@')[0]} (${playerToMove === playerX ? 'X' : 'O'})`}
        </p>
        <div className="grid grid-cols-3 gap-2">
          {board.map((cell, index) => (
            <button
              key={index}
              onClick={() => {
                if (!gameHasEnded && playerToMove === user) {
                  handleMove(index);
                } else {
                  alert("Не си на ход");
                }
              }}
              className="w-16 h-16 border-2 border-black flex items-center justify-center text-xl font-bold"
            >
              {cell}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

