import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import {useSelector} from "react-redux";



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
    justifyContent: "center"
  },
}));
export default function CircularIndeterminate() {
  const classes = useStyles();

  const loading = useSelector(state => state.loading.loading)

    if (loading) {
      return (
        <div className={classes.root}>
          <CircularProgress color="secondary" />
        </div>
      );
    }
    return null
}
