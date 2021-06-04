import {connect, useDispatch} from "react-redux";
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {deleteFetchItem} from "../redux/actions";


function Texts({wikiTexts}) {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      verticalAlign: "baseline",
      paddingTop: "1rem"
    },
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
    },
  }));
  const classes = useStyles();

  const dispatch = useDispatch();
  const deleteHandler = (e) => {
    dispatch(deleteFetchItem(e))
  }

  if (wikiTexts === undefined || wikiTexts.length === 0) {
    return (
      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>Результатов пока нет</Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
  return (
    <div className={classes.root}>
      <Grid container className={classes.root}>
        <Grid container spacing={2}>
          {[0].map((value) => (
            wikiTexts.map(item =>
              <Grid key={item.title} xs={12} item className={classes.root}>
                <Paper className={classes.paper}>
                  <Button variant="text">{item.title}</Button>
                </Paper>
                <Paper className={classes.paper}>
                  <Button href={item.url} variant="text" color="primary">Перейти к статье</Button>
                  <Button variant="text" color="secondary" onClick={deleteHandler.bind(this, item.id)}>Удалить</Button>
                </Paper>
              </Grid>
            )
          ))}
        </Grid>
      </Grid>
    </div>
  );
}

const makeStateToProps = (state) => {
  return {
    wikiTexts: state.fetchTexts
  }
}

export default connect(makeStateToProps)(Texts)