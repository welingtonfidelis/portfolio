import { useState } from 'react';
import { useRouter } from 'next/router';
import { AccountCircle } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
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
    const [user, sertUser] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogin = async (e) => {
        setLoading(true);
        
        e.preventDefault();

        try {
            const { data } = await axios.post('../api/login', {
                user,
                password
            });

            console.log('retorno', data);
            const { ok, name, authorization } = data;

            if (ok) {
                dispatch({
                    type: 'UPDATE_USER',
                    user: {
                        name, authorization
                    }
                });

                router.push('/Dashboard');
                setLoading(false);
                return;
            }
        }
        catch (error) {
            console.log(error);

            setAlertText('Erro ao logar. Revise os dados e tente novamente.');
            setAlertSeverity('error');
            setOpenAlert(true);
        }

        setLoading(false);
    }

    return (
        <>
            <Header />
            <Menu />
            <form id="content-login" onSubmit={handleLogin}>
                <Alert
                    open={openAlert}
                    close={setOpenAlert}
                    text={alertText}
                    severity={alertSeverity}
                />

                <div className="container">
                    <div className="login-user-icon">
                        <AccountCircle />
                    </div>

                    <span className="login-welcome-text">
                        Olá administrador. Por favor, Insira seu usuário e senha abaixo.
                    </span>

                    <div className="login-input">
                        <Input 
                            label="Usuário" 
                            name="username" 
                            required 
                            onChange={e => sertUser(e.target.value)}
                        />

                        <Input 
                            label="Senha" 
                            name="password" 
                            type="password" 
                            required 
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="login-button">
                        <Button label="Entrar" loading={loading} />
                    </div>
                </div>
            </form>
        </>
    )
}