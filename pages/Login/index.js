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
    const [alertState, setAlertState] = useState('');
    const [user, setUser] = useState('');
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

            const { ok, name, authorization } = data;
            
            if (ok) {
                dispatch({
                    type: 'UPDATE_USER',
                    user: {
                        name, authorization
                    }
                });
                console.log('retorno', data);

                router.push('/Dashboard');
                setLoading(false);
                return;
            }
        }
        catch (error) {
            console.log(error);

            setAlertState({
                text: 'Erro ao logar. Por favor, revise os dados e tente novamente.',
                severity: 'error',
                open: true,
                close: setAlertState
            });
        }

        setLoading(false);
    }

    return (
        <>
            <Header />
            <Menu loading={loading}/>
            <form id="content-login" onSubmit={handleLogin}>
                <Alert
                    state={alertState}
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
                            onChange={e => setUser(e.target.value)}
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