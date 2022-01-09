import * as React from 'react';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography, Button } from '@mui/material';
import { IconButton, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import plants from '../img/plants.jpg'
import forestimage from '../img/forestimage.jpg'
import historical from '../img/historical.jpg'
import rembrandt from '../img/rembrandt.jpg'
import cappadocia from '../img/cappadocia.jpg'
import tea from '../img/tea.jpg'
import moment from 'moment';
import axios from 'axios';

const attendanceapi = axios.create({
    baseURL: 'http://localhost:84'
})

const DetailService = (props) => {
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const vertical = 'bottom';
    const horizontal = 'center';

    const handleservicerequest = (event) => {
        const body = {
            userid: props.userid,
            serviceid: props.service.id,
            providerid: props.service.provideruserid,
            servicetimecredit: props.service.duration,
        }

        console.log(body)

        createServiceRequest(body);
    };

    const createServiceRequest = (body) => {
        try {
            attendanceapi.put('/requestservice', body)
                .then(
                    (response) => {
                        if (response.status == 200) {
                            setMessage(response.data.message)
                            setOpen(true)
                            console.log(response)
                            // navigate("../myservices", { replace: true }); myservices'a veya servicedetail'a yönlendirebilir
                        }
                        else {
                            setMessage(response.data.message)
                            setOpen(true)
                            console.log(response)
                        }
                    })
                .catch(error => {
                    setMessage("So sorry, we couldn't create your service. Could you please try again.")
                    setOpen(true)
                    console.log(error)
                });
        } catch (error) {
            setMessage("So sorry, we couldn't create your service. Could you please try again.")
            setOpen(true)
            console.log(error)
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <div className="detail-service">
            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                {props.service.name}
                <Typography variant="body2" color="text.secondary">
                    by {props.service.providerusername}
                    {/* add profile link on providerusername */}
                </Typography>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <img src={props.service.pictureurl == 'plants' ? plants:
                props.service.pictureurl == 'rembrandt' ? rembrandt : 
                props.service.pictureurl == 'cappadocia' ? cappadocia :
                props.service.pictureurl == 'forestimage' ? forestimage :
                props.service.pictureurl == 'historical' ? historical : 
                props.service.pictureurl == 'tea' ? tea : null} alt="Service Cover Photo" style={{ width: '530px' }} /><br /><br />
                    <Typography variant="body2" color="text.secondary">
                        Location: Istanbul<br />
                        Date: {moment(props.service.startdate).format('DD/MM/yyyy HH:mm')}<br />
                        Duration: {props.service.duration} hours<br />
                        Capacity: {props.service.capacity} people
                    </Typography><br />
                    <Typography variant="body2" color="text.secondary">
                        {props.service.description}
                    </Typography>
                </DialogContentText>
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message={message}
                    action={action}
                    anchorOrigin={{ vertical, horizontal }}
                    style={{ marginBottom: '55px', width: '500px' }}
                />
                <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    style={{ backgroundColor: "darkslategray" }}
                    onClick={handleservicerequest}
                >
                    Request Service
                </Button>
            </DialogContent>
        </div>
    )
}

export default DetailService;