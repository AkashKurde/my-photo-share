import { combineReducers } from 'redux';
import CategoryReducer from './reducers/CategoryReducer';
import authReducer from './reducers/authReducer';


const rootReducer = combineReducers({
    CategoryReducer:CategoryReducer,
    auth:authReducer
})

export default rootReducer;