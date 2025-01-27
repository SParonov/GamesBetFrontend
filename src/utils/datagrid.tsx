import { IconButton } from '@mui/material';
import {GridColDef, GridRenderCellParams, GridTreeNodeWithRender } from '@mui/x-data-grid';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CancelIcon from '@mui/icons-material/Cancel';
import api from './axios';
import getUserEmail from './getUserEmail';

export const friendsCol: GridColDef[] = [
    { field: 'id', headerName: 'Email', width: 380},
];

export const scheduler: GridColDef[] = [
    {field: 'id', headerName: 'Friend', width: 300},
    {field: 'date', headerName: 'Date', width: 290},
    {field: 'button', headerName: 'Start Game'}
];

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