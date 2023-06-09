import { Box, Button, Grid, TextField } from '@mui/material'
import LG_logo from '../assets/lg_logo_new.png'

const Login = () => {
    const btnstyle = { margin: '25px 0' }
    return (
        <Grid style={{display:'flex',flexDirection:'column',rowGap:'85px'}}>
            
                <Grid align='center' style={{marginTop:'31px'}}>
                    <img src={LG_logo} style={{width:'134px'}} alt='logo'/>
                </Grid>
                
                
                <Grid style={{padding:'14px'}} align='center'>
                <h1>Sign In</h1>
                    <TextField
                        label='Username'
                        variant="outlined"
                        fullWidth
                        required
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
                        InputLabelProps={{
                            shrink: true
                        }}
                        inputProps={{
                            style: {
                                height: "14px",
                            },

                        }}
                    />
                    <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth >Log In</Button>
                </Grid>
            
        </Grid>
    )
}

export default Login