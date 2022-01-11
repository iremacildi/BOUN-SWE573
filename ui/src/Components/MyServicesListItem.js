import { useState, Fragment } from 'react'
import { Button, IconButton, Paper, Typography, ListItem, ListItemText, Dialog } from '@mui/material';
import MyServicesRequests from './MyServicesRequests';
import Draggable from 'react-draggable';
import moment from 'moment';
import InfoIcon from '@mui/icons-material/Info';
import DetailService from './DetailService';

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

const MyServicesListItem = (props) => {
    const [open, setOpen] = useState(false);
    const [serviceInfoOpen, setServiceInfoOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickServiceInfoOpen = () => {
        setServiceInfoOpen(true);
    };

    const handleClickServiceInfoClose = () => {
        setServiceInfoOpen(false);
    };

    return (
        <>
            <ListItem>
                <IconButton onClick={handleClickServiceInfoOpen}>
                    <InfoIcon />
                </IconButton>
                <ListItemText
                    primary={props.service.name}
                    secondary={
                        <Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                {moment(props.service.startdate).format('DD/MM/yyyy HH:mm')}
                            </Typography>
                            {" — " + props.service.location}
                        </Fragment>
                    }
                />
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    style={{ backgroundColor: "darkslategray", width: '30%' }}
                    onClick={handleClickOpen}
                >
                    Requests
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    PaperComponent={PaperComponent}
                    aria-labelledby="draggable-dialog-title"
                >
                    <MyServicesRequests service={props.service} />
                </Dialog>
                <Dialog
                    open={serviceInfoOpen}
                    onClose={handleClickServiceInfoClose}
                    PaperComponent={PaperComponent}
                    aria-labelledby="draggable-dialog-title"
                >
                    <DetailService service={props.service} userid={props.userid}/>
                </Dialog>
            </ListItem>
        </>
    );
}

export default MyServicesListItem;