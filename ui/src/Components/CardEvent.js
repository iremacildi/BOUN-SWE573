import { useState } from 'react'
import { Card, CardHeader, Avatar, IconButton, CardMedia, CardContent, Typography, CardActions } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import InfoIcon from '@mui/icons-material/Info';
import { red } from '@mui/material/colors';
import picnic from '../img/picnic.jpg'
import DetailEvent from './DetailEvent';
import Dialog from '@mui/material/Dialog';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import moment from 'moment';

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
        <div className="card-event" style={{maxWidth:'350px'}}>
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
                    image={picnic}
                    alt="event-image"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        Location: Istanbul<br/><br/>
                        {props.event.description}
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
                    <DetailEvent />
                </Dialog>
            </Card>
        </div>
    )
}

export default CardEvent;