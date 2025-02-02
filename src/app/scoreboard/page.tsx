"use client"
import GameMenu from "@/components/GameMenu";
import Logo from "@/components/Logo";
import useCheckSession from "@/utils/useCheckSession";
import { useEffect, useState } from "react";
import getScoreboard from "@/utils/getScoreboard";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";


export default function Scoreboard() {
    const [firstCol, setFirstCol] = useState([])
    const [secondCol, setSecondCol] = useState([])
    useCheckSession();
    useEffect(()=>{getScoreboard(setFirstCol, setSecondCol)},[])
    return <>
        <Logo />
        <GameMenu current = "scoreboard"/>
        <div style={{marginTop: '100px'}}>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
            <TableRow>
                <TableCell>Email</TableCell>
                <TableCell align="left">Coins</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {firstCol.map((email, id) => (
                <TableRow
                key={email}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row">
                    {email}
                </TableCell>
                <TableCell align="left">{secondCol[id]}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
        </div>
    </>
}