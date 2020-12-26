import { Send, HighlightOff, Chat, KeyboardArrowDown } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import Input from '../../components/Input';
import Button from '../../components/ButtonPrimary';

import utils from '../../utils';

export default function ChatComponent() {
    const [name, setName] = useState('teste');
    const [email, setEmail] = useState('teste@email.com');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const chat = useSelector(state => state.chat);

    const showChat = () => {
        dispatch({
            type: 'SHOW_CHAT',
        });
    }

    const handleStartChat = async (e) => {
        e.preventDefault();

        try {
            console.log(name, email);
            dispatch({
                type: 'UPDATE_CHAT_USER',
                id: 111,
                name,
                email
            });

        } catch (error) {
            console.log(error);
        }
    }

    const handleCloseChat = () => {
        try {
            setName('');
            setEmail('');

            dispatch({
                type: 'CLEAR_USER'
            });

            showChat();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div id="content-chat">
            {
                chat.show
                    ? <div onClick={showChat} className="minimized-chat">
                        <Chat />
                    </div>

                    : <div className="container-chat">
                        <div className="header-chat">
                            <div
                                className="left-button"
                                onClick={showChat}
                            >
                                {chat.name !== '' && <KeyboardArrowDown />}
                            </div>
                            <div
                                className="right-button"
                                onClick={handleCloseChat}
                            >
                                <HighlightOff />
                            </div>
                        </div>
                        {chat.name === ''
                            ? <form onSubmit={handleStartChat}>
                                <strong>Que ótimo. Só preciso saber um pouco mais sobre você.</strong>

                                <Input
                                    label="Nome"
                                    name="name"
                                    required
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />

                                <Input
                                    label="Email"
                                    name="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />

                                <div className="chat-start-button">
                                    <Button label="Começar" loading={loading} />
                                </div>
                            </form>

                            : <div className="messages-chat">
                                <content>
                                    {
                                        chat.messages.map((item, index) => {
                                            const className = item.id === chat.id
                                                ? 'message-item-send'
                                                : 'message-item-receive'

                                            return (
                                                <div className={className} key={index}>
                                                    <span>{item.text}</span>
                                                    <strong>
                                                        {utils.maskTime(new Date(item.date))}
                                                    </strong>
                                                </div>
                                            )
                                        })
                                    }
                                </content>

                                <form>
                                    <Input
                                        name="text-message"
                                        placeholder="Sua mensagem"
                                        value={message}
                                        onChange={e => setMessage(e.target.value)}
                                        required
                                    />

                                    <div className="send-message-button"><Send /></div>
                                </form>
                            </div>
                        }
                    </div>
            }

        </div>
    )
}