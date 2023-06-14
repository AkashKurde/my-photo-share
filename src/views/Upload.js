import React, { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Avatar from '@mui/material/Avatar';
import { Backdrop, ButtonBase, Card, CardContent, CardMedia, CircularProgress, Grid, IconButton, Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import SendIcon from '@mui/icons-material/Send';
import { useSelector } from 'react-redux';

function Upload() {
    const fileInputRef = useRef(null);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const categoryName=useSelector(state=>state.CategoryReducer.category)

    const handleClickCam = () => {
        fileInputRef.current.click();
    }
    const handleFileChange = (event) => {
        const files = event.target.files;
        const fileArray = Array.from(files);

        const previews = fileArray.map((file) => URL.createObjectURL(file));
        setImagePreviews(previews);
    };
    const handleRemoveImage = (index) => {
        const updatedPreviews = [...imagePreviews];
        updatedPreviews.splice(index, 1);
        setImagePreviews(updatedPreviews);
    };
    const handleUpload = () => {
        console.log("uploading....");
        setIsUploading(true);
        setTimeout(() => {
            setIsUploading(false);
        }, 5000);
    }
    return (
        <>
            <Box overflow="auto" maxHeight="600px" width="100%" sx={{ marginTop: '100px' }}>
                <Grid container spacing={2} justifyContent="center">
                    {imagePreviews.map((preview, index) => (
                        <Grid item key={index}>
                            <Card sx={{ width: 300, height: 200 }}>
                                <div style={{ position: 'relative' }}>
                                    <CardMedia
                                        component="img"
                                        height="170"
                                        image={preview}
                                        alt={`Preview ${index}`}
                                    />
                                    <IconButton
                                        sx={{ position: 'absolute', top: 0, right: 0, color: 'black', zIndex: 1 }}
                                        onClick={() => handleRemoveImage(index)}
                                    >
                                        <CancelIcon />
                                    </IconButton>
                                </div>
                                <CardContent sx={{ padding: '4px' }}>
                                    <Typography sx={{ display: 'flex', justifyContent: 'center', color: 'black', fontWeight: 'bold', fontSize: '1rem' }} color="text.secondary">
                                        {categoryName}
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
                sx={{paddingTop:'16px',paddingBottom:'16px'}}
                bgcolor="#f5f5f5"
                zIndex={2}
            >
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    multiple
                />
                {(imagePreviews.length == 0) ?
                    <ButtonBase sx={{ borderRadius: '50%' }} onClick={handleClickCam}>
                        <Avatar sx={{ width: '66px', height: '66px' }}>
                            <AddAPhotoIcon sx={{ width: '42px', height: '42px', color: 'black', marginBottom: '3px', marginRight: '2px' }} />
                        </Avatar>
                    </ButtonBase>
                    :
                    <ButtonBase sx={{ borderRadius: '50%' }} onClick={handleUpload}>
                        <Avatar sx={{ width: '66px', height: '66px' }}>
                            <SendIcon sx={{ width: '40px', height: '40px', color: 'black', marginLeft: '7px' }} />
                        </Avatar>
                    </ButtonBase>
                }

            </Box>
            {isUploading && (
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    mt={2}
                >
                    <Backdrop open={isUploading}  style={{ zIndex: 9999,flexDirection:"column"}}>
                        <CircularProgress sx={{ color: 'rgb(34, 41, 57)' }} size={60} />
                        <Typography variant="body2" sx={{marginTop:'20px',color:"beige",fontSize:'20px',fontWeight:'bold'}}  ml={1}>
                          Uploading..
                        </Typography>
                    </Backdrop>
                </Box>)
            }
        </>
    );
}

export default Upload;
