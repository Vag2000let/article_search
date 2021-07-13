import {useDispatch, useSelector} from "react-redux";
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Pagination from '@material-ui/lab/Pagination';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {deleteFetchItem} from "../toolkitRedux/fetchReducer";
import ModalWindow from "./ModalWindow";
import {store} from "../toolkitRedux";
import {usePaginationWiki} from "./usePaginationWiki";


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
        color: theme.palette.text.secondary,
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
        right: theme.spacing(0),
        top: theme.spacing(0),
        color: theme.palette.grey[500],
    },

}));

function Texts() {
    const wikiTexts = useSelector(state => state.fetch.fetchTexts)

    // Подписка
    store.subscribe(() => {
        localStorage.setItem('wikis', JSON.stringify(store.getState()))
    })

    const myHook = usePaginationWiki()

    const classes = useStyles();
    const dispatch = useDispatch();
    const deleteHandler = (e) => {
        dispatch(deleteFetchItem(e))
    }

    return (
        <Grid container className={classes.root}>
            {myHook.items && myHook.items.map((item) => (
                <Grid key={item.id} xs={12} item className={classes.root}>
                    <Paper key={item.id} className={classes.paper}>
                        <Button
                            key={item.id}
                            color={item.color}
                            onClick={myHook.changeColor.bind(this, item)}
                        >
                            {item.title}
                        </Button>
                    </Paper>
                    <Paper className={classes.paper}>
                        <Button target={"_blank"} href={item.url} variant="text" color="primary">
                            Перейти к статье
                        </Button>
                        <Button variant="text" color="secondary"
                                onClick={deleteHandler.bind(this, item.id)}>Удалить</Button>
                    </Paper>
                </Grid>
            ))}
            {!!wikiTexts.length &&
                <Grid item xs={12} className={classes.pagination}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={myHook.pageLength}
                            onChange={(e) => myHook.setPageLength(e.target.value)}
                        >
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                        </Select>
                    </FormControl>
                    <Pagination count={myHook.totalPages} page={myHook.page} onChange={myHook.handleChange}/>
                    <ModalWindow title={myHook.currentItem} modalClose={myHook.closeModal}/>
                </Grid>
            }
        </Grid>
    )
}

export default React.memo(Texts);