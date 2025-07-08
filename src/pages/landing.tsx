import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import type NewUserReponse from '@interface/NewUserReponse'
import { useState } from 'react';
import { useSessionData } from '@context/SessionDataContext';
import { emitWithAck } from '@util/SocketHelpers'
import PageRouterHook from "@hook/page_router";
import generateUniqueId from '@util/generateids';

export default function Landing() {
    const { sessionData, setSessionValue } = useSessionData();
    const [displayName, setDisplayName] = useState('');
    const [gameId, setGameId] = useState('');
    const [error, setError] = useState<string | null | undefined>(null);

    PageRouterHook('landing');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const name = displayName.trim()
        try {
            const response = await emitWithAck<NewUserReponse>('new-user', { name });
            if (!name) {
                setError('Display name is required');
            } else if (name.length > 16) {
                setError('Must be less than or equal to 16 characters');
            } else {
                if (response.status !== 200) {
                    setError(response.message);
                } else {
                    setError(null);
                    setSessionValue('username', name);
                }
            }
        } catch (err: any) {
            setError('Server side error');
        }
       
    };

    const handleCreateGame = async (e: React.FormEvent) => {
        e.preventDefault();
        const roomId = generateUniqueId();
        console.log("create game clicked")
        const response = await emitWithAck<NewUserReponse>('create-game', { gameId: roomId });
        console.log(response);
        if (response.status !== 200) {
            setError(response.message)
        } else {
            setSessionValue('roomId', roomId);
            setError(null);
        }
    }

    const handleJoinGame = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await emitWithAck<NewUserReponse>('join-game', { gameId: gameId });
        if (response.status !== 200) {
            setError(response.message);
        } else {
            setSessionValue('roomId', gameId);
            setError(null);
        }
    }

    const joinGameUI = () => (
        <Box key="joinGameUI" maxWidth={400} width="100%">
            <Stack spacing={2}>
                <TextField 
                    label="Game code" 
                    onChange={(e) => setGameId(e.target.value)} 
                    variant="standard" 
                    fullWidth 
                    error={!!error}
                    helperText={error || ' '}
                />
                <Button variant="contained" size="large" onClick={handleJoinGame} fullWidth> Join Game </Button>
                <Button variant="outlined" size="large" onClick={handleCreateGame} fullWidth> Create Game </Button>
            </Stack>
        </Box>
    );

  const loginUI = () => (
    <Box key="loginUI" maxWidth={400} width="100%">
        <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
                <TextField
                    label="Display name"
                    variant="standard"
                    fullWidth
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    error={!!error}
                    helperText={error || ' '}
                />
                <Button type="submit" variant="contained" size="large" fullWidth> Continue </Button>
            </Stack>
        </form>
    </Box>
  );

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      px={2}
    >   
        {sessionData.username === "" ? loginUI() : joinGameUI()}
    </Box>
  );
}
