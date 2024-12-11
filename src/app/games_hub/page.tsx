"use client"
import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppBar, Box, Button, Container, Icon, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

type sessionData = {
    CreatedAt: string,
    ExpiresAt: string,
    ID: string,
    UserEmail: string
}

export default function GamesHub() {
    const router = useRouter();
    useEffect(() => {
        const sessionData = localStorage.getItem("sessionData");
        if (!sessionData) {
            alert("Не съществува сесия, моля първо се логнете (или регистрирайте)");
            router.push("/login");
        } else {
            const parsedSessionData: sessionData = JSON.parse(sessionData!);
            if (Date.parse(parsedSessionData.ExpiresAt) <= Date.now()) {
                alert("Сесията Ви е изтекла, за да продължите, моля логнете се отново");
                router.push("/login");
            }
        }
    }, [])


    const [userInfoIsOpen, setUserInfoIsOpen] = React.useState<null | HTMLElement>(null);
  
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
      setUserInfoIsOpen(event.currentTarget);
    };
  
    const handleCloseUserMenu = () => {
      setUserInfoIsOpen(null);
    };

    const pages = ['scoreboard', 'shop', 'scheduler', 'chat'];
    const settings = ['User Info', 'Logout'];
    return (
        <AppBar position="static">
          <Container maxWidth = "sm">
            <Toolbar>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                  <Button
                    key={page}
                    onClick={() => router.push(`/${page}`)}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {page}
                  </Button>
                ))}
              </Box>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="User info">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <AccountCircleIcon style={{color: 'white'}}/>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt:'40px', ml:'40px'}}
                  id="menu-appbar"
                  anchorEl={userInfoIsOpen}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(userInfoIsOpen)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      );
}