import { GET_USER } from '../actions/actionTypes';
const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmpassword: '',
    phoneNum: '',
    uid:'',

}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER:
            return {
                ...state,
                firstName: action.user.firstN,
                lastName: action.user.lastN,
                email: action.user.email,
                password: action.user.password,
                
                phoneNum: action.user.phoneNum,
                uid: action.user.uid,
            };
        default:
            return state;
    }
};

export default reducer;