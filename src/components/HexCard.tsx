import { Card, CardContent, Typography, Box } from '@mui/material';

interface HexCardProps {
  number?: number;
}

export default function HexCard({ number }: HexCardProps) {
  return (
    <Card
      sx={{
        width: 150,
        height: 180,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: 3,
      }}
    >
      <CardContent>
        <Box
          sx={{
            width: 80,
            height: 70,
            background: '#1976d2',
            clipPath: 'polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
          }}
        >
          {number !== undefined && (
            <Typography
              variant="h6"
              color="white"
              fontWeight="bold"
              sx={{ userSelect: 'none' }}
            >
              {number}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
