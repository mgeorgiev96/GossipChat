import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent:'center',
    alignItems:'center',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
    position:'absolute',
    top: "10px",
    right: "10px"
  },
}));

function Spinner(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress style={{'color':'#1D976C'}} />
      <span style={{'color':'#1D976C'}}>{props.action}</span>
    </div>
  );
}

export default Spinner;