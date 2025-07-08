import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
} from '@mui/material';
import { Star, MonetizationOn } from '@mui/icons-material';
import type { PlayerData } from '@interface/GameData';

interface PlayerCardProps {
  player: PlayerData;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        position: 'relative',
        borderRadius: 3,
        borderColor: player.isAdmin ? 'primary.main' : 'grey.300',
        borderWidth: 2,
        backgroundColor: 'background.paper',
        boxShadow: 2,
        maxWidth: 320,
        minHeight: 140,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        px: 2,
        paddingTop: 2,
        paddingBottom: 0
      }}
    >
      {player.isAdmin && (
        <Chip
          label="Admin"
          icon={<Star fontSize="small" />}
          color="primary"
          size="small"
          sx={{
            position: 'absolute',
            top: 8,
            left: 8,
            zIndex: 1,
          }}
        />
      )}

      <CardContent sx={{ p: 0 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          {player.username}
        </Typography>

        <Stack direction="row" alignItems="center">
          <MonetizationOn color="warning" />
          <Typography variant="body1" fontWeight={500}>
            {player.gold} Gold
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default PlayerCard;
