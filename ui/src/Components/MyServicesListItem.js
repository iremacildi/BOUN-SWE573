import { useEffect, useState, Fragment } from 'react'
import { Accordion, AccordionDetails, Button, AccordionSummary, Grid, Paper, Typography, ListItem, ListItemText, Dialog, Divider, List } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Header from '../Components/Header';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import MyServicesRequests from './MyServicesRequests';
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

const MyServicesListItem = (props) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <ListItem>
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
            </ListItem>
        </>
    );
}

export default MyServicesListItem;