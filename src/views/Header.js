import React from 'react'
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import { Typography, useScrollTrigger } from '@mui/material';

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
    return (
        <>
            <CssBaseline />
            <ElevationScroll {...props}>
                <AppBar sx={{ backgroundColor: 'rgb(34, 41, 57)' }}>
                    <Toolbar sx={{ justifyContent: 'space-between' }}>
                        <Typography variant="subtitle2" component="div">
                            {props.username}
                        </Typography>
                        <Typography variant="subtitle2" component="div">
                            Score:05
                        </Typography>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <Toolbar />
        </>
    )
}

export default Header