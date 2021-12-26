import { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { IconButton, Tooltip } from '@mui/material';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import DatePicker from '@mui/lab/DatePicker';
import TimePicker from '@mui/lab/TimePicker';
import GoogleMaps from '../Components/Geolocation';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import moment from 'moment';

export default function EditService() {
    const [date, setDate] = useState(new Date());
    const [startTime, setStartTime] = useState(moment().hours(13).minute(0));
    const [endTime, setEndTime] = useState(moment().hours(14).minute(0));

    const handleDateChange = (newDate) => {
        setDate(newDate);
    };

    const handleStartTimeChange = (newStartTime) => {
        setStartTime(newStartTime);
    };

    const handleEndTimeChange = (newEndTime) => {
        setEndTime(newEndTime);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
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
                    <RoomServiceIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Add / Edit Service
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
                                    id="outlined-multiline-static"
                                    label="Description"
                                    multiline
                                    fullWidth
                                    required
                                    rows={4}
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <GoogleMaps fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="Service Date"
                                    inputFormat="dd/MM/yyyy"
                                    value={date}
                                    onChange={handleDateChange}
                                    renderInput={(params) => <TextField {...params} fullWidth />}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid container item xs={12} spacing={1} direction="row" justifyContent="space-between" alignItems="center">
                            <Grid item xs={6}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <TimePicker
                                        label="Start Time"
                                        value={startTime}
                                        onChange={handleStartTimeChange}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={6}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <TimePicker
                                        label="End Time"
                                        value={endTime}
                                        onChange={handleEndTimeChange}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="outlined-number"
                                label="Attendance Capacity"
                                fullWidth
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
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
                        Save Service
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}