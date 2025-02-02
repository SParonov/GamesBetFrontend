"use client";
import { useEffect, useState } from "react";
import { pusherClient } from "@/utils/pusher/pusher";
import { useRouter as useRouterNav} from "next/navigation";
import useCheckSession from "@/utils/useCheckSession";
import { IconButton, InputAdornment, TextField, Typography, Button } from "@mui/material";
import { useSearchParams } from "next/navigation";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import api from "@/utils/axios";
import getUserEmail from "@/utils/getUserEmail";
import getCoins from "@/utils/getCoins";

export default function TicTacToeOnline() {
  const routerNav = useRouterNav();

  const searchParams = useSearchParams();

  const ID = searchParams.get("ID");
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
  const [gameHasStarted, setGameHasStarted] = useState(false);

  const [betAmount, setBetAmount] = useState<number | "">("");
  const [finalBet, setFinalBet] = useState<number>(0);
  const [betPlaced, setBetPlaced] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);

  useCheckSession();

  useEffect(() => {
    setPlayerToMove(isXNext ? playerX : playerO);
  }, [isXNext, playerX, playerO]);

  useEffect(() => {
    pusherClient.subscribe(`game-${ID}`);

    pusherClient.bind("move-made", (data: { index: number; player: "X" | "O" }) => {
      setBoard((prevBoard) => {
        const newBoard = [...prevBoard];
        newBoard[data.index] = data.player;
        return newBoard;
      });
      setIsXNext(data.player === "X" ? false : true);
    });

    pusherClient.bind("bet-finalized", (data: { minBet: number }) => {
      setFinalBet(data.minBet);
      setGameHasStarted(true);
    });

    return () => {
      pusherClient.unsubscribe(`game-${ID}`);
    };
  }, [ID, user]);

  useEffect(() => {

  }, [gameHasEnded])

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
    if (result) {
      setGameHasEnded(true);
      setWinner(result == 'X' ? playerX : playerO)
    }
  }, [board]);

  const handleMove = async (index: number) => {
    if (board[index] || gameHasEnded || !gameHasStarted) return;

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

  const placeBet = async () => {
    if (!betAmount || betPlaced) return;

    if (betAmount < 0) {
      alert("Заложената сума трябва да е положително число");
      return;
    }

    if (betAmount > await getCoins()) {
      alert("Нямате толкова пари");
      return;
    }

    setBetPlaced(true);

    await fetch("/api/bet", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ID: `game-${ID}`,
        user,
        amount: betAmount,
      }),
    });
  };


  return <div style={{background: "linear-gradient(45deg,rgb(15, 9, 70), rgb(172, 98, 56))", height: '100vh', display: 'flex', justifyContent: 'center'}} >
      {gameHasEnded && (
        <Button
          style={{ position: "absolute", color: "white", top: 20, left: 20 }}
          startIcon={<ArrowBackIcon />}
          variant="outlined"
          color="secondary"
          onClick={async () => {
            try {
              if (user == winner) {
                await api.put(`/updateGamesData/game5/${getUserEmail()}`, {coins: finalBet, highscore: finalBet});
              } else {
                await api.put("/updateCoins", {coins: finalBet, email: getUserEmail()});
              }
              await api.delete(`/removeFromScheduler/${ID}`);
              routerNav.push("/games_hub")
          } catch(err: any) {
              console.log(err);
          }
          }}
        >
          Back
        </Button>
      )}
      <div className="flex flex-col items-center space-y-4 fixed">
        <Typography className="font-bold" fontSize={60} color="white">
          TIC TAC TOE ONLINE
        </Typography>

        {gameHasStarted ? (
          <>
            <Typography color="white">
              {gameState
                ? gameState === "draw"
                  ? "It's a draw!"
                  : `Winner: ${winner?.split("@")[0]}`
                : `Current Player: ${playerToMove?.split("@")[0]} (${
                    playerToMove === playerX ? "X" : "O"
                  })`}
            </Typography>
            <div className="grid grid-cols-3 gap-2">
              {board.map((cell, index) => (
                <button
                  style={{color: 'white'}}
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
            <Typography className="text-lg mt-4" color="white">
              Playing with a bet of: {finalBet} coins
            </Typography>
          </>
        ) : (
          <>
            <Typography className="text-lg" color="white">
              Place your bet to start the game
            </Typography>
            <TextField 
              style={{ marginTop: 20, width: 250}}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "white" },
                  "&:hover fieldset": { borderColor: "white" }, 
                  "&.Mui-focused fieldset": { borderColor: "white" }, 
                },
                "& .MuiInputLabel-root": { color: "white" },
                "& .MuiInputBase-input": { color: "white" }, 
              }}
              type="number"
              label="Enter your bet"
              color="secondary"
              variant="outlined"
              value={betAmount}
              onChange={(e) => setBetAmount(Number(e.target.value))}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={placeBet} disabled={betPlaced}>
                        <SendIcon color={betPlaced ? "disabled" : "secondary"} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }
              }}
            />
            {betPlaced && (
              <Typography className="text-md mt-2" color="white">
                Waiting for opponent...
              </Typography>
            )}
          </>
        )}
      </div>
    </div>
}


