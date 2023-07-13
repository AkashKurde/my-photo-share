import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Grid, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Typography, ButtonBase, Avatar, CircularProgress, Modal, Fade, Card, CardMedia, CardContent, CardActionArea, Tooltip, useMediaQuery } from "@mui/material"
import { useEffect, useState } from "react";
import { baseURL } from "../../utils/services";
import axios from "axios";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Backdrop from '@mui/material/Backdrop';
import ClearIcon from '@mui/icons-material/Clear';
import fan from '../../assets/Fan.jpg';
import Bottles from '../../assets/bottels.jpg';
import Bowl from '../../assets/Bowl.jpg';
import WScale from '../../assets/weightScale.jpg';
import Pottedplant from '../../assets/plottedplants.jpg';
import cup from '../../assets/Cup.jpg';
import TTable from '../../assets/teaTable.jpg';
import couch from '../../assets/couch.jpg';
import doormat from '../../assets/Doormat.jpg';
import Towel from '../../assets/Towellying.jpg';
import Phone from '../../assets/phone.jpg';
import laptop from '../../assets/laptop.jpg';
import Remote from '../../assets/remote.jpg';
import Chairs from '../../assets/chairs.jpg';
import Tv from '../../assets/Tv.jpg';
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import ImageIcon from '@mui/icons-material/Image';
import IconButton from '@mui/material/IconButton';

import FileDownloadIcon from '@mui/icons-material/FileDownload';
const style = {
    position: 'absolute',
    top: '53%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "934px",
    height: "518px",
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: '14px',
    outline: 'none'
};
const GalleryStyle = {
    overflow: 'auto',
    marginTop: '10px', paddingBottom: '5px',

    '&::-webkit-scrollbar': {
        width: '5px',  // Adjust the width as desired
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'lightgray',  // Adjust the color as desired
        borderRadius: '4px',  // Adjust the border radius as desired
    },
}

const cardStyle = {
    height: 130,
    objectFit: 'cover',
    transition: 'transform 0.3s',
    '&:hover': {
        transform: 'scale(0.8)',
    },
}
const categoriesList = [

    { category: 'Bottles', imgUrl: Bottles },
    { category: 'Potted plant', imgUrl: Pottedplant },
    { category: 'Scale ', imgUrl: WScale },
    { category: 'Cup', imgUrl: cup },
    { category: 'Towel lying', imgUrl: Towel },
    { category: 'Door mat', imgUrl: doormat },
    { category: 'Fan', imgUrl: fan },
    { category: 'Bowl', imgUrl: Bowl },
    { category: 'Couch', imgUrl: couch },
    { category: 'Tv', imgUrl: Tv },
    { category: 'Phone', imgUrl: Phone },
    { category: 'Chairs', imgUrl: Chairs },
    { category: 'Remote', imgUrl: Remote },
    { category: 'Laptop', imgUrl: laptop },
    { category: 'Tea Table', imgUrl: TTable },
]
const AdminPage = () => {
    const isMobileView = useMediaQuery('(max-width: 900px)'); // Adjust the breakpoint as needed
    const [tabData, setTabData] = useState(null);
    const [loader, setLoader] = useState(false);
    const [open, setOpen] = useState(false);
    const [imageData, setImageData] = useState([]);
    const [userFlag,setUserflag]=useState(false);
    const [Selected, setSelected] = useState("");
    const [sortFlag,setSortflag] =useState(false);
    const [totalPage,setTotalpage] = useState(0);
    const [currentPage,setCurentpage] = useState(0);
console.log("tabData",tabData)
    useEffect(() => {
        setLoader(true)
        axios.get(`${baseURL}/api/admin/all/${currentPage}`)
            .then((res) => {
                console.log("res stories", res.data.stories);
                setLoader(false);
                // setTabData(res.data.stories);
                setTotalpage(res.data.totalPages)
                const updatedData = res.data.stories.map(obj => {
                    let totalUploads;
                  
                    if (obj.categoryAndScore.length === 1) {
                      totalUploads = obj.score / 2;
                    } else {
                      totalUploads = obj.score / (2 + (obj.categoryAndScore.length/18));
                    }
                  
                    return { ...obj, totalUploads };
                  });
                if(updatedData){
                    setTabData(updatedData);
                }

            }).catch((err) => {
                console.log('err', err);
                setLoader(false);
            })

    }, [userFlag,sortFlag,currentPage]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setImgFlag(false)

    }

    const handleView = (data) => {
        console.log("empId", data.empId);
        console.log("empName", data.empName);
        handleOpen();
    }

    const [imgFlag, setImgFlag] = useState(false)
    const handleImages = () => {
        setImgFlag(true)
        axios.get(`${baseURL}/api/image-upload/SI006423`)
            .then((res) => {
                console.log("res", res.data);
                setImageData(res.data)
            }).catch((err) => {
                console.log('err', err);
            })
    }
    const handleBackGallery = () => {
        setImgFlag(false);
    }

    const downloadZip = (row) => {
        const url = row.download;
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'file');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    }
    const [userName,setUserName]=useState('');
    
    const handleUserName = (e) =>{
        setUserName(e.target.value);
        setUserflag(!userFlag)

    }
    const handleUserSearch = () =>{
        const filteredUsers = tabData.filter((user) => {
            return user.empName.toLowerCase().includes(userName.toLowerCase());
          });
        if(filteredUsers){
            setTabData(filteredUsers);
        }
    }
    const handleChangeSort = (e) =>{
        setSelected(e.target.value)
        if(e.target.value == 'Name'){
           const nameSorted = tabData.sort((a, b) => a.empName.localeCompare(b.empName));
           setTabData(nameSorted);
        }else if(e.target.value == 'Total_Uploads'){
            const TotalUploadsSorted = tabData.sort((a, b) => b.totalUploads - a.totalUploads);
            setTabData(TotalUploadsSorted);
        }else if(e.target.value == 'Score'){
            const MaxScoreSorted = tabData.sort((a, b) => b.totalUploads - a.totalUploads);
            setTabData(MaxScoreSorted);
        }
        else{
            setSortflag(!sortFlag)
        }
        
    }
    const handleBackwrd = () =>{
        setCurentpage(currentPage - 1)
    }
    const handleforwrd = () =>{
        setCurentpage(currentPage + 1)
    }
    return (
        <>
            {isMobileView ? <Typography sx={{marginTop:'260px',display:'flex',fontWeight:'bold',justifyContent:'center',fontSize:'23px'}} variant="body1">Please open in desktop mode.</Typography>
                :
                <Box style={{ width: '95%', marginTop: '75px' }}>

                    <Grid container sx={{ paddingTop: '16px', display: 'flex', flexWrap: { md: 'nowrap' }, alignItems: { md: 'center' }, marginLeft: '34px', flexDirection: { xs: 'column', md: 'row' } }}>
                        <Grid item container xs={12} sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', columnGap: '16px' }}>
                            <TextField
                                id="outlined-basic"
                                label="User"
                                variant="outlined"
                                value={userName}
                                onChange={handleUserName}
                                size="small"
                                InputProps={{
                                    autoComplete: 'off',
                                }}
                                // InputLabelProps={{ shrink: true }}
                                sx={{
                                    width: { xs: '100%', md: '31%' },
                                }}
                            />
                            <Button
                                onClick={handleUserSearch}
                                sx={{
                                    width: { xs: '100%', md: 'auto' },
                                    height: '32px',
                                    backgroundColor: '#222939',
                                    textTransform: 'none',
                                }}
                                variant="contained"
                            >
                                Search
                            </Button>
                        </Grid>

                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: { md: 'flex-end' } }}>
                            <FormControl sx={{ m: 1, minWidth: 120, width: { xs: '100%', md: 200 } }} size="small">
                                <InputLabel id="demo-select-small-label">Sort</InputLabel>
                                <Select

                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    value={Selected}
                                    label="Age"
                                    onChange={handleChangeSort}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="Name">Name</MenuItem>
                                    <MenuItem value="Total_Uploads">Total Uploads</MenuItem>
                                    <MenuItem value="Score">Score</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <TableContainer sx={{
                        marginLeft: '29px', marginTop: '10px', maxHeight: '408px', overflow: 'auto', '&::-webkit-scrollbar': {
                            width: '5px',  // Adjust the width as desired
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: 'lightgray',  // Adjust the color as desired
                            borderRadius: '4px',  // Adjust the border radius as desired
                        },
                    }} component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="medium" stickyHeader aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold', background: 'bisque' }} align="center">Name</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', background: 'bisque' }} align="center">Total Uploads</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', background: 'bisque' }} align="center">Categories</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', background: 'bisque' }} align="center">Score</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', background: 'bisque' }} align="center">Download</TableCell>
                                    {/* <TableCell sx={{ fontWeight: 'bold',background: 'bisque' }} align="center">Action</TableCell>
                             */}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tabData && tabData.map((row) => (
                                    <TableRow key={row.empId}>
                                        <TableCell align="center" component="th" scope="row">
                                            {row.empName}
                                        </TableCell>
                                        <TableCell align="center">{Math.trunc(row.totalUploads)}</TableCell>
                                        <TableCell align="center">{row.categoryAndScore.length}</TableCell>
                                        <TableCell align="center">{row.score}</TableCell>
                                        <TableCell align="center"><Tooltip title={`${row.empName}_${row.empId}.zip`} arrow ><IconButton onClick={() => downloadZip(row)}><FileDownloadIcon sx={{
                                            color: 'black',
                                            '&:hover': {
                                                color: "blue"
                                            }
                                        }} /></IconButton></Tooltip></TableCell>
                                        {/* <TableCell align="center" onClick={() => handleView(row)} sx={{ cursor: 'pointer' }}><Tooltip title="View" arrow placement="right"><IconButton><ImageIcon sx={{
                                    color:'black',
                                    '&:hover': {
                                        color: "green"
                                    }
                                }} /></IconButton></Tooltip></TableCell>
                                <TableCell align="center">{`${row.empName}_${row.empId}.zip`}</TableCell> */}
                                    </TableRow>
                                ))}
                                {tabData == [] && (
                                    <TableRow>
                                        <TableCell colSpan={7} align="center">
                                            <b>No data found.</b>
                                        </TableCell>
                                    </TableRow>
                                )}
                                {loader && (
                                    <TableRow>
                                        <TableCell colSpan={7} align="center">
                                            <CircularProgress sx={{ color: 'rgb(34, 41, 57)' }} size={30} />
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Grid sx={{ display: 'flex', justifyContent: "center", alignItems: 'center', marginLeft: '29px', marginTop: '10px', columnGap: '25px' }}>
                        <ButtonBase disabled={currentPage === 0} onClick={handleBackwrd} sx={{ borderRadius: '50%', border: '2px solid', opacity: currentPage === 0 && '0.5' }}>
                            <Avatar sx={{ width: '17px', height: '17px', backgroundColor: 'white' }}>
                                <ArrowBackIosNewIcon sx={{ color: "black", width: '15px', height: '15px' }} />
                            </Avatar>
                        </ButtonBase>
                        <Typography sx={{ fontWeight: 'bold' }}>1</Typography>
                        <ButtonBase disabled={totalPage < 0 || totalPage > currentPage} onClick={handleforwrd} sx={{ borderRadius: '50%', border: '2px solid', opacity: (totalPage < 0 || totalPage > currentPage) && '0.5' }}>
                            <Avatar sx={{ width: '17px', height: '17px', backgroundColor: 'white' }}>
                                <ArrowForwardIosIcon sx={{ color: "black", width: '15px', height: '15px' }} />
                            </Avatar>
                        </ButtonBase>
                    </Grid>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={open}
                        // onClose={handleClose}
                        closeAfterTransition
                        slots={{ backdrop: Backdrop }}
                        slotProps={{
                            backdrop: {
                                timeout: 500,
                            },
                        }}
                    >
                        <Fade in={open}>
                            <Box sx={style}>
                                {/* <Button onClick={handleImages}>category</Button> */}
                                <Box>
                                    {imgFlag && <ArrowBackOutlinedIcon onClick={handleBackGallery} sx={{ position: 'absolute', top: '10px', left: '10px', cursor: 'pointer' }} />}
                                    <Typography sx={{ display: "flex", justifyContent: 'center', alignItems: 'center' }} variant="h6">Gallery</Typography>
                                    <ClearIcon onClick={handleClose} sx={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer' }} />
                                </Box>
                                {imgFlag ?
                                    <Grid container spacing={2} justifyContent="center" maxHeight='460px' sx={GalleryStyle}>
                                        {imageData.map((preview, index) => (

                                            <Grid item key={index}>
                                                <Card sx={{ width: 140, height: 140, boxShadow: '0px 2px 3px 0px' }}>
                                                    <div style={{ position: 'relative' }}>
                                                        <CardMedia
                                                            component="img"
                                                            height="140"
                                                            image={preview.filePath}
                                                            alt={`Preview ${index}`}
                                                            sx={{ objectFit: 'contain' }}
                                                        />
                                                    </div>
                                                </Card>
                                            </Grid>
                                        ))}
                                    </Grid>
                                    :
                                    <Grid maxHeight="460px" container spacing={2} justifyContent="center" sx={GalleryStyle}>
                                        {categoriesList.map((category, index) => (
                                            <Grid key={index} item>

                                                <Card onClick={handleImages} style={{ cursor: 'pointer', width: 156, height: 160, }}>
                                                    <CardMedia
                                                        sx={cardStyle}
                                                        image={category.imgUrl}
                                                        alt="cate_Image"

                                                    />
                                                    <CardContent sx={{ textAlign: 'center', padding: '4px', display: 'flex', justifyContent: "space-between" }} className='custom-card-content'>
                                                        <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '15px' }} component="div">
                                                            {category.category}
                                                        </Typography>
                                                        <CollectionsOutlinedIcon sx={{ width: '21px', height: '22px' }} />
                                                    </CardContent>
                                                </Card>

                                            </Grid>
                                        ))}
                                    </Grid>
                                }
                            </Box>
                        </Fade>
                    </Modal>
                </Box>
            }
        </>


    );
}
export default AdminPage