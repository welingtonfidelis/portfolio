import { Send, HighlightOff, Chat, KeyboardArrowDown } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { useState, useEffect, useRef } from 'react';

import Input from '../../components/Input';
import Button from '../../components/ButtonPrimary';

import utils from '../../utils';

let socket = null;

export default function ChatComponent() {
    const [name, setName] = useState('teste');
    const [email, setEmail] = useState('teste@email.com');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [referenceNode, setReferenceNode] = useState();
    const [scrollEnd, setScrollEnd] = useState(true);

    const apiUrl = process.env.REACT_APP_API_URL;
    const dispatch = useDispatch();
    const chat = useSelector(state => state.chat);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if(referenceNode && referenceNode !== undefined) {
            return () => referenceNode.removeEventListener('scroll', handleScroll);
        }
    }, []);

    useEffect(() => {
        scrollToBottom()
    }, [chat.messages]);

    const handleScroll = (event) => {
        var node = event.target;
        const bottom = node.scrollHeight - node.scrollTop === node.clientHeight;
        setScrollEnd(bottom);
    }

    const messagesContentRef = (node) => {
        if (node) {
            node.addEventListener('scroll', handleScroll);
            setReferenceNode(node);
        }
    };

    const scrollToBottom = () => {
        if (chat.messages.length && scrollEnd) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }

    const showChat = () => {
        dispatch({
            type: 'SHOW_CHAT',
        });
    }

    const handleStartChat = async (e) => {
        e.preventDefault();

        try {
            socket = io(
                apiUrl,
                { query: { name, email, date: new Date().getTime() } }
            );

            socket.on("connect", () => {
                dispatch({
                    type: 'UPDATE_CHAT_USER',
                    id: socket.id,
                    name,
                    email
                });
            });

        } catch (error) {
            console.log(error);
        }
    }

    const handleSendMessage = (e) => {
        e.preventDefault();
        const date = new Date().getTime();

        if (socket) {
            try {
                socket.emit(
                    'send-message', { text: message, date }
                );

                dispatch({
                    type: 'ADD_CHAT_MESSAGE',
                    message: {
                        date,
                        text: message,
                        id: chat.id
                    }
                });

                // dispatch({
                //     type: 'RM_ALERT_NEW_MESSAGE',
                //     user: receiver.socketId
                // });
                setMessage('');
            } catch (error) {
                console.log(error);
            }
        }
    }

    const handleCloseChat = () => {
        try {
            if (socket) socket.disconnect();

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
                                <content ref={messagesContentRef}>
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
                                    <div ref={messagesEndRef} />
                                </content>

                                <form onSubmit={handleSendMessage}>
                                    <Input
                                        name="text-message"
                                        placeholder="Sua mensagem"
                                        value={message}
                                        onChange={e => setMessage(e.target.value)}
                                        required
                                    />

                                    <div
                                        className="send-message-button"
                                        onClick={handleSendMessage}
                                    >
                                        <Send />
                                    </div>
                                </form>
                            </div>
                        }
                    </div>
            }

        </div>
    )
}