import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Avatar, Box, IconButton, Typography, useScrollTrigger } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT } from '../redux/actionTypes';
import logOut from '../assets/logOut_logo.png'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { baseURL } from '../utils/services';
import axios from 'axios';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import HomeIcon from '@mui/icons-material/Home';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
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
    const username = useSelector(state => state.auth.user)
    const uploadFlag = useSelector(state=> state.UploadCompReduer.toggleFlag)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const locationName = location.pathname;
    const handleBack = () => {
        navigate('/home')
    }

    const handleLogout = () => {
        dispatch({ type: LOGOUT });

    }

    const [score, setScore] = useState(0);
    useEffect(() => {
        axios.get(`${baseURL}/api/leader-board/self/${username.empId}`)
            .then((res) => {
                console.log('res self', res);
                setScore(res.data.score)
            }).catch((err) => {
                console.log('err', err);
                setScore(0);
            })
    }, [uploadFlag])


    const handleAdmin = () => {
        navigate('/admin');

    }
    const handleAdminHome = () => {
        navigate('/home');

    }
    return (
        <>
            {/* <CssBaseline />
            <ElevationScroll {...props}> */}
            <AppBar sx={{ backgroundColor: '#A50035' }}>
                <Toolbar sx={{ justifyContent: 'space-between', paddingLeft: props.back && '6px', paddingRight: props.back && '14px' }}>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {
                            props.back && <IconButton onClick={handleBack}><ArrowBackIcon sx={{ color: 'white' }} /></IconButton>
                        }

                        <Typography variant="subtitle2" component="div" sx={{ fontWeight: 'bold' }}>
                            {username.empName}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                        
                        {
                            (!props.back && (username.empId === "SI006423"))
                            && (locationName == '/admin') &&
                            <Avatar onClick={handleAdminHome} sx={{ width: '35px', height: '35px', marginRight: '10px', cursor: 'pointer' }}>
                                <HomeIcon sx={{ color: 'black' }} />
                            </Avatar>
                        }
                        {
                            (!props.back && (username.empId === "SI006423"))
                            && (locationName == '/home') &&
                            <Avatar onClick={handleAdmin} sx={{ width: '35px', height: '35px', marginRight: '10px', cursor: 'pointer' }}>
                                <AdminPanelSettingsIcon sx={{ color: 'black', marginLeft: '2px', marginTop: '1px' }} />
                            </Avatar>
                        }

                        {
                            !props.back &&
                            <IconButton sx={{ padding: '2px' }} onClick={handleLogout}>
                                <img src={logOut} alt='logout' />
                            </IconButton>
                        }

                        {props.back && <Typography sx={{ display: 'flex', alignItems: 'center' }} variant="h6"><EmojiEventsIcon sx={{ color: '#E1B530', width: '30px', height: '30px' }} />{score}</Typography>}
                    </Box>
                </Toolbar>
            </AppBar>
            {/* </ElevationScroll>
            <Toolbar /> */}
            {/* <Leaderboard open={open} setOpen={setOpen}/> */}
        </>
    )
}

export default Header