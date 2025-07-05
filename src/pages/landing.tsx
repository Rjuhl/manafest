import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import { useSessionData } from '@context/SessionDataContext';

export default function Landing() {
    const { sessionData, setSessionValue, clearSessionData } = useSessionData();
    const [displayName, setDisplayName] = useState('');
    const [error, setError] = useState<string | null>(null);


    // useEffect(() => {

    //     return () => {
    //     };
    // }, [sessionData]);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Add check to make sure username is unique 
        if (!displayName.trim()) {
            setError('Display name is required');
        } else if (displayName.trim().length > 16) {
            setError('Must be less than or equal to 16 characters');
        } else {
            setError(null);
            setSessionValue('username', displayName.trim());
        }
    };

    const joinGameUI = () => (
        <Box key="joinGameUI" maxWidth={400} width="100%">
            <Stack spacing={2}>
                <TextField label="Game code" variant="standard" fullWidth />
                <Button variant="contained" size="large" fullWidth> Join Game </Button>
                <Button variant="outlined" size="large" fullWidth> Create Game </Button>
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

  console.log("usermame: ", sessionData.username)

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
