import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { CardActionArea, CardMedia, Grid, TextField } from '@mui/material';
import { Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SET_CATEGORY } from '../redux/actionTypes';
import fan from '../assets/Fan.jpg';
import Bottles from '../assets/bottels.jpg';
import Bowl from '../assets/Bowl.jpg';
import WScale from '../assets/weightScale.jpg';
import Pottedplant from '../assets/plottedplants.jpg';
import cup from '../assets/Cup.jpg';
import TTable from '../assets/teaTable.jpg';
import couch from '../assets/couch.jpg';
import doormat from '../assets/Doormat.jpg';
import Towel from '../assets/Towellying.jpg';

import './View.css'
const categorys = [
    { title: 'Fan' },
    { title: 'Bottles' },
    { title: 'Potted plant' },
    { title: 'Scale' },
    { title: 'Towel lying' },
    { title: 'Door mat' },
    { title: 'Bowl' },
    { title: 'Couch' },
    { title: 'Tea Table' },
    { title: 'Cup' },
    
    
]

// const categoriesList = [
//     'Category#1',
//     'Category#2',
//     'Category#3',
//     'Category#4',
//     'Category#5',
//     'Category#6',
//     'Category#7',
//     'Category#8',
//     'Category#9',
//     'Category#10',
//     'Category#11',
//     'Category#12',
//     'Category#13',
//     'Category#14',
//     'Category#15',
//     'Category#16',
//     'Category#17',
//     'Category#18',
// ];

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
    { category: 'Tea Table', imgUrl: TTable },
]
export default function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const filterOptions = createFilterOptions({
        matchFrom: 'start',
        stringify: (option) => option.title,
    });
    const [selectedCategory, setSelectedCategory] = React.useState(null);
    const handleCategoryClick = (category) => {
        dispatch({ type: SET_CATEGORY, payload: category })
        navigate('/upload');

    };
    const handleAutocompleteChange = (event, value) => {
        setSelectedCategory(value);
    };
    const filteredCategories = selectedCategory
        ? categoriesList.filter((category) =>
            category.category.includes(selectedCategory.title)
        )
        : categoriesList;
    console.log("selected", filteredCategories)
    return (
        <>
                <Container >
                    <Box sx={{ marginTop: '100px', marginBottom: '16px' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' ,flexDirection:'column',rowGap:'17px'}}>
                            <Autocomplete
                                id="filter-demo"
                                options={categorys}
                                size="small"
                                fullWidth
                                onChange={handleAutocompleteChange}
                                getOptionLabel={(option) => option.title}
                                filterOptions={filterOptions}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="Search Category" />}
                            />
                            <Typography variant='h6' sx={{fontWeight:'600'}}>Select category to upload</Typography>
                        </Box>
                        <Grid overflow="auto" maxHeight="70vh" container spacing={2} sx={{ marginTop: '10px',marginBottom:'10px' }}>
                            {filteredCategories.map((category, index) => (
                                // <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                                //     <CardActionArea onClick={() => handleCategoryClick(category)}>
                                //         <Card style={{ cursor: 'pointer' }}>
                                //             <CardContent>
                                //                 <Typography variant="h6" component="div">
                                //                     {category}
                                //                 </Typography>
                                //             </CardContent>
                                //         </Card>
                                //     </CardActionArea>
                                // </Grid>
                                <Grid key={index} item xs={6} sm={6} md={4} lg={3}>
                                    <CardActionArea onClick={() => handleCategoryClick(category.category)}>
                                        <Card style={{ cursor: 'pointer', height: '155px'}}>
                                            <CardMedia
                                                component="img"
                                                height="120"
                                                image={category.imgUrl}
                                                alt="fan Image"
                                                sx={{objectFit:'contain'}}
                                            />
                                            <CardContent sx={{ textAlign: 'center', padding: '4px' }} className='custom-card-content'>
                                                <Typography variant="h6" sx={{fontWeight:'bold',fontSize:'1rem'}} component="div">
                                                    {category.category}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </CardActionArea>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Container>
                
        </>
    );
}
