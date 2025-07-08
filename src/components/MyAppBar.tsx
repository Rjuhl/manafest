import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button';
import { blue } from '@mui/material/colors';
import { useSessionData } from '@context/SessionDataContext';
import { useState, useEffect } from 'react';
import socket from '@util/socket'

export default function MyAppBar() {
    const { sessionData, setSessionValue, clearSessionData } = useSessionData();

    const handleLeaveRoom = (e: React.FormEvent) => {
        e.preventDefault();
        socket.emit('leave-game');
        setSessionValue('roomId', undefined);
    }

    const handleLogOut = (e: React.FormEvent) => {
        e.preventDefault();
        if (sessionData.roomId !== undefined || sessionData.roomId !== "") {
            socket.emit('leave-game');
        }
        clearSessionData();
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="fixed"
                elevation={0} // remove drop shadow
                sx={{
                backgroundColor: blue[50],
                border: '2px solid #1976d2',
                color: '#1976d2',
                }}
            >
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
                        Manafest
                    </Typography>
                    <Stack direction="row" spacing={2} alignItems="center">
                        {sessionData.roomId &&
                           <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
                                Room: {sessionData.roomId}
                            </Typography>
                        }

                        {sessionData.roomId && 
                            <Button variant="outlined" color="error" onClick={handleLeaveRoom}> Leave Room </Button>
                        }

                        {sessionData.username && 
                            <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
                                Username: {sessionData.username}
                            </Typography>
                        }
                        {sessionData.username && 
                            <Button variant="outlined" color="error" onClick={handleLogOut}> Log out </Button>
                        }
                    </Stack>
                </Toolbar>
            </AppBar>
        </Box>
    )
}