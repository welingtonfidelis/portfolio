import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import Header from '../../components/Header';
import Menu from '../../components/MenuAdmin';
import Button from '../../components/ButtonPrimary';
import Alert from '../../components/Alert';

export default function Login() {
    const [loading, setLoading] = useState(false);
    const [alertText, setAlertText] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');
    const [openAlert, setOpenAlert] = useState(false);

    const store = useSelector(state => state);

    console.log('chegando ---->', store);

    useEffect(() => {
        getSkills();
    }, []);

    const getSkills = async () => {
        setLoading(true);

        try {
            const { data } = await axios.get(
                '../api/getSkill',
                { headers: { authorization: store.authorization } }
            );

            console.log('RETORNO', data);
        }
        catch (error) {
            console.log(error);
        }

        setLoading(false);
    }

    return (
        <>
            <Header />
            <Menu validateToken={true} loading={loading} />
            <content id="content-skills">
                <Alert
                    open={openAlert}
                    close={setOpenAlert}
                    text={alertText}
                    severity={alertSeverity}
                />

                <div className="container">
                    <div className="skills-button-new">
                        <Button label="Entrar" loading={loading} />
                    </div>

                    <h1>skills</h1>
                </div>
            </content>
        </>
    )
}