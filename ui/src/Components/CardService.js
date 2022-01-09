import { useState } from 'react'
import { Card, CardHeader, Avatar, IconButton, CardMedia, CardContent, Typography, CardActions } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
// import plants from '../img/plants.jpg'
import DetailService from './DetailService';
import Dialog from '@mui/material/Dialog';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import moment from 'moment';
import cinema from '../img/cinema.jpeg'
import foodmarket from '../img/foodmarket.JPG'
import picnic from '../img/picnic.jpg'
import plants from '../img/plants.jpg'
import forestimage from '../img/forestimage.jpg'
import historical from '../img/historical.jpg'
import rembrandt from '../img/rembrandt.jpg'
import cappadocia from '../img/cappadocia.jpg'
import tea from '../img/tea.jpg'

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

const CardService = (props) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="card-service" style={{ maxWidth: '350px' }}>
            <Card className="card">
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: 'darkslategray' }}>
                            {props.service.providerusername.substr(0, 1)}
                        </Avatar>
                    }
                    title={props.service.name}
                    subheader={moment(props.service.startdate).format('DD/MM/yyyy HH:mm') + ' - ' + props.service.duration + ' hours'}
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={props.service.pictureurl == 'plants' ? plants:
                props.service.pictureurl == 'rembrandt' ? rembrandt : 
                props.service.pictureurl == 'cappadocia' ? cappadocia :
                props.service.pictureurl == 'forestimage' ? forestimage :
                props.service.pictureurl == 'historical' ? historical : 
                props.service.pictureurl == 'tea' ? tea : null}
                    alt="service-image"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        Location: Istanbul
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton onClick={handleClickOpen}>
                        <InfoIcon />
                    </IconButton>
                </CardActions>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    PaperComponent={PaperComponent}
                    aria-labelledby="draggable-dialog-title"
                >
                    <DetailService service={props.service} userid={props.userid}/>
                </Dialog>
            </Card>
        </div>
    )
}

export default CardService;