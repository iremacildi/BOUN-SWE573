import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Copyright from './Copyright';
import { IconButton, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const userapi = axios.create({
    baseURL: 'http://localhost',
    withCredentials: true
})

userapi.interceptors.request.use(
    function (config) {
        config.headers.withCredentials = true;
        return config
    },
    function (err) {
        return Promise.reject(err)
    }
)

export default function FormLogin() {
    let navigate = useNavigate();

    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const body = {
            email: data.get('email'),
            password: data.get('password')
        }

        loginUser(body);
    };

    const loginUser = (body) => {

        try {
            userapi.post('/login', body)
                .then(
                    (response) => {
                        if (response.status == 200) {
                            setMessage("Welcome!")
                            setOpen(true)
                            console.log(response)
                            navigate("../", { replace: true });
                        }
                        else {
                            setMessage("Something happened. Could you please try again?")
                            setOpen(true)
                            console.log(response)
                        }
                    })
                .catch(error => {
                    setMessage("Something happened. Could you please try again?")
                    setOpen(true)
                    console.log(error)
                });
        } catch (error) {
            setMessage("Something happened. Could you please try again?")
            setOpen(true)
            console.log(error)
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
                sx={{
                    my: 8,
                    mx: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'darkslategray' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Log in
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        style={{ backgroundColor: "darkslategray" }}
                    >
                        Log In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link href="../signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={message}
                action={action}
            />
        </Grid>
    );
}