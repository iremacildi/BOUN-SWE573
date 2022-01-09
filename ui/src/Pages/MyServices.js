import { useEffect, useState, Fragment } from 'react'
import { Accordion, AccordionDetails, Button, AccordionSummary, Grid, Paper, Typography, ListItem, ListItemText, Divider, List } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Header from '../Components/Header';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import MyServicesListItem from '../Components/MyServicesListItem';
import MyServiceRequests from '../Components/MyServiceRequests';

const serviceapi = axios.create({
    baseURL: 'http://localhost:81'
})

const attendanceapi = axios.create({
    baseURL: 'http://localhost:84'
})

const MyServices = () => {
    const [myServicesProvided, setMyServicesProvided] = useState(null);
    const [myServicesAttended, setMyServicesAttended] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        getMyServicesProvided(location.state.id);
        getMyServicesAttended(location.state.id);
    }, []);

    const providedServices = () => {
        if (myServicesProvided != null) {
            return (
                myServicesProvided.map((service) =>
                    <MyServicesListItem service={service} />
                ));
        }
    }

    const attendedServices = () => {
        if (myServicesAttended != null) {
            return (
                myServicesAttended.map((servicerequest) =>
                    <MyServiceRequests servicerequest={servicerequest} />
                ));
        }
    }

    const getMyServicesProvided = (id) => {
        try {
            serviceapi.get('/getservices?providerid=' + id)
                .then(
                    (response) => {
                        if (response.status == 200) {
                            setMyServicesProvided(response.data)
                        }
                        else {
                            setMyServicesProvided(null)
                            console.log(response)
                        }
                    })
                .catch(error => {
                    setMyServicesProvided(null)
                    console.log(error)
                });
        } catch (error) {
            setMyServicesProvided(null)
            console.log(error)
        } finally {
            setLoading(false)
        }
    };

    const getMyServicesAttended = (id) => {
        try {
            attendanceapi.get('/usersrequests?userid=' + id)
                .then(
                    (response) => {
                        if (response.status == 200) {
                            setMyServicesAttended(response.data)
                        }
                        else {
                            setMyServicesAttended(null)
                            console.log(response)
                        }
                    })
                .catch(error => {
                    setMyServicesAttended(null)
                    console.log(error)
                });
        } catch (error) {
            setMyServicesAttended(null)
            console.log(error)
        } finally {
            setLoading(false)
        }
    };

    if (loading)
        return <div />

    return (
        <Grid container spacing={2} columns={16} className="Home" direction="row" alignItems="center">
            <Grid container item>
                <Header userInfo={location.state} />
            </Grid>
            <Grid container item lg={16} justifyContent="center" alignItems="center">
                <Grid item lg={15}>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>My Services (Provider)</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={3} columns={16} direction="row">
                                <Grid container item xs={16}>
                                    <List sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}>
                                        {providedServices()}
                                    </List>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </Grid>
            <Grid container item lg={16} justifyContent="center" alignItems="center">
                <Grid item lg={15}>
                    <Accordion >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>My Services (Attendee)</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container item spacing={2} lg={16} justifyContent="center">
                                {attendedServices()}
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default MyServices;