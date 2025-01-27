"use client"
import GameMenu from "@/components/GameMenu";
import Logo from "@/components/Logo";
import { scheduler } from "@/utils/datagrid";
import useCheckSession from "@/utils/useCheckSession";
import { Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export default function Scheduler() {
    useCheckSession();
    return (
      <>
        <Logo />
        <GameMenu current="scheduler" />
        <div style={{ display: "flex", justifyContent: "center", marginTop: 60}}>
          <div style={{ maxWidth: "80%", width: "700px" }}>
            <DataGrid
              style={{ width: "100%", height: 500 }}
              columns={scheduler}
              hideFooter
            />
          </div>
        </div>
      </>
    );
}