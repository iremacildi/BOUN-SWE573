import { useState } from 'react'
import { Card, CardHeader, Avatar, IconButton, CardMedia, CardContent, Typography, CardActions } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import InfoIcon from '@mui/icons-material/Info';
import { red } from '@mui/material/colors';
import plants from '../img/plants.jpg'
import DetailService from './DetailService';
import Dialog from '@mui/material/Dialog';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';

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
        <div className="card-service" style={{maxWidth:'350px'}}>
            <Card className="card">
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            IA
                        </Avatar>
                    }
                    title="Houseplant Care Tips Sharing"
                    subheader="April 28, 2022 02:00 PM - 2 hours"
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={plants}
                    alt="Paella dish"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        Location: Kadikoy, Istanbul<br/><br/>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse feugiat turpis sem, ut egestas neque vehicula ut.
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
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
                    <DetailService />
                </Dialog>
            </Card>
        </div>
    )
}

export default CardService;