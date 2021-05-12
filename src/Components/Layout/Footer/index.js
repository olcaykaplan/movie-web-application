import React from 'react';
import {Grid, Box, Container, Typography} from '@material-ui/core';

const Footer = () =>(
    <footer>
         <Grid container justify="center">
               <Box>
                    <Typography>Contact Us</Typography>
                    </Box>
                    <Box>
                    <Typography>&copy; </Typography>
                    </Box>
         </Grid>
    </footer>
) 

export default Footer;