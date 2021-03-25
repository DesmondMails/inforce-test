import React from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {NavLink} from "react-router-dom";
import Grid from "@material-ui/core/Grid";

const Navbar = () => {
    return (
        <AppBar color={'primary'} position="static">
            <Toolbar >
                <Grid container justify={"space-between"}>
                    <Typography variant='h6' component='h1'>
                        Fox Mykyta
                    </Typography>

                    <Button variant={"contained"} color={"secondary"} component={NavLink} to={`/`}>
                       to List
                    </Button>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;