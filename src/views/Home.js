import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { CardActionArea, Grid, TextField } from '@mui/material';
import { Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const categorys = [
    { title: 'Category#1' },
    { title: 'Category#2' },
    { title: 'Category#3' },
    { title: 'Category#4' },
    { title: 'Category#5' },
    { title: 'Category#6' },
    { title: 'Category#7' },
    { title: 'Category#8' },
    { title: 'Category#9' },
    { title: 'Category#10' },
    { title: 'Category#11' },
    { title: 'Category#12' },
    { title: 'Category#13' },
    { title: 'Category#14' },
    { title: 'Category#15' },
    { title: 'Category#16' },
    { title: 'Category#17' },
    { title: 'Category#18' },
]

const categoriesList = [
    'Category#1',
    'Category#2',
    'Category#3',
    'Category#4',
    'Category#5',
    'Category#6',
    'Category#7',
    'Category#8',
    'Category#9',
    'Category#10',
    'Category#11',
    'Category#12',
    'Category#13',
    'Category#14',
    'Category#15',
    'Category#16',
    'Category#17',
    'Category#18',
];

export default function Home() {
    const navigate = useNavigate();
    const filterOptions = createFilterOptions({
        matchFrom: 'start',
        stringify: (option) => option.title,
    });
    const [selectedCategory, setSelectedCategory] = React.useState(null);
    const handleCategoryClick = (category) => {
        console.log(`Clicked category: ${category}`);
        navigate('/upload');

    };
    const handleAutocompleteChange = (event, value) => {
        setSelectedCategory(value);
    };
    const filteredCategories = selectedCategory
        ? categoriesList.filter((category) =>
            category.includes(selectedCategory.title)
        )
        : categoriesList;
    console.log("selected", filteredCategories)
    return (
        <>

            <Container>
                <Box sx={{ my: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Autocomplete
                            id="filter-demo"
                            options={categorys}
                            size="small"
                            fullWidth
                            onChange={handleAutocompleteChange}
                            getOptionLabel={(option) => option.title}
                            filterOptions={filterOptions}
                            sx={{ width: 300, marginTop: '25px' }}
                            renderInput={(params) => <TextField {...params} label="Filter" />}
                        />
                    </Box>
                    <Grid container spacing={2} sx={{ marginTop: '35px' }}>
                        {filteredCategories.map((category, index) => (
                            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                                <CardActionArea onClick={() => handleCategoryClick(category)}>
                                    <Card style={{ cursor: 'pointer' }}>
                                        <CardContent>
                                            <Typography variant="h6" component="div">
                                                {category}
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
