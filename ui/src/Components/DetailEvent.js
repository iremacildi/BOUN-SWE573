import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '@mui/material';
import picnic from '../img/picnic.jpg'

const DetailEvent = (props) => {

    return (
        <div className="detail-event">
            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                Let's Meet at Picnic!
                <Typography variant="body2" color="text.secondary">
                    by Irem ACILDI DEMIR
                </Typography>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <img src={picnic} alt="Event Cover Photo" style={{ width: '530px' }} /><br /><br />
                    <Typography variant="body2" color="text.secondary">
                        Location: Kadikoy, Istanbul<br />
                        Date: April 28, 2022<br />
                        Duration: 2 hours<br />
                        Capacity: 4 people
                    </Typography><br />
                    <Typography variant="body2" color="text.secondary">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse feugiat turpis sem, ut egestas neque vehicula ut. Phasellus id iaculis ante. Duis porttitor, justo eget elementum ultricies, nisi dui pellentesque justo, non interdum leo tortor quis risus. Donec semper magna ut iaculis placerat. Phasellus dapibus turpis ac sapien suscipit condimentum. Phasellus eu elit et lacus faucibus gravida. Morbi ligula quam, lobortis ac molestie ut, ultrices vitae ex. Aenean vitae ligula quam. Fusce eu finibus lectus, sed accumsan nisl. Nam malesuada auctor ex non interdum. Quisque nisl purus, tempor id commodo eu, pharetra in ex. Curabitur nulla nibh, tincidunt id ante nec, maximus efficitur turpis.
                    </Typography>
                </DialogContentText>
            </DialogContent>
        </div>
    )
}

export default DetailEvent;