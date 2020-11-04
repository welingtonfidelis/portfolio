import { createStore } from 'redux';

const INITIAL_STATE = {
    name: '',
    authorization: ''
};

function user(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'UPDATE_USER':
            return {
                ...state, ...action.user
            }

        case 'CLEAR_USER':
            return {
                name: '', authorization: ''
            }

        default:
            return state;
    }
}

const store = createStore(user);

export default store;
