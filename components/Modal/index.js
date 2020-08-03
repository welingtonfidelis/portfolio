import { Modal, Fade, Backdrop } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { HighlightOff } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function ModalFunc({ children, open, close }) {
    const classes = useStyles();

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={() => close(false)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <div id="content-modal">
                    <div onClick={() => close(false)}>
                        <HighlightOff color="#fff"/>
                    </div>

                    {children}
                </div>

            </Fade>
        </Modal>
    )
}