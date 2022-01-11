import { useState, useEffect } from 'react'
import logo from '../img/logo.png'
import logoSmall from '../img/logoSmall.png'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SortIcon from '@mui/icons-material/Sort';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Button, Grid, IconButton, Typography } from '@mui/material';
import SearchBox from './SearchBox';
import ButtonProfile from './ButtonProfile';

const Header = (props) => {
    useEffect(() => {
        window.addEventListener('resize', handlePageResize);
        return () => window.removeEventListener('resize', handlePageResize);
    });

    const [logoImg, setLogoImg] = useState(logo);

    const handlePageResize = () => {
        const width = window.innerWidth;
        if (width <= 890) {
            setLogoImg(logoSmall);
        }
        else {
            setLogoImg(logo);
        }
    };

    return (
        <Grid container spacing={1} columns={24} className="header" direction="row" alignItems="center">
            <Grid container item xs={6} sm={6} md={6} lg={6} xl={6} justifyContent="flex-start" alignItems="center">
                <a href="../"><img src={logoImg} alt="Community Platform Logo" /></a>
            </Grid>
            {props.userInfo == null ? null : <>
                <Grid container item spacing={1} xs={12} sm={12} md={12} lg={12} xl={12} justifyContent="flex-end" alignItems="center">
                    <Grid item xs={22} sm={24} md={24} lg={17} xl={18}>
                        <SearchBox />
                    </Grid>
                    <Grid container item spacing={2} xs={24} sm={24} md={24} lg={7} xl={6} justifyContent="flex-end" alignItems="center">
                        <Grid item>
                            <Button variant="contained" endIcon={<FilterAltIcon />} style={{ backgroundColor: "white", color: "gray" }}>
                                Filter
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container item spacing={0.5} xs={6} sm={6} md={6} lg={6} xl={6} direction="row" justifyContent="flex-end" alignItems="center">
                    <Grid container item lg={24} justifyContent="flex-end" alignItems="center">
                        <Grid item>
                            <IconButton>
                                <NotificationsIcon style={{ color: 'white', fontSize: '30px' }} />
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <ButtonProfile style={{ zIndex: 100 }} />
                        </Grid>
                    </Grid>
                    <Grid container item lg={24} justifyContent="flex-end" alignItems="center">
                        <Grid item style={{ marginRight: '10px' }}>
                            <Typography variant="body2">
                                <AccountBalanceWalletIcon style={{ color: 'white', fontSize: '20px' }} /> {props.userInfo.timecredit - props.userInfo.timecreditonhold} hours
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid> </>
            }
        </Grid>
    )
}

export default Header;