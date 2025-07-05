import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'
import { blueGrey } from '@mui/material/colors'

export default function MyAppBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: blueGrey[500] }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
                        PyBlockAI
                    </Typography>

                    <Stack direction="row" spacing={1.5} alignItems="center">
                        <IconButton
                            aria-label="Create New"
                            onClick={() => console.log("Create new clicked")}
                            sx={{ color: blueGrey[50] }}
                        >
                            <AddIcon fontSize="medium" />
                        </IconButton>

                        <IconButton
                            aria-label="Inventory"
                            onClick={() => console.log("Inventory clicked")}
                            sx={{ color: blueGrey[50] }}
                        >
                            <Inventory2OutlinedIcon fontSize="medium" />
                        </IconButton>

                        <IconButton
                            aria-label="Profile"
                            onClick={() => console.log("Profile pic clicked")}
                            sx={{ p: 0 }}
                        >
                            <Avatar alt="User Avatar" src="" sx={{ width: 36, height: 36 }} />
                        </IconButton>
                    </Stack>
                </Toolbar>
            </AppBar>
        </Box>
    )
}