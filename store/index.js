import { createStore } from 'redux';

const INITIAL_STATE = {
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

        case 'ADD_CHAT_MESSAGE':
            return {
                ...state,
                chat: {
                    ...state.chat,
                    messages: [...state.chat.messages, action.message]
                }
            }

        default:
            return state;
    }
}

const store = createStore(user);

export default store;
