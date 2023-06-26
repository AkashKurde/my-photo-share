import React from 'react'
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import { IconButton, Typography, useScrollTrigger } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT } from '../redux/actionTypes';
import logOut from '../assets/logOut_logo.png'
function ElevationScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}
ElevationScroll.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
};

const Header = (props) => {
    const username = useSelector(state=>state.auth.user.empName)
    const navigate = useNavigate();
    const dispatch=useDispatch();
    const handleBack=()=>{
        navigate('/home')
    }

const handleLogout=()=>{
    dispatch({ type: LOGOUT })
}
    return (
        <>
            {/* <CssBaseline />
            <ElevationScroll {...props}> */}
                <AppBar sx={{ backgroundColor: '#A50035' }}>
                    <Toolbar sx={{ justifyContent: 'space-between',paddingLeft: props.back && '6px',paddingRight: props.back && '14px' }}>
                        {
                            props.back && <IconButton onClick={handleBack}><ArrowBackIcon sx={{color:'white'}}/></IconButton>
                        }

                        <Typography variant="subtitle2" component="div" sx={{fontWeight:'bold'}}>
                            {username}
                        </Typography>
                        {
                            !props.back && <IconButton sx={{padding:'2px'}} onClick={handleLogout}><img src={logOut} alt='logout'/></IconButton>
                        }
                        {/* <Typography variant="subtitle2" onClick={handleLogout} component="div" sx={{borderRadius:'25px',padding:'5px',color:'black',backgroundColor:'#ffd700'}}>
                            Score:05
                        </Typography> */}
                    </Toolbar>
                </AppBar>
            {/* </ElevationScroll>
            <Toolbar /> */}
        </>
    )
}

export default Header