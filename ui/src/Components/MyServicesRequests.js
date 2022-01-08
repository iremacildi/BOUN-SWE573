import { useEffect, useState, Fragment } from 'react'
import { Accordion, AccordionDetails, Button, AccordionSummary, Grid, Paper, Typography, ListItem, ListItemText, Divider, List } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Header from '../Components/Header';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import MyServicesListItem from '../Components/MyServicesListItem';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const attendanceapi = axios.create({
    baseURL: 'http://localhost:84'
})

const MyServicesRequests = (props) => {
    const [serviceRequests, setServiceRequests] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isApproved, setIsApproved] = useState(props.service.isapproved)

    useEffect(() => {
        getRequests(props.service.id);
    }, []);

    const getRequests = (id) => {
        try {
            attendanceapi.get('/servicesrequests?serviceid=' + id)
                .then(
                    (response) => {
                        if (response.status == 200) {
                            setServiceRequests(response.data)
                        }
                        else {
                            setServiceRequests(null)
                            console.log(response)
                        }
                    })
                .catch(error => {
                    setServiceRequests(null)
                    console.log(error)
                });
        } catch (error) {
            setServiceRequests(null)
            console.log(error)
        } finally {
            setLoading(false)
        }
    };

    const sendRequestAnswer = (body) => {
        try {
            attendanceapi.post('/answerrequest', body)
                .then(
                    (response) => {
                        if (response.status == 200) {
                            console.log(response)
                            setIsApproved(body.isapproved)
                        }
                        else {
                            console.log(body.isapproved)
                        }
                    })
                .catch(error => {
                    console.log(error)
                });
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    };

    const handleApprove = (event) => {
        event.preventDefault();
        const id = event.target.id;

        const body = {
            servicerequestid: id,
            isapproved: true
        }

        sendRequestAnswer(body);
    };

    const handleDecline = (event) => {
        event.preventDefault();
        const id = event.target.id;

        const body = {
            servicerequestid: id,
            isapproved: false
        }

        sendRequestAnswer(body);
    };

    const myServiceRequests = () => {
        if (serviceRequests != null) {
            return (
                serviceRequests.map((serviceRequest) =>
                    <ListItem alignItems="flex-center">
                        <Grid container item spacing={2} lg={6}>
                            <Grid item lg={3}>
                                {isApproved ? <ThumbUpIcon style={{ color: 'green' }} /> :
                                    <ThumbDownIcon style={{ color: 'gray' }} />}
                            </Grid>
                            <Grid item lg={9}>
                                <ListItemText
                                    primary={serviceRequest.username}
                                    secondary={
                                        <Fragment>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                {serviceRequest.isapproved}
                                            </Typography>
                                            {/* {" — " + props.service.location} */}
                                        </Fragment>
                                    }
                                />
                            </Grid>
                        </Grid>
                        <Grid container item spacing={2} lg={12}>
                            <Grid item lg={6}>
                                <Button
                                    variant="contained"
                                    style={{ backgroundColor: "darkslategray" }}
                                    id={serviceRequest.id}
                                    onClick={handleApprove}
                                >
                                    Approve
                                </Button>
                            </Grid>
                            <Grid item lg={6}>
                                <Button
                                    variant="contained"
                                    style={{ backgroundColor: "gray" }}
                                    id={serviceRequest.id}
                                    onClick={handleDecline}
                                >
                                    Decline
                                </Button>
                            </Grid>
                        </Grid>
                    </ListItem>
                ));
        }
    }

    if (loading)
        return <div />

    return (
        <Grid container columns={16} style={{ width: '600px', height: '500px', padding: '32px' }}>
            <Grid item lg={16}>
                {props.service.name}
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    {myServiceRequests()}
                </List>
            </Grid>
        </Grid>
    );
}

export default MyServicesRequests;