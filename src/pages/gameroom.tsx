import { Box, Button, Stack, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import PageRouterHook from '@hook/page_router';
import { useSessionData } from '@context/SessionDataContext';
import type { GameData } from '../interfaces/GameData';
import HexCard from '@component/HexCard';
import Divider from '@mui/material/Divider';
import PlayerCard from '@component/PlayerCard';
import Grid from '@mui/material/Grid';
import ProfileCard from '@component/ProfileCard';
import socket from '@util/socket';
import { emitWithAck } from '@util/SocketHelpers'
import type NewUserReponse from '@interface/NewUserReponse'
import BidCard from '@component/BidCard';


export default function GameRoom() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [bidding, setBidding] = useState(false);
  const { sessionData } = useSessionData();
  const [gameData, setGameData] = useState<GameData>({
    ledger: [],
    players: {},
    cards_left: 28,
    last_cards_drawn: []
  });

  
    PageRouterHook('game-room');

    useEffect(() => {
        if ((sessionData.username ?? '') in gameData.players) {
            if (gameData.players[(sessionData.username ?? '')].status === 0) setBidding(true); 
            if (gameData.players[(sessionData.username ?? '')].status === 2) setBidding(false);
        }
    }, [gameData])

    useEffect(() => {
        if ((sessionData.username ?? '') in gameData.players) console.log(gameData.players[(sessionData.username ?? '')].status);
        socket.on('game-update', (newGameData: {data: GameData }) => {
            setGameData(newGameData.data);
        })

        socket.on('bid-started', () => {
            setBidding(true);
        });

        socket.on('bid-finished', () => {
            setBidding(false);
        });

        socket.emit('get-game-info');

        const el = scrollRef.current
        if (el) el.scrollTop = el.scrollHeight

        console.log(gameData.players);
        if ((sessionData.username ?? '') in gameData.players) {
            console.log(gameData.players[(sessionData.username ?? '')].status);
        }

        return () => {
            socket.off('game-update');
        }
    }, [])



    const handleDrawCards = async (e: React.FormEvent, count: number) => {
        e.preventDefault();
        socket.emit('pick-hexs', { picks: count });
    }

    const handleBidding = async () => {
        const response = await emitWithAck<NewUserReponse>('start-bid', {});
        if (response.status == 200) {
            setBidding(true);
        }
    }

    return (
    <>
        {/* Main content under AppBar */}
        <Box
        display="flex"
        width="100vw"
        height="calc(100vh - 64px)"
        mt="64px"
        sx={{ overflow: 'hidden' }}
        >
        {/* Left column (3/4 width) */}
        <Box display="flex" flexDirection="column" flex={3} >
            <Box flex={2} display="flex" alignItems="center" pl={3}>
                <Stack spacing={2} direction="row" alignItems="center">
                    <HexCard number={gameData.cards_left} />
                    <Stack
                        justifyContent="space-between"
                        height={150} // adjust as needed to spread the buttons vertically
                    >
                        <Button variant="contained" onClick={(e) => handleDrawCards(e, 1)} fullWidth> Draw 1 </Button>
                        <Button variant="contained" onClick={(e) => handleDrawCards(e, 3)} fullWidth> Draw 3 </Button>
                        <Button variant="contained" onClick={(e) => handleDrawCards(e, 4)} fullWidth> Draw 4 </Button>
                    </Stack>
                </Stack>
                <Stack direction="row" spacing={3} pl={3}>
                    <Divider orientation="vertical" flexItem />
                    {gameData.last_cards_drawn.map((x, i) => (
                        <HexCard key={i} number={x} />
                    ))}
                </Stack>
            </Box>
            <Divider flexItem variant="middle" sx={{p: 1}} />
            <Box flex={6} display="flex" justifyContent="center" alignItems="center">
                <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" flex={1} height="60%" >
                    <ProfileCard 
                        key={`${sessionData.username ?? "?!UNK?!"}${gameData.players[(sessionData.username ?? '')]?.gold ?? 0}${gameData.players[(sessionData.username ?? '')]?.isAdmin ?? false}`}
                        user={sessionData.username ?? "?!UNK?!"}
                        gold={gameData.players[(sessionData.username ?? '')]?.gold ?? 0}
                        isAdmin={gameData.players[(sessionData.username ?? '')]?.isAdmin ?? false} 
                    />
                </Box>
                <Divider orientation="vertical" variant="middle" flexItem sx={{p:1}}/>
                <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" flex={2} p={2}>
                    <Grid container spacing={2}>
                        {
                            Object.keys(gameData.players)
                            .sort((a, b) => gameData.players[a].username.localeCompare(gameData.players[b].username))
                            .map((playerKey) => (
                                <Grid item xs={12} sm={6} md={4} key={playerKey} {...({} as any)}>
                                    <PlayerCard player={gameData.players[playerKey]} />
                                </Grid>
                            ))

                        }
                    </Grid>
                </Box>
            </Box>

            { (sessionData.username && gameData.players[sessionData.username]?.isAdmin) && 
                <>
                <Divider variant="middle" flexItem sx={{p: 1}} />
                <Box flex={1} display="flex" justifyContent="center" alignItems="center">
                    <Button onClick={handleBidding}variant="outlined" size="large" fullWidth> Start Bid </Button>
                </Box>
                </>
            }
        </Box>
        <Divider orientation="vertical"  variant="middle" flexItem sx={{p: 1}} />
        {/* Right sidebar (1/4 width, scrollable) */}
        <Box
            ref={scrollRef}
            flex={1}
            sx={{
            height: '98%',
            overflowY: 'scroll',
            p: 2,
            '&::-webkit-scrollbar': {
                width: '8px',
            },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#888',
                borderRadius: '4px',
            },
            '&::-webkit-scrollbar-track': {
                backgroundColor: '#f0f0f0',
            },
            }}
        >
            {gameData.ledger.map((line, i) => (
            <Typography key={i} color="text.secondary">{line}</Typography>
            ))}
        </Box>
        </Box>
        {
            bidding && 
            <div className="popup-overlay">
                <BidCard maxBid={gameData.players[(sessionData.username ?? '')]?.gold ?? 0}/>
            </div>
        }
    </>
    )
}
