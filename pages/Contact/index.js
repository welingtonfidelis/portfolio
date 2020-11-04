import { useState } from 'react';
import { LinkedIn, YouTube, GitHub } from '@material-ui/icons'
import { CircularProgress } from '@material-ui/core';
import axios from 'axios';

import Header from '../../components/Header';
import Menu from '../../components/Menu';
import Alert from '../../components/Alert';

export default function About() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [load, setLoad] = useState(false);
    const [alertState, setAlertState] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();

        setLoad(true);

        try {
            const { data } = await axios.post('../api/mailSender', {
                from: email, 
                subject: `Contato profissional - ${name}`, 
                html: message
            });

            if (data.ok) {
                const msg = `Olá <strong>${name}</strong>. <br/>` +
                    `Este email é apenas uma confirmação de que recebi sua mensagem. <br/>` +
                    `Logo entrarei em contato.`;

                axios.post('../api/mailSender', {
                    to: email, 
                    subject: 'Email recebido', 
                    html: msg
                });

                setAlertState({
                    text: 'Mensagem enviada com sucesso.',
                    severity: 'success',
                    open: true,
                    close: setAlertState
                });

                setName('');
                setEmail('');
                setMessage('');
            }
            else errorSendMail();

        } catch (error) {
            console.log(error);
            errorSendMail();
        }

        setLoad(false);
    }

    const errorSendMail = () => {
        setAlertState({
            text: 'Sinto muito. Houve um erro ao enviar sua mensagem.',
            severity: 'error',
            open: true,
            close: setAlertState
        });
    }

    return (
        <>
            <Header />
            <Menu page="contact" />

            <content id="content-contact">
                <Alert
                    state={alertState}
                />

                <div className="content-mail">
                    <strong>Vamos conversar</strong>

                    <form className="card-mail" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Seu nome"
                            value={name}
                            onChange={event => setName(event.target.value)}
                            required
                        />
                        <input
                            type="email"
                            placeholder="Seu email"
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                            required
                        />
                        <textarea
                            cols="30"
                            rows="10"
                            placeholder="Sua mensagem"
                            value={message}
                            onChange={event => setMessage(event.target.value)}
                            required
                        />

                        {
                            load
                                ?
                                <div className="button-contact">
                                    <CircularProgress size={18} />
                                </div>
                                :
                                <button className="button-contact">
                                    Enviar
                                </button>
                        }
                    </form>
                </div>

                <footer>
                    <a
                        href="https://www.linkedin.com/in/welington-fidelis-de-sousa-3944a6127"
                        target="__blank"
                    >
                        <LinkedIn />
                    </a>
                    <a
                        href="https://github.com/welingtonfidelis"
                        target="__blank"
                    >
                        <GitHub />
                    </a>
                    <a
                        href="https://www.youtube.com/channel/UCNlGJFOOjLwCtlvVbxV05qQ?view_as=subscriber"
                        target="__blank"
                    >
                        <YouTube />
                    </a>
                </footer>
            </content>
        </>
    )
}