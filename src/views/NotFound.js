import { Box, Typography } from '@mui/material';

const NotFound = () => {
  return (
    <Box sx={{ textAlign: 'center', marginTop: '2rem' }}>
      <Typography variant="h4" component="h1">
        Page Not Found
      </Typography>
      <Typography variant="body1">
        The page you are looking for does not exist.
      </Typography>
    </Box>
  );
};

export default NotFound;