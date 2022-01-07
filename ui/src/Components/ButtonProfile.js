import { useState, useEffect, useRef } from 'react'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { ClickAwayListener, Grow, IconButton, MenuItem, MenuList, Paper, Popper } from "@mui/material";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const userapi = axios.create({
    baseURL: 'http://localhost',
    withCredentials: true
})

userapi.interceptors.request.use(
    function (config) {
        config.headers.withCredentials = true;
        return config
    },
    function (err) {
        return Promise.reject(err)
    }
)

const ButtonProfile = (props) => {
    let navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    const handleCreateService = (event) => {
        navigate("../createservice", { replace: true, state: { serviceId: 0 } });
    };

    const handleEventService = (event) => {
        navigate("../createevent", { replace: true, state: { eventId: 0 } });
    };

    const handleProfile = (event) => {
        verifyUser()

        setOpen(false);
    };

    const verifyUser = () => {
        try {
            userapi.get('/verify')
                .then(
                    (response) => {
                        if (response.status == 200) {
                            console.log(response)
                            navigate("../profile", { replace: true });
                        }
                        else {
                            console.log(response)
                        }
                    })
                .catch(error => {
                    console.log(error)
                });
        } catch (error) {
            console.log(error)
        }
    };

    const logoutUser = () => {
        try {
            userapi.post('/logout')
                .then(
                    (response) => {
                        if (response.status == 200) {
                            console.log(response)
                            navigate("../login", { replace: true, state: response.data });
                        }
                        else {
                            console.log(response)
                        }
                    })
                .catch(error => {
                    console.log(error)
                });
        } catch (error) {
            console.log(error)
        }
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <div>
            <IconButton
                ref={anchorRef}
                id="composition-button"
                aria-controls={open ? 'composition-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
            >
                <AccountBoxIcon style={{ color: 'white', fontSize: '30px' }} />
            </IconButton>
            <Popper style={{ zIndex: 100 }}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === 'bottom-start' ? 'left top' : 'left bottom',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    autoFocusItem={open}
                                    id="composition-menu"
                                    aria-labelledby="composition-button"
                                    onKeyDown={handleListKeyDown}
                                >
                                    <MenuItem onClick={handleProfile}>Profile</MenuItem>
                                    <MenuItem onClick={handleClose}>My Services</MenuItem>
                                    <MenuItem onClick={handleClose}>My Events</MenuItem>
                                    <MenuItem onClick={handleCreateService}>Create Service</MenuItem>
                                    <MenuItem onClick={handleEventService}>Create Event</MenuItem>
                                    <MenuItem onClick={logoutUser}>Logout</MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div>
    )
}

export default ButtonProfile;