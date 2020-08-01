import { useState } from 'react';
import api from '../../services/api';
import { LinkedIn, YouTube, GitHub } from '@material-ui/icons'
import { CircularProgress } from '@material-ui/core';

import Menu from '../../components/Menu';

export default function About() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [load, setLoad] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();

        setLoad(true);
        const body = {
            "mailFrom": email,
            "mailTo": "welingtonfidelis@gmail.com",
            "message": message,
            "subject": `${name}, ${email}`
        }

        const { data } = await api.post(`/sendmail/sendgrid`, body);

        if (data.status) {
            setName('');
            setEmail('');
            setMessage('');
        }

        setLoad(false);
    }


    return (
        <>
            <Menu page="contact" />

            <content id="content-contact">
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