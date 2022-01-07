import { useState, useEffect, Fragment } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { IconButton, Tooltip, Snackbar } from '@mui/material';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Header from '../Components/Header';
import { DateTimePicker } from '@mui/lab';
import CloseIcon from '@mui/icons-material/Close';
import moment from 'moment';

const userapi = axios.create({
    baseURL: 'http://localhost',
    withCredentials: true
})

const serviceapi = axios.create({
    baseURL: 'http://localhost:81'
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

serviceapi.interceptors.request.use(
    function (config) {
        config.headers.withCredentials = true;
        return config
    },
    function (err) {
        return Promise.reject(err)
    }
)

export default function EditService() {
    const [date, setDate] = useState(new Date());
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState(true);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const location = useLocation();

    const handleDateChange = (newDate) => {
        setDate(newDate);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        moment.locale('en');

        const body = {
            servicename: data.get('serviceName'),
            description: data.get('description'),
            startdate:  moment(date).format('MM-DD-yyyy HH:mm'),
            duration: data.get('duration'),
            capacity: data.get('capacity'),
            provideruserid: userInfo.id,
            pictureurl: 'pictureurl',
            location: 'location'
        }

        console.log(body)

        createService(body);
    };

    const createService = (body) => {
        try {
            serviceapi.put('/create', body)
                .then(
                    (response) => {
                        if (response.status == 200) {
                            setMessage("Your service has been created. Great!")
                            setOpen(true)
                            console.log(response)
                            // navigate("../myservices", { replace: true }); myservices'a veya servicedetail'a yönlendirebilir
                        }
                        else {
                            setMessage("So sorry, we couldn't create your service. Could you please try again.")
                            setOpen(true)
                            console.log(response)
                        }
                    })
                .catch(error => {
                    setMessage("So sorry, we couldn't create your service. Could you please try again.")
                    setOpen(true)
                    console.log(error)
                });
        } catch (error) {
            setMessage("So sorry, we couldn't create your service. Could you please try again.")
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
        <Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </Fragment>
    );

    useEffect(() => {
        getUserInfo();
    }, []);

    const getUserInfo = async () => {
        try {
            await userapi.get('/verify')
                .then(
                    (response) => {
                        if (response.status == 200) {
                            setUserInfo(response.data)
                        }
                        else {
                            setUserInfo(null)
                            console.log(response)
                        }
                    })
                .catch(error => {
                    setUserInfo(null)
                    console.log(error)
                });
        } catch (error) {
            setUserInfo(null)
            console.log(error)
        } finally {
            setLoading(false)
        }
    };

    if (loading)
        return <div />

    return (
        <Grid container spacing={2} columns={12} className="Home" direction="row" alignItems="center">
            <Grid container item>
                <Header userInfo={userInfo} />
            </Grid>
            <Grid item lg={12}>
                <Container component="main" maxWidth="xs">
                    <Box
                        sx={{
                            marginTop: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'darkslategray' }}>
                            <RoomServiceIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            {location.state.serviceId == 0 ? 'Add Service' : 'Edit Service'}
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid container item xs={12} spacing={1} direction="row" justifyContent="space-between" alignItems="center">
                                    <Grid item xs={10}>
                                        <TextField
                                            name="serviceName"
                                            required
                                            fullWidth
                                            id="serviceName"
                                            label="Service Name"
                                            autoFocus
                                        />
                                    </Grid>
                                    <Grid container item xs={2} justifyContent="flex-end" alignItems="center">
                                        <Tooltip title="Upload Cover Photo">
                                            <IconButton style={{ backgroundColor: 'darkslategray' }}>
                                                <UploadFileIcon style={{ color: 'white', fontSize: '30px' }} />
                                            </IconButton>
                                        </Tooltip>
                                    </Grid>
                                </Grid>
                                <Grid container item xs={12} spacing={1} direction="row" justifyContent="space-between" alignItems="center">
                                    <Grid item xs={12}>
                                        <TextField
                                            id="description"
                                            label="Description"
                                            name="description"
                                            multiline
                                            fullWidth
                                            required
                                            rows={4}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DateTimePicker
                                            name="startdate"
                                            id="startdate"
                                            label="Service Date"
                                            inputFormat="dd/MM/yyyy HH:mm"
                                            value={date}
                                            onChange={handleDateChange}
                                            renderInput={(params) => <TextField {...params} fullWidth />}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid container item xs={12} spacing={1} direction="row" justifyContent="space-between" alignItems="center">
                                    <Grid item xs={6}>
                                        <TextField
                                            id="duration"
                                            name="duration"
                                            label="Duration (Hours)"
                                            fullWidth
                                            type="number"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            id="capacity"
                                            name="capacity"
                                            label="Attendance Capacity"
                                            fullWidth
                                            type="number"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                style={{ backgroundColor: "darkslategray" }}
                            >
                                Save Service
                            </Button>
                        </Box>
                    </Box>
                    <Snackbar
                        open={open}
                        autoHideDuration={6000}
                        onClose={handleClose}
                        message={message}
                        action={action}
                    />
                </Container>
            </Grid>
        </Grid>
    );
}