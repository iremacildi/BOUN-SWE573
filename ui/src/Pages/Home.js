import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import CardEvent from '../Components/CardEvent';
import CardService from '../Components/CardService';

function Home() {
  
  const numbers = [1, 2, 3, 4, 5];
  const eventCards = numbers.map((number) =>
    <Grid item>
      <CardEvent />
    </Grid>
  );

  const serviceCards = numbers.map((number) =>
    <Grid item>
      <CardService />
    </Grid>
  );

  return (
    <Grid container spacing={2} columns={16} className="Home" direction="row" alignItems="center">
      <Grid container item>
        <Header />
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
                {serviceCards}
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
                {eventCards}
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
      <Grid container item>
        <Footer />
      </Grid>
    </Grid>
  );
}

export default Home;