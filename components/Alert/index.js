import { useState } from 'react';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

export default function Alert(props) {
    const {
        open, close, time = 6000,
        vertical = 'bottom', horizontal = 'right',
        severity = "success", text
    } = props;
    
    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    return (
        <Snackbar
            open={open}
            // autoHideDuration={time}
            onClose={() => close(false)}
            anchorOrigin={{ vertical, horizontal }}
        >
            <Alert onClose={() => close(false)} severity={severity}>
                {text}
            </Alert>
        </Snackbar>
    )
}