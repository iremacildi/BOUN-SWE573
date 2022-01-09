import { useEffect, useState, Fragment } from 'react'
import { Accordion, AccordionDetails, Box, Button, AccordionSummary, Grid, Paper, Typography, ListItem, ListItemText, Dialog, Divider, List, TextField } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Header from '../Components/Header';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import MyServicesRequests from './MyServicesRequests';
import Draggable from 'react-draggable';
import moment from 'moment';
import { TextFieldsSharp } from '@mui/icons-material';

const feedbackapi = axios.create({
    baseURL: 'http://localhost:83'
})

const MyServiceRequests = (props) => {
    const servicedate = moment(props.servicerequest.isended).format('DD/MM/yyyy HH:mm');
    const now = moment(new Date()).format('DD/MM/yyyy HH:mm');

    const [open, setOpen] = useState(false);

    const handleComplete = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const body = {
            serviceid: props.servicerequest.serviceid,
            userid: props.servicerequest.userid,
            comment: data.get('comment'),
            rate: data.get('rate'),
            isgivenbyprovider: false,
            provideruserid: props.servicerequest.providerid,
            duration: props.servicerequest.serviceduration
        }

        createFeedback(body);
    };

    const handleCancel = () => {
        setOpen(false);
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

    return (
        <Grid container item lg={16}>
            <ListItem>
                <Grid container item lg={4}>
                    <ListItemText
                        primary={props.servicerequest.servicename}
                    />
                </Grid>
                {servicedate < now ?
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
                        </Box> </Grid> :
                    <Button
                        variant="contained"
                        style={{ backgroundColor: "gray", width: '30%' }}
                        onClick={handleCancel}
                    >
                        Cancel Request
                    </Button>
                }
            </ListItem>
        </Grid>
    );
}

export default MyServiceRequests;