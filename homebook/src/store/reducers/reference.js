import { GET_REF, SET_USER, GET_LOGIN } from '../actions/actionTypes';
const initialState = {
    friendref: '',
    loginVerify: false,
    user: {
        firstN: '',
        lastN: '',
        docId: '',
        phone: '',
        email: '',
        friendNameArray: [],
        referenceArray: [],
        longitude: 0,
        latitude: 0,

    },
    

}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_REF:
            return {
                ...state,
                friendref: action.refpoint
            };
        case SET_USER:
            return {
                ...state,
                user: action.user,
                
            };
        case GET_LOGIN:
            return {
                ...state,
                loginVerify: !state.loginVerify
            };
        default:
            return state;
    }
};

export default reducer;