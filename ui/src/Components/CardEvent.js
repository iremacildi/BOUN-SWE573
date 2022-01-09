import { useState } from 'react'
import { Card, CardHeader, Avatar, IconButton, CardMedia, CardContent, Typography, CardActions } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import DetailEvent from './DetailEvent';
import Dialog from '@mui/material/Dialog';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import moment from 'moment';
import cinema from '../img/cinema.jpeg'
import foodmarket from '../img/foodmarket.JPG'
import picnic from '../img/picnic.jpg'

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

const CardEvent = (props) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="card-event" style={{ maxWidth: '350px' }}>
            <Card className="card">
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: 'darkslategray' }} aria-label="recipe">
                            {props.event.organizerusername.substr(0, 1)}
                        </Avatar>
                    }
                    title={props.event.name}
                    subheader={moment(props.event.startdate).format('DD/MM/yyyy HH:mm') + ' - ' + props.event.duration + ' hours'}
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={props.event.pictureurl == 'picnic' ? picnic :
                        props.event.pictureurl == 'cinema' ? cinema :
                            props.event.pictureurl == 'foodmarket' ? foodmarket : null}
                    alt="event-image"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {props.event.location}
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
                    <DetailEvent event={props.event} />
                </Dialog>
            </Card>
        </div>
    )
}

export default CardEvent;