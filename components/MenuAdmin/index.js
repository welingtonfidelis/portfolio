import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { ArrowBack, ExitToApp } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';

import Load from '../Load';

export default function MenuAdmin({ showName, validateToken, loading }) {
    const router = useRouter();
    const store = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {
        if (validateToken) {
            const { authorization } = store;

            // if (authorization === '') router.back();
        }
    }, []);

    const handleExit = () => {
        dispatch({
            type: 'CLEAR_USER'
        });

        router.back();
    }

    const handleBack = () => {
        router.back()
    }

    return (
        <nav id="menu-admin">
            <div className="menu-admin-option">
                {
                    showName
                        ? <div className="button">Seja bem vindo, {store.name}</div>
                        : <div className="button" onClick={handleBack}>
                            <ArrowBack />
                            <strong>VOLTAR</strong>
                        </div>
                }

                {
                    showName &&
                    <div className="button" onClick={handleExit}>
                        <strong>SAIR</strong>
                        <ExitToApp />
                    </div>
                }
            </div>

            <div className="menu-admin-load">
                <Load loading={loading} />
            </div>
        </nav>
    )
}