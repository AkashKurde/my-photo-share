import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useDispatch } from 'react-redux';
import { AGREEMENT, LOGOUT } from '../redux/actionTypes';
import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';
import LG_logo from '../assets/lg_logo_new.png'
import { Grid } from '@mui/material';


const blankDiv = {
  'display': 'flex',
  'justify-content': 'center',
  'align-items': 'center',
  'height': '100vh',
  'font-family': 'system-ui'
}
const blankH4 = {
  'font-size': '24px',
  'font-weight': 'bold',
  'text-align': 'center',
}

const AgreementPage = () => {
  const [checked, setChecked] = useState(false);
  console.log("chek", checked)
  const dispatch = useDispatch();
  const handleAgree = () => {
    dispatch({ type: AGREEMENT, payload: true });
  }
  const styleToString = (style) => {

    return Object.keys(style)
      .map((key) => `${key}: ${style[key]}`)
      .join('; ');
      
  };
  const handleDisagree = () => {
    dispatch({ type: AGREEMENT, payload: false });
    dispatch({ type: LOGOUT })
    document.open();
    document.write(`
  <div style="${styleToString(blankDiv)}">
    <h4 style="${styleToString(blankH4)}">Thanks for your response!</h4>
  </div>
`);
    document.close();
  }

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Grid align='center'>
        <img src={LG_logo} style={{ width: '134px' }} alt='logo' />
      </Grid>
      <Box
        sx={{
          maxWidth: '500px',
          padding: '16px',
          backgroundColor: '#fff',
          borderRadius: '8px',
          // boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
        }}
      >
        <Typography variant="body1" sx={{ marginBottom: '16px' }}>
          Hi! This is LGSI’s Image Upload Tool.
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: '16px' }}>
          This tool helps to upload images that are already captured. It will be used only for AI model development & improvement purpose.
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: '16px', marginTop: '46px' }}>
          We will handle it considering data privacy & security. Kindly provide your consent below.
        </Typography>
        <Box sx={{ display: 'flex', marginLeft: '-10px' }}>
          <Checkbox
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
          <Typography variant="body1" sx={{ marginBottom: '16px', color: '#f44336' }}>
            I understand the need for this tool and I agree to upload data to LGSI servers.
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '16px',
            gap: '25px'
          }}
        >
          <Button variant="contained" disabled={!checked} onClick={handleAgree} sx={{ textTransform: 'none', width: '100px', backgroundColor: '#A50035', '&:hover': { backgroundColor: '#A50035' } }}>
            Agree
          </Button>
          <Button variant="contained" onClick={handleDisagree} sx={{ textTransform: 'none', width: '100px', backgroundColor: '#A50035', '&:hover': { backgroundColor: '#A50035' } }}>
            Disagree
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AgreementPage;