import axios from 'axios';

export function registerUser({name, lastname, email, password}) {
    const request = axios.post('/register', {name, lastname, email, password})
                    .then(response => response.data)
                    
    return {
        type: 'USER_REGISTER',
        payload: request
    }
}

export function loginUser({email, password}) {

    const request = axios.post('/login', {email, password})
                    .then(response => response.data)
                    
    return {
        type: 'USER_LOGIN',
        payload: request
    }
}

export function auth() {

    const request = axios.get('/auth')
                    .then(response => response.data)

    return {
        type: 'USER_AUTH',
        payload: request
    }
}

export function logoutUser() {
    const request = axios.get('/logout')
                    .then(response => response.data)
    
    return {
        type: 'USER_LOGOUT',
        payload: request
    }
}