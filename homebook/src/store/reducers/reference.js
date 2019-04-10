import { GET_REF } from '../actions/actionTypes';
const initialState = {
    friendref: '',

}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_REF:
            return {
                ...state,
                friendref: action.refpoint
            };
        default:
            return state;
    }
};

export default reducer;