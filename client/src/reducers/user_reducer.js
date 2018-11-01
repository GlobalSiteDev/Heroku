export default function(state = {}, action) {
    
    switch(action.type) {
        case 'USER_LOGIN':
            return {...state, login: action.payload};

        case 'USER_REGISTER':
            return {...state, user: action.payload};

        case 'USER_AUTH':
            return {...state, auth: action.payload};
        
        case 'USER_LOGOUT':
            return {...state, auth: action.payload};
            
        default:
            return state;
    }
}