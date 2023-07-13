import { Box, Card, CircularProgress, Grid, Paper, Typography } from '@mui/material'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { useEffect, useState } from 'react';
import { baseURL } from '../utils/services';
import axios from 'axios';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
const Leaderboard = () => {
    const [data, setData] = useState([]);
    const [loader,setLoader]=useState(false)
    console.log('data', data)
    useEffect(() => {
        setLoader(true);
        axios.get(`${baseURL}/api/leader-board`)
            .then((res) => {
                const response = res.data;
                const sorted = response.sort((a, b) => b.score - a.score);
                if (sorted) {
                    setData(sorted);
                    setLoader(false);
                }

            }).catch((err) => {
                console.log('err', err);
                setData([]);
                setLoader(false);
            })
    }, [])
    return (
        <Grid item>
            <Paper elevation={10} sx={{ width: 355, height: 412, marginTop: {md:'32px',xs:'64px'} }}>
                <Box sx={{ height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#A50035' }} >
                    <Typography sx={{ fontSize: '1.16rem', fontWeight: '700',color:'white' }} id="modal-modal-title" variant="h6" component="h2">
                        Leaderboard
                    </Typography>
                </Box>
                <Box sx={{ marginTop: '25px', paddingLeft: '16px', paddingRight: '16px',display: loader && 'flex',justifyContent:loader && 'center' }}>
                    {data && data.map((val, index) => (
                        <Grid item key={index}>

                            <Card sx={{ height: '50px', display: 'flex', alignItems: 'center', marginBottom: '15px', justifyContent: 'space-between' }}>
                                <Box sx={{ display: 'flex' }}>
                                    <Typography sx={{ marginLeft: '5px ', display: 'flex' }} variant="h6"><div style={{ width: '26px', height: '26px', borderRadius: '50px', background: '#A50035', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '4px', marginRight: '6px', color: 'white',fontSize:'19px' }}>{index + 1}</div>{val.empName}</Typography>
                                </Box>
                                <Typography sx={{ display: 'flex', alignItems: 'center', marginRight: '10px' }} variant="h6"><EmojiEventsIcon sx={{color:'#E1B530'}} />{val.score}</Typography>
                            </Card>
                        </Grid>
                    ))}
                    {loader && <CircularProgress sx={{ color: 'rgb(34, 41, 57)' }} size={30} />}
                </Box>
            </Paper>
        </Grid>
    )
}

export default Leaderboard