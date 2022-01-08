import Grid from '@mui/material/Grid';
import FormSignup from '../Components/FormSignup';
import Header from '../Components/Header';

export default function SignUp() {
    return (
        <Grid container columns={12} >
            <Grid container item>
                <Header userInfo={null} />
            </Grid>
            <FormSignup />
        </Grid>
    );
}