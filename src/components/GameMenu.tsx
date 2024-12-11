import { useState } from "react";
import { AppBar, Box, Button, Container, Icon, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useRouter } from "next/navigation";

export default function GameMenu() {
  const router = useRouter();
    const [userInfoIsOpen, setUserInfoIsOpen] = useState(false);
  
    const pages = ['games', 'scoreboard', 'chat', 'scheduler', 'shop'];
    const settings = ['About', 'Logout'];
    return (
        <AppBar position="static" style={{marginLeft: '25%', marginTop: 20, width: '50%'}}>
          <Container>
            <Toolbar>
              <Box sx={{ flexGrow: 1, display: { md: 'flex' }}}>
                {pages.map((page) => (
                  <Button
                    key={page}
                    onClick={() => router.push(`/${page}` + (page == 'games' ? '_hub' : ''))}
                    sx={{ml: 2, my: 1, color: 'white', display: 'block'}}
                  >
                    {page}
                  </Button>
                ))}
              </Box>
              <Box>
                <Tooltip title="User info">
                  <IconButton onClick={() => setUserInfoIsOpen(true)} sx={{ p: 0 }}>
                    <AccountCircleIcon style={{color: 'white'}}/>
                  </IconButton>
                </Tooltip>
                <Menu
                  style={{marginLeft: '72%', marginTop: -30}}
                  open={userInfoIsOpen}
                  onClose={() => setUserInfoIsOpen(false)}
                >
                  <MenuItem onClick={() => {
                      setUserInfoIsOpen(false);
                      router.push("/user_info")
                    }}>
                      <Typography sx={{ textAlign: 'center' }}>About</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => {
                      setUserInfoIsOpen(false);
                      router.push("/login");
                      localStorage.removeItem("sessionData");
                    }}>
                      <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      );
}