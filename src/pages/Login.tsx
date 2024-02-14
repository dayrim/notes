import React, { useState } from 'react';
import { Button, TextField, Box, Paper, Typography, Grid } from '@mui/material';

interface LoginProps {
    onLogin: (email: string, password: string) => void;
    onRegister: (email: string, password: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin, onRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
            <Grid item sx={{ width: 400 }}>
                <Paper elevation={3} style={{ padding: '20px', margin: '20px' }}>
                    <Typography variant="h5" gutterBottom>
                        Login
                    </Typography>
                    <Box display="flex" flexDirection="column" gap={2}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button variant="contained" color="primary" onClick={() => onLogin(email, password)}>
                            Login
                        </Button>
                        <Button variant="contained" onClick={() => onRegister(email, password)}>
                            Register
                        </Button>
                    </Box>
                </Paper>
            </Grid></Grid>

    );
};
