import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Loader from "./Loader";
// import {deleteModalText,fetchModal} from "../redux/actions";
import {fetchModalAction} from "../toolkitRedux/fetchReducer";

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const {children, classes, onClose, ...other} = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon/>
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);


function ModalWindow(props) {
    const dispatch = useDispatch();
    const modalTexts = useSelector(state => state.fetch.fetchModalTexts)
    const handleClose = () => {
        props.modalClose();
    };

    useEffect(() => {
        if (props.title !== undefined) {
            dispatch(fetchModalAction(props.title));
        }
    }, [props.title, dispatch]);
    // console.log("I am ModalWindow")

    return (
        <div>
            <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={!!props.title}
            >
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {props.title}
                </DialogTitle>
                <DialogContent dividers>
                    <Loader/>
                    <div dangerouslySetInnerHTML={{__html: modalTexts && modalTexts}}/>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default React.memo(ModalWindow)