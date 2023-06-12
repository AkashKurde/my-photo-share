import React, { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Avatar from '@mui/material/Avatar';
import { ButtonBase, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';

function Upload() {
    const fileInputRef = useRef(null);
    const [imagePreviews, setImagePreviews] = useState([]);
    const handleClickCam = () => {
        fileInputRef.current.click();
    }
    const handleFileChange = (event) => {
        const files = event.target.files;
        const fileArray = Array.from(files);

        const previews = fileArray.map((file) => URL.createObjectURL(file));
        setImagePreviews(previews);
    };
    return (
        <>
            <Box overflow="auto" maxHeight="600px" width="100%" sx={{marginTop:'40px'}}>
                <Grid container spacing={2} justifyContent="center">
                    {imagePreviews.map((preview, index) => (
                        <Grid item key={index}>
                            <Card sx={{ width: 300, height: 200 }}>
                                <CardMedia
                                    component="img"
                                    height="170"
                                    image={preview}
                                    alt={`Preview ${index}`}
                                />
                                <CardContent sx={{padding:'4px'}}>
                                    <Typography sx={{display:'flex',justifyContent:'center',color:'black',fontWeight:'bold',fontSize:'1rem'}} color="text.secondary">
                                        Image {index + 1}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Box
                position="fixed"
                bottom={0}
                left={0}
                width="100%"
                display="flex"
                justifyContent="center"
                p={2}
                bgcolor="#f5f5f5"
            >
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    multiple
                />
                <ButtonBase sx={{ borderRadius: '50%' }} onClick={handleClickCam}>
                    <Avatar sx={{ width: '66px', height: '66px' }}>
                        <AddAPhotoIcon sx={{ width: '44px', height: '44px', color: 'black' }} />
                    </Avatar>
                </ButtonBase>
            </Box>
        </>
    );
}

export default Upload;
