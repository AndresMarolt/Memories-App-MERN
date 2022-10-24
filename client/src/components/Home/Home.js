import React, {useEffect, useState} from 'react'
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import { getPosts } from '../../actions/posts'
import Pagination from '../Pagination'

import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core'
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from 'react-router-dom'
import ChipInput from 'material-ui-chip-input'

import useStyles from './styles'

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {

    const dispatch = useDispatch();
    const [currentId, setCurrentId] = useState(null);
    const query = useQuery();
    const history = useHistory();

    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const classes = useStyles();
    

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch, currentId]);

  return (
    <Grow in>
        <Container maxWidth="xl">
            <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                <Grid item xs={12} sm={6} md={9}>
                    <Posts setCurrentId={setCurrentId}/>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <AppBar className={classes.appBarSearch} position="static" color="inherit" >
                        <TextField 
                            name="search" 
                            variant="outlined" 
                            label="Search Memories"
                            fullWidth
                            value="TEST"
                            onChange={() => {}}
                        />
                    </AppBar>
                    <Form currentId={currentId} setCurrentId={setCurrentId}/>

                    <Paper elevation={6}>
                        <Pagination />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    </Grow>
  )
}

export default Home;