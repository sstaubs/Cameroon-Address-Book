import {createStore,combineReducers} from "redux";

import referenceReducer from "./reducers/reference";
import userReducer from "./reducers/user";

const rootReducer = combineReducers({
    reference: referenceReducer,
    user: userReducer,
    
});


const configureStore = () => {
    return createStore(rootReducer);


};
export default configureStore;