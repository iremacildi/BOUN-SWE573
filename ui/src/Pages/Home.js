import { useEffect, useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Header from '../Components/Header';
import CardEvent from '../Components/CardEvent';
import CardService from '../Components/CardService';
import axios from 'axios';

const userapi = axios.create({
  baseURL: 'http://localhost',
  withCredentials: true
})

const serviceapi = axios.create({
  baseURL: 'http://localhost:81'
})

const eventapi = axios.create({
  baseURL: 'http://localhost:82'
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

function Home() {
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [services, setServices] = useState(null);
  const [events, setEvents] = useState(null);

  useEffect(() => {
    getUserInfo();
    getAllServices();
    getAllEvents();
  }, []);
  
  const serviceCards = () => {
    if (services != null) {

      return (
        services.map((service) =>
          <Grid item>
            <CardService service={service} />
          </Grid>
        ));
    }
  }

  const eventCards = () => {
    if (events != null) {

      return (
        events.map((event) =>
          <Grid item>
            <CardEvent event={event} />
          </Grid>
        ));
    }
  }

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

  const getAllServices = () => {
    try {
      serviceapi.get('/getallservices')
        .then(
          (response) => {
            if (response.status == 200) {
              setServices(response.data)
            }
            else {
              setServices(null)
              console.log(response)
            }
          })
        .catch(error => {
          setServices(null)
          console.log(error)
        });
    } catch (error) {
      setServices(null)
      console.log(error)
    }
  };

  const getAllEvents = () => {
    try {
      eventapi.get('/getallevents')
        .then(
          (response) => {
            if (response.status == 200) {
              setEvents(response.data)
            }
            else {
              setEvents(null)
              console.log(response)
            }
          })
        .catch(error => {
          setEvents(null)
          console.log(error)
        });
    } catch (error) {
      setEvents(null)
      console.log(error)
    }
  };

  if (loading)
    return <div />

  return (
    <Grid container spacing={2} columns={16} className="Home" direction="row" alignItems="center">
      <Grid container item>
        <Header userInfo={userInfo} />
      </Grid>
      <Grid container item lg={16} justifyContent="center" alignItems="center">
        <Grid item lg={15}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Services</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container item spacing={2} lg={16} justifyContent="center">
                {serviceCards()}
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
              <Typography>Events</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container item spacing={2} lg={16} justifyContent="center">
                {eventCards()}
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Home;