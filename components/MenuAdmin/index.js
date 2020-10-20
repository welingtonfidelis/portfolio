import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { ArrowBack, ExitToApp } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';

export default function MenuAdmin({ dashboard }) {
    const router = useRouter();
    const store = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {
        if (dashboard) {
            const { authorization } = store;

            if (authorization === '') router.back();
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
            {
                dashboard 
                ? <div className="button">Seja bem vindo, {store.name}</div>
                : <div className="button" onClick={handleBack}>
                    <ArrowBack />
                    <strong>VOLTAR</strong>
                </div>
            }

            {
                dashboard &&
                <div className="button" onClick={handleExit}>
                    <strong>SAIR</strong>
                    <ExitToApp />
                </div>
            }
        </nav>
    )
}