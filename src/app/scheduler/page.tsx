"use client"
import GameMenu from "@/components/GameMenu";
import Logo from "@/components/Logo";
import api from "@/utils/axios";
import { scheduler } from "@/utils/datagrid";
import getUserEmail from "@/utils/getUserEmail";
import useCheckSession from "@/utils/useCheckSession";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

type Game = {
  id: string;
  player1: string;
  player2: string;
  startDate: string;
  game: string;
};

export default function Scheduler() {
  useCheckSession();

  const [scheduledGames, setScheduledGames] = useState([]);

  const getScheduledGames = async () => {
    try {
      const res = await api.get(`/getAllScheduledGames/${getUserEmail()}`);

      const games = res.data.scheduledGames;

      if (games) {
        setScheduledGames(games.map((game: Game, index: number) => ({
          rowID: index,
          sheduleID: game.id, 
          friend: (game.player1 == getUserEmail()) ? game.player2 : game.player1,
          date: game.startDate,
          game: game.game,
        })))
      }

    } catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getScheduledGames();
  }, [])

  return (
    <>
      <Logo />
      <GameMenu current="scheduler" />
      <div style={{ display: "flex", justifyContent: "center", marginTop: 60 }}>
        <div style={{ maxWidth: "100%", width: "50%" }}>
          <DataGrid
            style={{ width: "100%", height: 500 }}
            columns={scheduler}
            rows={scheduledGames}
            hideFooter
            initialState={{
              columns: {
                columnVisibilityModel: {
                  rowID: false,
                  scheduleID: false
                },
              },
            }}
            getRowId={(row) => row.rowID} 
          />
        </div>
      </div>
    </>
  );
}
