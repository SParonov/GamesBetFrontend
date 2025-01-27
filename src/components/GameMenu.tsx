import { AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useRouter } from "next/navigation";
import LogoutButton from "./LogoutButton";

export default function GameMenu({current}: {current: string}) {
  const router = useRouter();

  const pages = ['games', 'scoreboard', 'chat', 'activities', 'shop', 'scheduler'];
  return <>
      <AppBar position="static" style={{marginLeft: '25%', marginTop: 20, width: '50%'}}>
        <Container>
          <Toolbar>
            <Box sx={{ flexGrow: 1, display: { md: 'flex' }}}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => router.push(`/${page}` + (page == 'games' ? '_hub' : ''))}
                  sx={{ml: 2, my: 1, color: 'white', display: 'block', borderBottom: page == current ? 2 : 0}}
                >
                  {page}
                </Button>
              ))}
            </Box>
            <Box>
              <Tooltip title="User info">
                <IconButton onClick={() => router.push("/user_info")} sx={{ p: 0 }}>
                  <AccountCircleIcon style={{color: 'white'}}/>
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <LogoutButton />
  </>
}