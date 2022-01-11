import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography, Button } from '@mui/material';
import picnic from '../img/picnic.jpg'
import moment from 'moment';

const DetailEvent = (props) => {

    return (
        <div className="detail-event">
            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                {props.event.name}
                <Typography variant="body2" color="text.secondary">
                    by {props.event.organizerusername}
                    {/* add profile link on organizerusername */}
                </Typography>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <img src={picnic} alt="Event Cover Photo" style={{ width: '530px' }} /><br /><br />
                    <Typography variant="body2" color="text.secondary">
                        Location: Istanbul<br />
                        Date: {moment(props.event.startdate).format('DD/MM/yyyy HH:mm')}<br />
                        Duration: {props.event.duration} hours<br />
                        Capacity: {props.event.capacity} people
                    </Typography><br />
                    <Typography variant="body2" color="text.secondary">
                        {props.event.description}
                    </Typography>
                </DialogContentText>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    style={{ backgroundColor: "darkslategray" }}
                >
                    Attend Event
                </Button>
            </DialogContent>
        </div>
    )
}

export default DetailEvent;