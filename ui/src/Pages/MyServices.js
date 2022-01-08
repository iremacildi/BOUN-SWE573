import { useEffect, useState, Fragment } from 'react'
import { Accordion, AccordionDetails, Button, AccordionSummary, Grid, Paper, Typography, ListItem, ListItemText, Divider, List } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Header from '../Components/Header';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import MyServicesListItem from '../Components/MyServicesListItem';

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

    const getMyServicesAttended = () => {

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
                            <Typography>My Services (Provided)</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={3} columns={16} direction="row">
                                <Grid container item xs={16}>
                                    <List sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}>
                                        {providedServices()}
                                    </List>
                                </Grid>
                            </Grid>
                            {/* <Grid container item spacing={2} lg={16} justifyContent="center">
                                {serviceCards()}
                            </Grid> */}
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
                            <Typography>My Services (Attended)</Typography>
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