import { Button, Grid, TextField } from '@mui/material'
import LG_logo from '../assets/lg_logo_new.png'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions/authActions';
const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const btnstyle = { margin: '26px 0', height: '40px' };
    const [username, setUsername] = useState('');
    const [EmpId, setEmpId] = useState('');
    const loginData = useSelector(state => state.auth.user)
    const handleUsername = (e) => {
        setUsername(e.target.value)
    }
    const handleEmpId = (e) => {
        setEmpId(e.target.value)
    }
    const handleLogin = () => {
        dispatch(login(username, EmpId)).then(() => {
            navigate('/home'); // Navigate to the home page after successful login
        }).catch((error) => {
            // Login failed
            // Display an error message to the user or perform any necessary action
            console.log(error.message);
        });
    }

    useEffect(()=>{
        if(loginData !== null){
            navigate('/home')
        }
    },[loginData])
    return (
        <Grid style={{ display: 'flex', flexDirection: 'column', rowGap: '78px' }}>

            <Grid align='center' style={{ marginTop: '31px' }}>
                <img src={LG_logo} style={{ width: '134px' }} alt='logo' />
            </Grid>


            <Grid style={{ padding: '14px' }} align='center'>
                <h1>Sign In</h1>
                <TextField
                    label='Username'
                    variant="outlined"
                    fullWidth
                    required
                    value={username}
                    onChange={handleUsername}
                    InputLabelProps={{
                        shrink: true
                    }}
                    inputProps={{
                        style: {
                            height: "14px",
                        },

                    }}
                    style={{ marginBottom: '15px' }}
                />
                <TextField
                    label='Employe Id'
                    variant="outlined"
                    fullWidth
                    required
                    value={EmpId}
                    onChange={handleEmpId}
                    InputLabelProps={{
                        shrink: true
                    }}
                    inputProps={{
                        style: {
                            height: "14px",
                        },

                    }}
                />
                <Button onClick={handleLogin} color='primary' variant="contained" style={btnstyle} fullWidth >Log In</Button>
            </Grid>

        </Grid>
    )
}

export default Login