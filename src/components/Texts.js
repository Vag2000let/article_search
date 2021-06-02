import {connect} from "react-redux";
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


function Texts({wikiTexts}) {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      fontSize: "1em",
      color: theme.palette.text.secondary,
      justifyContent: "flex-start"
    },
  }));
  const classes = useStyles();

  if (wikiTexts === undefined || wikiTexts.length === 0) {
    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>Результатов пока нет</Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
  const wikiTitle = (
    wikiTexts.map(title =>
      <Paper key={title.index} className={classes.paper}>
        {title.title}
      </Paper>
    )
  )
  const wikiURL = (
    <Grid>
      {wikiTexts.map(url =>
        <Paper key={url.index} className={classes.paper}>
          {url.url}
        </Paper>
      )}
    </Grid>
  )
  return (
    <div className={classes.root}>
      <Grid container spacing={10}>
        <Grid item xs={6}>
          {wikiTitle}
        </Grid>
        <Grid item xs={6}>
          {wikiURL}
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

export default connect(makeStateToProps, null)(Texts)