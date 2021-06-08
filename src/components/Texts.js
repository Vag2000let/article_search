import {connect, useDispatch} from "react-redux";
import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {deleteFetchItem} from "../redux/actions";
import Pagination from '@material-ui/lab/Pagination';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: 'space-between',
    alignItems: "baseline",
    verticalAlign: "baseline",
    paddingTop: "1rem",

  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary
  },
  pagination: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
    display: 'flex',
    justifyContent: 'flex-end'
  }
}));

function Texts({wikiTexts}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const deleteHandler = (e) => {
    dispatch(deleteFetchItem(e))
  }

  const [page, setPage] = useState(1)
  const pageLength = 5
  const totalPages = Math.ceil(wikiTexts && wikiTexts.length / pageLength)
  const totalItems = wikiTexts && wikiTexts.length

  const items = []
  for (let i = 0 ; i < totalItems; i++) {
    if (i < pageLength) {
      items.push(wikiTexts[i])
    }
  }
  console.log("I am items", items)

  const handleChange = (event, value) => {
    setPage(value)

  }

  // if (wikiTexts === undefined && wikiTexts.length === 0) {
  //     return <div className={classes.root}>
  //       <Grid container spacing={2}>
  //         <Grid item xs={12}>
  //           <Paper className={classes.paper}>Результатов пока нет</Paper>
  //         </Grid>
  //       </Grid>
  //     </div>
  // }

  return (
    <Grid container className={classes.root}>
      <Grid container spacing={2}>
        {items && items.map((item) => (
            <Grid key={item.id} xs={12} item className={classes.root}>
              <Paper className={classes.paper}>
                <Button variant="text">{item.title}</Button>
              </Paper>
              <Paper className={classes.paper}>
                <Button href={item.url} variant="text" color="primary">Перейти к статье</Button>
                <Button variant="text" color="secondary" onClick={deleteHandler.bind(this, item.id)}>Удалить</Button>
              </Paper>
            </Grid>
          ))}
          <Grid item xs={12} className={classes.pagination}>
            <Pagination count={totalPages} page={page} onChange={handleChange} />
          </Grid>
      </Grid>
    </Grid>
  );
}

const makeStateToProps = (state) => {
  return {
    wikiTexts: state.fetchTexts
  }
}

export default connect(makeStateToProps)(Texts)