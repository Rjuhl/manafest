import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Stack,
  Chip,
} from '@mui/material';
import { MonetizationOn, Star } from '@mui/icons-material';
import socket from '@util/socket';

interface ProfileCardProps {
  user: string;
  gold: number;
  isAdmin: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user, gold, isAdmin }) => {
  const [currentGold, setCurrentGold] = useState<number>(gold);

  const changeGold = (amount: number) => {
    socket.emit('add-gold', { gold: amount });
  };

  return (
    <Card
      sx={{
        maxWidth: 400,
        width: '80%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        p: 3,
        boxShadow: 4,
        border: '2px solid',
        borderColor: isAdmin ? 'primary.main' : 'grey.300',
        backgroundColor: 'background.paper',
      }}
    >
      {/* Top Section */}
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5" fontWeight={600}>
            {user}
          </Typography>
          {isAdmin && (
            <Chip
              label="Admin"
              icon={<Star fontSize="small" />}
              color="primary"
              size="small"
            />
          )}
        </Box>

        {/* Additional top content can go here if needed */}
      </Box>

      {/* Bottom Section */}
      <Box mt="auto" pt={2}>
        <Stack direction="row" alignItems="center" spacing={1} justifyContent="center" mb={2}>
          <MonetizationOn color="warning" />
          <Typography variant="h6" fontWeight={500}>
            {currentGold} Gold
          </Typography>
        </Stack>

        <Box display="flex" flexWrap="wrap" gap={1} justifyContent="center">
          <Button variant="contained" color="success" onClick={() => changeGold(10)}>
            +10
          </Button>
          <Button variant="contained" color="success" onClick={() => changeGold(1)}>
            +1
          </Button>
          <Button variant="contained" color="error" onClick={() => changeGold(-1)}>
            -1
          </Button>
          <Button variant="contained" color="error" onClick={() => changeGold(-10)}>
            -10
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default ProfileCard;
