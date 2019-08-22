import { GET_REF, SET_USER, SET_LOADED, SET_FRIEND } from '../actions/actionTypes';
const initialState = {
    friendref: '',
    loaded: false,
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
    friend: {
        firstN: '',
        lastN: '',
        docId: '',
        phone: '',
        email: '',
        longitude: 0,
        latitude: 0,
    }


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
        case SET_FRIEND:
            return {
                ...state,
                friend: action.friend,

            };
            case SET_LOADED:
            
            return {
                ...state,
                loaded: !state.loaded

            };
        
        default:
            return state;
    }
};

export default reducer;