import React from 'react'
import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Grid, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PersonIcon from '@mui/icons-material/Person';

export default function PersonalInfo(props) {
    return (
        <Grid container item lg={16} justifyContent="center" alignItems="center">
            <Grid container item lg={16} justifyContent="center" alignItems="center">
                <Avatar sx={{ m: 1, bgcolor: 'darkslategray', width: 72, height: 72 }}>
                    {props.userInfo.name.substr(0, 1) + props.userInfo.surname.substr(0, 1)}
                </Avatar>
            </Grid>
            <Grid container item lg={16} justifyContent="center" alignItems="center">
                <Typography component="h2" variant="h5">
                    {props.userInfo.username}
                </Typography>
            </Grid>
            <Grid container item lg={16} justifyContent="center" alignItems="center">
                <List
                    sx={{
                        width: '100%',
                        maxWidth: 500,
                        bgcolor: 'background.paper',
                        marginTop: '25px'
                    }}
                >
                    <ListItem>
                        <ListItemAvatar>
                            <PersonIcon />
                        </ListItemAvatar>
                        <ListItemText primary={props.userInfo.name + ' ' + props.userInfo.surname} />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem>
                        <ListItemAvatar>
                            <InfoIcon />
                        </ListItemAvatar>
                        <ListItemText primary={props.userInfo.about} />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem>
                        <ListItemAvatar>
                            <EmailIcon />
                        </ListItemAvatar>
                        <ListItemText primary={props.userInfo.email} />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem>
                        <ListItemAvatar>
                            <LocalPhoneIcon />
                        </ListItemAvatar>
                        <ListItemText primary={props.userInfo.phonenumber} />
                    </ListItem>
                </List>
            </Grid>
        </Grid>
    );
};