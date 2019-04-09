import {createStore,combineReducers} from "redux";

import referenceReducer from "./reducers/reference";

const rootReducer = combineReducers({
    reference: referenceReducer
});


const configureStore = () => {
    return createStore(rootReducer);


};
export default configureStore;