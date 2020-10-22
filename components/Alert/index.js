import { useState } from 'react';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

export default function Alert({ state }) {
    const {
        open, close, time = 6000,
        vertical = 'bottom', horizontal = 'right',
        severity = "success", text
    } = state;

    function handleClose() {
        close({
            ...state,
            open: false
        });
    }

    return (
        <Snackbar
            open={open}
            // autoHideDuration={time}
            onClose={() => handleClose()}
            anchorOrigin={{ vertical, horizontal }}
        >
            <MuiAlert
                elevation={6}
                variant="filled"
                onClose={() => handleClose()}
                severity={severity}
            >
                {text}
            </MuiAlert>
        </Snackbar>
    )
}