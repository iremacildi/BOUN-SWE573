import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Copyright from './Copyright';
import { IMaskInput } from 'react-imask';
import { PropTypes } from 'prop-types';
import { IconButton, Snackbar } from '@mui/material';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
        <IMaskInput
            {...other}
            mask="(#00) 000 00 00"
            definitions={{
                '#': /[1-9]/,
            }}
            inputRef={ref}
            onAccept={(value) => onChange({ target: { name: props.name, value } })}
            overwrite
        />
    );
});

TextMaskCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

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

export default function FormSignup() {
    let navigate = useNavigate();

    const [values, setValues] = React.useState({ phonenumber: '' });
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState('');

    const createUser = (body) => {
        try {
            userapi.put('/create', body)
                .then(
                    (response) => {
                        if (response.status == 200) {
                            setMessage("You signed up successfully! Hooray!")
                            setOpen(true)
                            console.log(response)
                            navigate("../login", { replace: true });
                        }
                        else {
                            setMessage("So sorry, we couldn't create your account :( Please try again.")
                            setOpen(true)
                            console.log(response)
                        }
                    })
                .catch(error => {
                    setMessage("So sorry, we couldn't create your account :( Please try again.")
                    setOpen(true)
                    console.log(error)
                });
        } catch (error) {
            setMessage("So sorry, we couldn't create your account :( Please try again.")
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

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const body = {
            name: data.get('firstName'),
            surname: data.get('lastName'),
            username: data.get('username'),
            email: data.get('email'),
            phonenumber: data.get('phonenumber'),
            profilepictureurl: 'url',
            password: data.get('password')
        }

        createUser(body);
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'darkslategray' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="family-name"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="username"
                                name="username"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="phonenumber"
                                required
                                fullWidth
                                id="phonenumber"
                                placeholder="(555) 555 55 55"
                                label="Phone Number"
                                InputProps={{
                                    inputComponent: TextMaskCustom,
                                    value: values.phonenumber,
                                    onChange: handleChange,
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        style={{ backgroundColor: "darkslategray" }}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="#" variant="body2">
                                Already have an account? Sign in
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
            <Copyright sx={{ mt: 5 }} />
        </Container>
    );
}