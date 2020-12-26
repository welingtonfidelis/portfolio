import { createStore } from 'redux';

const messages = [
    {
        id: 111,
        text: 'Olá amigo',
        date: 1608999388188
    },
    {
        id: 111,
        text: 'Gostei do seu trabalho',
        date: 1608999388198
    },
    {
        id: 111,
        text: 'Bora conversar sobre vagas',
        date: 1608999388288
    },
    {
        id: 111,
        text: 'Olá amigo',
        date: 1608999388188
    },
    {
        id: 111,
        text: 'Gostei do seu trabalho',
        date: 1608999388198
    },
    {
        id: 111,
        text: 'Bora conversar sobre vagas Bora conversar sobre vagas Bora conversar sobre vagas Bora conversar sobre vagas Bora conversar sobre vagas Bora conversar sobre vagas Bora conversar sobre vagas',
        date: 1608999388288
    },
    {
        id: 111,
        text: 'Olá amigo',
        date: 1608999388188
    },
    {
        id: 111,
        text: 'Gostei do seu trabalho',
        date: 1608999388198
    },
    {
        id: 112,
        text: 'Bora conversar sobre vagas Bora conversar sobre vagas Bora conversar sobre vagas Bora conversar sobre vagas Bora conversar sobre vagas Bora conversar sobre vagas Bora conversar sobre vagas',
        date: 1608999388288
    },
]

const INITIAL_STATE = {
    name: '',
    authorization: '',
    chat: {
        id: '',
        show: false,
        name: '',
        email: '',
        messages
    }
}

function user(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'UPDATE_USER':
            return {
                ...state, ...action.user
            }

        case 'CLEAR_USER':
            return {
                name: '',
                authorization: '',
                chat: {
                    id: '',
                    show: false,
                    name: '',
                    email: '',
                    messages: []
                }
            }

        case 'SHOW_CHAT':
            return {
                ...state,
                chat: {
                    ...state.chat,
                    show: !state.chat.show
                }
            }

        case 'UPDATE_CHAT_USER':
            return {
                ...state,
                chat: {
                    ...state.chat,
                    id: action.id,
                    name: action.name,
                    email: action.email
                }
            }

        default:
            return state;
    }
}

const store = createStore(user);

export default store;
