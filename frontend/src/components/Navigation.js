import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import {Button} from '@material-ui/core';

import React from 'react';
import { Link, useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 0,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        padding: '0 30px',
    },
    title:{
        fontWeight: "bold",
        flexGrow: 1,
    },
    menuButton:{
        color: 'white'
    }
  });

function Navigation(){
    const classes = useStyles();

    return (
      <div>
        <AppBar className={classes.root} position="static">
          <Toolbar >
            <Link to="/">
                <IconButton edge="start" className={classes.menuButton}>
                    <HomeIcon />
                </IconButton>
            </Link>
            <Typography variant="h6" className={classes.title}>
              Ah Crud...
            </Typography>
            <Link to="/About">
                <IconButton className={classes.menuButton}> 
                    <InfoIcon/>
                </IconButton>
            </Link>
          </Toolbar>
        </AppBar>
      </div>
    );










    // return(
    //     <>
    //         <div className="navigation">
    //             <h1 id="siteName">Ah Crud...</h1>
    //             <Button onClick={goHome}><HomeIcon color="primary" /></Button>
    //             <Button onClick={goAbout}><InfoIcon color="primary"/></Button>
    //         </div>
    //     </>
    // )
}

export default Navigation;