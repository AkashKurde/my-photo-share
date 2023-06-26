import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Avatar from '@mui/material/Avatar';
import { Backdrop, ButtonBase, Card, CardContent, CardMedia, CircularProgress, Grid, IconButton, Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import SendIcon from '@mui/icons-material/Send';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { baseURL } from '../utils/services';
import plupload from 'plupload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Upload() {
    const fileInputRef = useRef(null);
    const containerRef = useRef(null);
    const uploaderRef = useRef(null);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const categoryName = useSelector(state => state.CategoryReducer.category)
    const userData = useSelector(state => state.auth.user)
    const [uploadedData, setUploadedData] = useState([]);
    const [uploadComplete, setUploadComplete] = useState(false);
    const [open, setOpen] = useState(false);
    const [msg,setMsg]=useState('');
    // let count=0;
    const [severity,setSeverity]=useState('');
    // useEffect(() => {
    //     setIsLoading(true)
    //     axios.get(`${baseURL}/api/image-upload/${userData.empId}`)
    //         .then((res) => {
    //             console.log("res", res.data);
    //             setUploadedData(res.data);
    //             setIsLoading(false)
    //         }).catch((err) => {
    //             console.log('err', err);
    //             setIsLoading(false)
    //         })
    // }, [uploadComplete])
    
    const handleRemoveImage = (index) => {
        const updatedPreviews = [...imagePreviews];
        updatedPreviews.splice(index, 1);
        setImagePreviews(updatedPreviews);
        const uploader = uploaderRef.current; // Get the uploader instance from the ref
        const selectedFiles = uploader.files; // Get the list of selected files

        if (selectedFiles.length > index) {
            const fileToRemove = selectedFiles[index];
            uploader.removeFile(fileToRemove);
        }
        
    };

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
    }, [uploadedData, imagePreviews])

    useEffect(() => {
        const uploader = new plupload.Uploader({
            runtimes: 'html5',
            browse_button: 'pickfiles',
            // container: document.getElementById('container'),
            url: `${baseURL}/api/image-upload`,
            multipart: true,
            multipart_params: {
                empName: `${userData.empName}`,
                empId: `${userData.empId}`,
                category: `${categoryName}`
            },
            chunk_size: '1mb',
            method: 'POST',
            filters: {
                max_file_size: '100gb',
                mime_types: [
                    { title: 'Image files', extensions: 'jpg,gif,png' },
                ]
            },
            init: {
                PostInit: function () {

                    document.getElementById('uploadfiles').onclick = function () {
                        uploader.start();
                        setIsUploading(true);
                        return false;
                    };

                },
                FilesAdded: function (up, files) {
                    const newPreviewImages = [];
                    // count=files.length
                    plupload.each(files, function (file) {
                        const fileURL = URL.createObjectURL(file.getNative());
                        newPreviewImages.push(fileURL);
                    });
                    // setImagePreviews(newPreviewImages);
                    setImagePreviews((prev) =>
                        [...prev, ...newPreviewImages]
                    )
            
                },
                // UploadProgress: function (up, file) {
                    // if (file.percent === 100) {
                    //     // console.log('File upload status.', file);
                    //     // check if all files are uploaded
                    //     const allFiles = up.files;
                    //     let allFilesUploaded = false;
                    //     allFilesUploaded = allFiles.every((f) => f.percent === 100);
                    //     if (allFilesUploaded === true) {
                    //         setUploadComplete(!uploadComplete);
                    //         setImagePreviews([]);
                    //         setIsUploading(false);
                    //     }
                    // }
                // },
                UploadComplete: function (up, files) {
                    setOpen(true);
                    setSeverity("success")
                    setMsg(`${files.length} Images uploaded to ${categoryName} category`)
                    setUploadComplete(!uploadComplete);
                    setImagePreviews([]);
                    setIsUploading(false);
                    uploader.splice();
                    uploader.refresh();

                },
                Error: function (up, err) {
                    console.log('Error #' + err.code + ': ' + err.message);
                    setOpen(true);
                    setMsg('Error In Upload');
                    setSeverity("error");
                    // setIsUploading(false);
                }
            }
        });
        uploaderRef.current = uploader;
        uploader.init();
        
    }, []);


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <>
            <Box overflow="auto" maxHeight="77vh" width="100%" sx={{ marginTop: '75px' }} ref={containerRef}>
                <Grid container spacing={2} justifyContent="center">

                    {uploadedData.map((preview, index) => (
                        <Grid item key={index}>
                            <Card sx={{ width: 320, height: 200 }}>
                                <div style={{ position: 'relative' }}>
                                    <CardMedia
                                        component="img"
                                        height="170"
                                        image={preview.filePath}
                                        alt={`Preview ${index}`}
                                        sx={{ objectFit: 'contain' }}
                                    />
                                    <div
                                        style={{
                                            position: 'absolute',
                                            bottom: '4px',
                                            right: '4px',
                                            color: 'white',
                                        }}
                                    >
                                        <CheckCircleIcon sx={{ color: '#25D366' }} />
                                    </div>
                                </div>
                                <CardContent sx={{ padding: '4px' }}>
                                    <Typography sx={{ display: 'flex', justifyContent: 'center', color: 'black', fontWeight: 'bold', fontSize: '1rem' }} color="text.secondary">
                                        {preview.category}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}

                    {imagePreviews.map((preview, index) => (

                        <Grid item key={index}>
                            {console.log("preview", preview)}
                            <Card sx={{ width: 320, height: 200 }}>
                                <div style={{ position: 'relative' }}>
                                    <CardMedia
                                        component="img"
                                        height="170"
                                        image={preview}
                                        alt={`Preview ${index}`}
                                        sx={{ objectFit: 'contain' }}
                                    />
                                    <IconButton
                                        sx={{ position: 'absolute', top: 0, right: 0, color: 'black', zIndex: 1 }}
                                        onClick={() => handleRemoveImage(index)}
                                    >
                                        <CancelIcon sx={{ color: '#fd5b3d' }} />
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
            {/* <Box
                position="fixed"
                bottom={0}
                left={0}
                width="100%"
                display="flex"
                sx={{ paddingTop: '16px', paddingBottom: '16px', justifyContent: 'space-between' }}
                bgcolor="#f5f5f5"
                zIndex={2}
            > */}
            {/* <div
                    style={{
                        position: 'relative',
                        width: '66px',
                        height: '66px',
                    }}
                > */}
            {/* <ButtonBase sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        borderRadius: '50%',
                        visibility: imagePreviews.length === 0 ? 'visible' : 'hidden',
                        zIndex: imagePreviews.length === 0 ? 1 : -1,
                        opacity: imagePreviews.length === 0 ? 1 : 0.5,
                        border: '2px solid'
                    }} id='pickfiles'>
                        <Avatar sx={{ width: '66px', height: '66px' }}>
                            <AddAPhotoIcon sx={{ width: '42px', height: '42px', color: 'black', marginBottom: '3px', marginRight: '2px' }} />
                        </Avatar>
                    </ButtonBase>
                    <ButtonBase sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        borderRadius: '50%',
                        visibility: imagePreviews.length === 0 ? 'hidden' : 'visible',
                        opacity: imagePreviews.length === 0 ? 0.5 : 1,
                        zIndex: imagePreviews.length === 0 ? -1 : 1,
                        border: '2px solid'
                    }} id='uploadfiles'>
                        <Avatar sx={{ width: '66px', height: '66px' }}>
                            <SendIcon sx={{ width: '40px', height: '40px', color: 'black', marginLeft: '7px' }} />
                        </Avatar>
                    </ButtonBase> */}

            {/* <ButtonBase sx={{ borderRadius: '50%', marginLeft: '12px' }} id='pickfiles'>
                    <Avatar sx={{ width: '66px', height: '66px' }}>
                        <AddAPhotoIcon sx={{ width: '42px', height: '42px', color: 'black', marginBottom: '3px', marginRight: '2px' }} />
                    </Avatar>
                </ButtonBase>

                <ButtonBase sx={{ borderRadius: '50%', marginRight: '12px', opacity: imagePreviews.length === 0 ? 0.5 : 1, pointerEvents: imagePreviews.length === 0 && 'none' }} id='uploadfiles'>
                    <Avatar sx={{ width: '66px', height: '66px' }}>
                        <SendIcon sx={{ width: '40px', height: '40px', color: 'black', marginLeft: '7px' }} />
                    </Avatar>
                </ButtonBase> */}

            {/* </div> */}

            {/* </Box> */}
            <Box
                position="fixed"
                bottom={0}
                left={0}
                width="100%"
                display="flex"
                justifyContent="center"
                sx={{ paddingTop: '12px', paddingBottom: '4px' }}
                bgcolor="#f5f5f5"
                zIndex={2}
            >
                <div
                    style={{
                        position: 'relative',
                        width: '66px',
                        height: '66px',
                    }}
                >
                    <ButtonBase sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        borderRadius: '50%',
                        visibility: imagePreviews.length === 0 ? 'visible' : 'hidden',
                        zIndex: imagePreviews.length === 0 ? 1 : -1,
                        opacity: imagePreviews.length === 0 ? 1 : 0.5,
                        border: '2px solid'
                    }} id='pickfiles'>
                        <Avatar sx={{ width: '56px', height: '56px' }}>
                            <AddAPhotoIcon sx={{ width: '35px', height: '35px', color: 'black', marginBottom: '3px', marginRight: '2px' }} />
                        </Avatar>
                    </ButtonBase>
                    <ButtonBase sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        borderRadius: '50%',
                        visibility: imagePreviews.length === 0 ? 'hidden' : 'visible',
                        opacity: imagePreviews.length === 0 ? 0.5 : 1,
                        zIndex: imagePreviews.length === 0 ? -1 : 1,
                        border: '2px solid'
                    }} id='uploadfiles'>
                        <Avatar sx={{ width: '56px', height: '56px' }}>
                            <SendIcon sx={{ width: '35px', height: '35px', color: 'black', marginLeft: '7px' }} />
                        </Avatar>
                    </ButtonBase>

                </div>

            </Box>
            {isUploading && (
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    mt={2}
                >
                    <Backdrop open={isUploading} style={{ zIndex: 9999, flexDirection: "column" }}>
                        <CircularProgress sx={{ color: 'rgb(34, 41, 57)' }} size={60} />
                        <Typography variant="body2" sx={{ marginTop: '20px', color: "beige", fontSize: '20px', fontWeight: 'bold' }} ml={1}>
                            Uploading..
                        </Typography>
                    </Backdrop>
                </Box>)
            }
            {isLoading && (<Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{ height: '66vh' }}
            ><CircularProgress sx={{ color: 'rgb(34, 41, 57)' }} size={60} /></Box>)}

            <Snackbar sx={{top:'75px'}} open={open} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center'}}>
                <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                    {msg}
                </Alert>
            </Snackbar>
        </>
    );
}

export default Upload;
