import { useState } from 'react'
import { Box, Button, IconButton, Paper, Grid, ListItem, ListItemText, TextField, Dialog } from '@mui/material';
import axios from 'axios';
import moment from 'moment';
import Draggable from 'react-draggable';
import DetailService from './DetailService';
import InfoIcon from '@mui/icons-material/Info';

const feedbackapi = axios.create({
    baseURL: 'http://localhost:83'
})

const attendanceapi = axios.create({
    baseURL: 'http://localhost:84'
})

function PaperComponent(props) {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
    );
}

const MyServiceRequests = (props) => {
    const servicedate = moment(props.servicerequest.service.startdate).format('DD/MM/yyyy HH:mm');
    const now = moment(new Date()).format('DD/MM/yyyy HH:mm');

    const [serviceInfoOpen, setServiceInfoOpen] = useState(false);
    const [cancelled, setCancelled] = useState(false);

    const handleComplete = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const body = {
            serviceid: props.servicerequest.serviceid,
            userid: props.servicerequest.userid,
            comment: data.get('comment'),
            rate: data.get('rate'),
            isgivenbyprovider: false,
            provideruserid: props.servicerequest.service.provideruserid,
            duration: props.servicerequest.service.duration
        }

        createFeedback(body);
    };

    const setCancelledFalse = () => {
        setCancelled(false);
    }

    const handleCancel = () => {
        const body = {
            requestid: props.servicerequest.id,
            userid: props.servicerequest.userid,
            duration: props.servicerequest.service.duration
        }

        cancelRequest(body);
    };

    const handleClickServiceInfoOpen = () => {
        setServiceInfoOpen(true);
    };

    const handleClickServiceInfoClose = () => {
        setServiceInfoOpen(false);
    };

    const createFeedback = (body) => {
        try {
            feedbackapi.put('/create', body)
                .then(
                    (response) => {
                        if (response.status == 200) {
                            console.log(response)
                        }
                        else {
                            console.log(response)
                        }
                    })
                .catch(error => {
                    console.log(error)
                });
        } catch (error) {
            console.log(error)
        }
    };

    const cancelRequest = (body) => {
        try {
            attendanceapi.put('/cancelservicerequest', body)
                .then(
                    (response) => {
                        if (response.status == 200) {
                            console.log(response)
                            setCancelled(true)
                        }
                        else {
                            console.log(response)
                        }
                    })
                .catch(error => {
                    console.log(error)
                });
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <Grid container item lg={16}>
            <ListItem>
                <IconButton onClick={handleClickServiceInfoOpen}>
                    <InfoIcon />
                </IconButton>
                <Grid container item lg={4}>
                    <ListItemText
                        primary={props.servicerequest.service.name}
                    />
                </Grid>
                {props.servicerequest.isapproved & servicedate <= now ?
                    <Grid container item lg={12}>
                        <Box component="form" noValidate onSubmit={handleComplete}>
                            <Grid container item spacing={1} lg={16}>
                                <Grid item lg={4}>
                                    <TextField
                                        id="rate"
                                        name="rate"
                                        label="Feedback (Max 5)"
                                        type="number"
                                        InputLabelProps={{
                                            min: 0,
                                            max: 5,
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item lg={7}>
                                    <TextField
                                        name="comment"
                                        required
                                        fullWidth
                                        id="comment"
                                        label="Comment"
                                    />
                                </Grid>
                                <Grid item lg={5}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        style={{ backgroundColor: "darkslategray" }}
                                    >
                                        Give Feedback
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box> </Grid> : !props.servicerequest.isapproved && props.servicerequest.isanswered ?
                        <Button
                            variant="contained"
                            style={{ backgroundColor: "pink", width: '30%' }}
                            disabled
                        >
                            Declined by Provider
                        </Button> : cancelled ?
                            <Button
                                variant="contained"
                                style={{ backgroundColor: "gray", width: '30%', color: "darkgray" }}
                                disabled
                            >
                                Cancelled
                            </Button> :
                            <Button
                                variant="contained"
                                style={{ backgroundColor: "gray", width: '30%' }}
                                onClick={handleCancel}
                            >
                                Cancel Request
                            </Button>
                }
                <Dialog
                    open={serviceInfoOpen}
                    onClose={handleClickServiceInfoClose}
                    PaperComponent={PaperComponent}
                    aria-labelledby="draggable-dialog-title"
                >
                    <DetailService service={props.servicerequest.service} userid={props.userid} iscancelled={cancelled} setCancelledFalse={setCancelledFalse}/>
                </Dialog>
            </ListItem>
        </Grid>
    );
}

export default MyServiceRequests;