import { useEffect, useState } from 'react'
import { Grid, Paper } from '@mui/material';
import Header from '../Components/Header';
import axios from 'axios';
import PersonalInfo from '../Components/PersonalInfo';

const userapi = axios.create({
    baseURL: process.env.REACT_APP_USERAPI,
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

export default function Profile() {
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState(true);

    useEffect(() => {
        getUserInfo();
    }, []);

    const getUserInfo = async () => {
        try {
            await userapi.get('/verify')
                .then(
                    (response) => {
                        if (response.status == 200) {
                            setUserInfo(response.data)
                        }
                        else {
                            setUserInfo(null)
                            console.log(response)
                        }
                    })
                .catch(error => {
                    setUserInfo(null)
                    console.log(error)
                });
        } catch (error) {
            setUserInfo(null)
            console.log(error)
        } finally {
            setLoading(false)
        }
    };

    if (loading)
        return <div />

    return (
        <Grid container spacing={2} columns={16} className="Home" direction="row" alignItems="center">
            <Grid container item>
                <Header userInfo={userInfo} />
            </Grid>
            <Grid container item lg={16} justifyContent="center" alignItems="center">
                <Grid item lg={16}>
                    <Paper
                        sx={{
                            my: 3,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            minHeight: '770px',
                            padding: '20px'
                        }}
                        elevation={3}
                    >
                        <Grid container item lg={4} >
                            <PersonalInfo userInfo={userInfo} />
                        </Grid>
                        <Grid item lg={12} >
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    );
}