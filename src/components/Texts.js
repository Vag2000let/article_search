import {connect, useDispatch} from "react-redux";
import React, {useState, useMemo, useEffect, useCallback} from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Pagination from '@material-ui/lab/Pagination';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import {Divider} from "@material-ui/core";
import {deleteFetchItem, fetchModalText} from "../redux/actions";
import Loader from "./Loader";


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
    margin: 0,
    padding: theme.spacing(2),
    color: theme.palette.text.secondary
  },
  pagination: {
    '& > *': {
      marginTop: theme.spacing(3),
    },
    display: 'flex',
    justifyContent: 'flex-end',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 60,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(0),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },

}));

function Texts({wikiTexts}, {modalTexts}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const deleteHandler = (e) => {
    dispatch(deleteFetchItem(e))
  }

  const [page, setPage] = useState(1)
  const [pageLength, setPageLength] = useState(5)
  const totalPages = Math.ceil(wikiTexts && wikiTexts.length / pageLength)

  const items = useMemo(
    () => wikiTexts && wikiTexts.filter((item, key) => {
      if ((page - 1) * pageLength <= key && key < page * pageLength)
        return true;
      return false;
    }), [page, wikiTexts, pageLength]
  );
  // console.log("I am items", items)

  useEffect(() => {
    setPage(1);
  }, [pageLength]);

  const handleChange = useCallback((event, value) => {
    setPage(value)
  }, []);

  // MODAL WINDOW
  const DialogContent = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiDialogContent);


  const [open, setOpen] = useState(false);

  const handleClickOpen = (title) => {
    dispatch(fetchModalText(title))
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // if (wikiTexts === undefined && wikiTexts === 0) {
  //   return (<div className={classes.root}>
  //     <Grid container spacing={2}>
  //       <Grid item xs={12}>
  //         <Paper className={classes.paper}>Результатов пока нет</Paper>
  //       </Grid>
  //     </Grid>
  //   </div>)
  return (
    <Grid container className={classes.root}>
      {items && items.map((item) => (
        <Grid key={item.id} xs={12} item className={classes.root}>
          <Paper className={classes.paper}>
            <Button onClick={handleClickOpen.bind(this, item.title)}>{item.title}</Button>
            <Dialog onClick={handleClose} aria-labelledby="customized-dialog-title" open={open}>
              <DialogTitle style={{textAlign: "center"}} onClick={handleClose}>
              </DialogTitle>
              <Divider/>
              <DialogContent>
                <Loader/>
                {modalTexts && modalTexts.pop()}
              </DialogContent>
              <Divider/>
              <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
                <CloseIcon/>
              </IconButton>
            </Dialog>
          </Paper>
          <Paper className={classes.paper}>
            <Button target={"_blank"} href={item.url} variant="text" color="primary">Перейти к статье</Button>
            <Button variant="text" color="secondary" onClick={deleteHandler.bind(this, item.id)}>Удалить</Button>
          </Paper>
        </Grid>
      ))}
    <Grid item xs={12} className={classes.pagination}>
      <FormControl variant="outlined" className={classes.formControl}>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={pageLength}
          onChange={(e) => setPageLength(e.target.value)}
        >
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
        </Select>
      </FormControl>
      <Pagination count={totalPages} page={page} onChange={handleChange}/>
    </Grid>
    </Grid>
  );
}

const makeStateToProps = (state) => {
  return {
    wikiTexts: state.fetchTexts,
    modalTexts: state.fetchModalTexts
  }
}

export default connect(makeStateToProps)(Texts)