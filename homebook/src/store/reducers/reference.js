import { GET_REF, SET_USER} from '../actions/actionTypes';
const initialState = {
    friendref: '',
    user: {
        firstN: '',
        lastN: '',
        docId: '',
        friendNameArray: [],
        referenceArray: [],

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
                user: action.user
            };
        default:
            return state;
    }
};

export default reducer;