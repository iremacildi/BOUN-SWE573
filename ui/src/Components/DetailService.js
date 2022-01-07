import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography, Button } from '@mui/material';
import plants from '../img/plants.jpg'
import moment from 'moment';

const DetailService = (props) => {

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
                    <img src={plants} alt="Service Cover Photo" style={{ width: '530px' }} /><br /><br />
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
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    style={{ backgroundColor: "darkslategray" }}
                >
                    Request Service
                </Button>
            </DialogContent>
        </div>
    )
}

export default DetailService;