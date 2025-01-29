"use client"
import { useCallback, useEffect, useState } from "react";
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

  const [board, setBoard] = useState<Array<string | null>>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [player, setPlayer] = useState<"X" | "O" | null>(null);

  useCheckSession();

  useEffect(() => {
    setPlayer(isXNext ? "X" : "O");

    pusherClient.subscribe(`game-${ID}`);

    pusherClient.bind(
      "move-made",
      (data: { index: number; player: "X" | "O" }) => {
        const newBoard = [...board];
        newBoard[data.index] = data.player;
        setBoard(newBoard);
        setIsXNext(data.player === "X" ? false : true);
      }
    );

    return () => {
      pusherClient.unsubscribe(`game-${ID}`);
    };
  }, [ID, board]);

  const handleMove = async (index: number) => {
    if (
      board[index] ||
      handleGameState(board) ||
      player !== (isXNext ? "X" : "O")
    )
      return;

    const newBoard = [...board];
    newBoard[index] = player;
    setBoard(newBoard);
    setIsXNext(!isXNext);

    await fetch("/api/move", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ID: `game-${ID}`,
        move: { index, player },
      }),
    });
  };

  const handleGameState = (board: Array<string | null>) => {
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

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    if (!board.includes(null)) {
      return 'draw';
    }

    return null;
  };

  const gameState = handleGameState(board);

  return (
    <div style={{marginTop: 100}}>
      <BackButton />
      <div className="flex flex-col items-center space-y-4">
        <Typography className="font-bold" fontSize={60}>TIC TAC TOE ONLINE</Typography>
        <p>
          {gameState
            ? gameState === 'draw'
              ? "It's a draw!"
              : `Winner: ${gameState}`
            : `Next Player: ${isXNext ? "X" : "O"}`}
        </p>
        <div className="grid grid-cols-3 gap-2">
          {board.map((cell, index) => (
            <button
              key={index}
              onClick={() => handleMove(index)}
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

