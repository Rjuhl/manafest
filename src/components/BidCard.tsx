import { Paper, Typography, Button, Box } from '@mui/material';
import Divider from '@mui/material/Divider';
import type NewUserReponse from '@interface/NewUserReponse'
import { emitWithAck } from '@util/SocketHelpers'
import { useState } from 'react';

interface BidCardProps {
    maxBid: number
}

const BidCard: React.FC<BidCardProps> = ({ maxBid }) => { 
    const [bid, setBid] = useState(0);
    const [bidMade, setBidMade] = useState(false);

    const handleBid = (change: number) => {
        let new_bid = bid + change;
        if (new_bid < 0) new_bid = 0;
        if (new_bid > maxBid) new_bid = maxBid;
        setBid(new_bid);
    }

    const submitBid = async () => {
        const response = await emitWithAck<NewUserReponse>('bid', { bid: bid });
        if (response.status === 200) {
            setBidMade(true);
        }
    }

    return (
    <Paper
        elevation={6}
        sx={{
        width: 300,
        padding: 4,
        borderRadius: 4,
        textAlign: 'center',
        backgroundColor: '#f9f9f9',
        }}
    >
        <Typography variant="h2" fontWeight={700} gutterBottom>
            { bidMade ? "bid sent" : bid}
        </Typography>

        <Box display="flex" flexWrap="wrap" gap={1} justifyContent="center">
            <Button disabled={bidMade} variant="contained" color="success" onClick={() => handleBid(10)}>
            +10
            </Button>
            <Button disabled={bidMade} variant="contained" color="success" onClick={() => handleBid(1)}>
            +1
            </Button>
            <Button disabled={bidMade} variant="contained" color="error" onClick={() => handleBid(-10)}>
            -10
            </Button>
            <Button disabled={bidMade} variant="contained" color="error" onClick={() => handleBid(-1)}>
            -1
            </Button>
        </Box>
        <Divider flexItem variant="middle" sx={{p: 1}} />
        <Box sx={{p:1}}>
            <Button disabled={bidMade} variant='outlined' onClick={submitBid} fullWidth> Confirm bid </Button>
        </Box>
    </Paper>
    );
};

export default BidCard;
