import { IconButton } from '@mui/material';
import {GridColDef, GridRenderCellParams, GridTreeNodeWithRender } from '@mui/x-data-grid';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CancelIcon from '@mui/icons-material/Cancel';
import api from './axios';
import getUserEmail from './getUserEmail';

export const friendsCol: GridColDef[] = [
    { field: 'id', headerName: 'Email', width: 380},
];

const scheduler = (router: any): GridColDef[] => [
    {field: 'rowID'},
    {field: 'scheduleID'},
    {field: 'friend', headerName: 'Friend', width: 300},
    {field: 'date', headerName: 'Date', width: 300},
    {field: 'game', headerName: 'Game', width: 200},
    {field: 'button', headerName: 'Start Game', width: 150, renderCell: (params) => {

    const gameStartDate = new Date(params.row.date);
    const now = new Date();
    const DAY = 24 * 60 * 60 * 1000;

    if (now > gameStartDate) {
        return <IconButton style={{marginLeft: 10, color: 'green'}} onClick = {() => {
            if (now.getTime() < gameStartDate.getTime() + DAY) {
                router.push(`games_hub/${params.row.game}?ID=${params.row.scheduleID}&user=${getUserEmail()}&friend=${params.row.friend}`)
            } else {
                alert("Scheduled game has expired");
                params.api.updateRows([{rowID: params.row.rowID, _action: 'delete' }])
            }
        }}>
            <CheckBoxIcon />
        </IconButton>
    } else {
        return <IconButton style={{marginLeft: 10}} disabled>
                <CancelIcon />
            </IconButton>
    }}}
];

export default scheduler;

const handleInvite = async (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>, setRefresh: React.Dispatch<React.SetStateAction<boolean>>, type: string) => {
    const friendEmail = params.row.id;

    try {
        const res = await api.put(`/handleInvite/${getUserEmail()}/${friendEmail}/${type}`);

        if(res.status == 200) {
            params.api.updateRows([{id: friendEmail, _action: 'delete' }])
        }

    } catch (err) {
        console.log(err);
    }
    
    setRefresh(prev => !prev);
}

export const invite = (setRefresh: React.Dispatch<React.SetStateAction<boolean>>): GridColDef[] => [
    {field: 'id', headerName: 'Email',  width: 300},
    {field: 'confirm', headerName: 'Confirm', renderCell: (params) => {
        return <IconButton style={{marginLeft: 10}} onClick = {handleInvite.bind(null, params, setRefresh, 'accept')}>
            <CheckBoxIcon />
        </IconButton>
    }},
    {field: 'decline', headerName: 'Decline', renderCell: (params) => {
        return <IconButton style={{marginLeft: 10}}onClick = {handleInvite.bind(null, params, setRefresh, 'decline')}>
            <CancelIcon />
        </IconButton>
    }}
]