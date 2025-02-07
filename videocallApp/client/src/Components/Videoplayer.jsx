import React, { useContext } from 'react'
import { Paper, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Socketcontext } from '../SocketContext';






const useStyles = makeStyles((theme) => ({
  video: {
    width: '550px',
    [theme.breakpoints.down('xs')]: {
      width: '300px',
    },
  },
  gridContainer: {
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  paper: {
    padding: '10px',
    border: '2px solid black',
    margin: '10px',
  },
}));
const Videoplayer = () => {
  const { call, callAccepted, myVideo, userVideo,  name, callEnded } = useContext(Socketcontext)
  const classes = useStyles()
  
  
  return (
    <>
      <Grid container className={classes.gridContainer}>
     
           
            <Paper className={classes.paper}>
              <Grid item xs={12} md={6}>
                <Typography variant="h5" gutterBottom>{name || 'name'}</Typography>
                <video playsInline muted ref={myVideo} autoPlay className={classes.video} />

              </Grid>

            </Paper>
          
        {
        
          callAccepted &&  (
            <Paper className={classes.paper}>
              <Grid item xs={12} md={6}>
                <Typography variant="h5" gutterBottom>{call.name || 'name'}</Typography>
                <video playsInline  ref={userVideo} autoPlay className={classes.video} />

              </Grid>

            </Paper>
          )
        }

      </Grid>
    </>

  )
}

export default Videoplayer
