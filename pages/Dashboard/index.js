import { useState } from 'react';
import Link from 'next/link';
import { AccountCircle } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import Header from '../../components/Header';
import Menu from '../../components/MenuAdmin';
import Input from '../../components/Input';
import Button from '../../components/ButtonPrimary';
import Alert from '../../components/Alert';

export default function Login() {
    const [loading, setLoading] = useState(false);
    const [alertText, setAlertText] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');
    const [openAlert, setOpenAlert] = useState(false);

    const store = useSelector(state => state);

    console.log('chegando ---->', store);

    return (
        <>
            <Header />
            <Menu dashboard={true}/>
            <content id="content-login">
                <Alert
                    open={openAlert}
                    close={setOpenAlert}
                    text={alertText}
                    severity={alertSeverity}
                />

                <div className="container">
                    <h1>Dashboard</h1>
                </div>
            </content>
        </>
    )
}