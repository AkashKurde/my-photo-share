import { combineReducers } from 'redux';
import CategoryReducer from './reducers/CategoryReducer';
import authReducer from './reducers/authReducer';
import AgreeReducer from './reducers/AgreeReducer';


const rootReducer = combineReducers({
    CategoryReducer:CategoryReducer,
    auth:authReducer,
    AgreeReducer:AgreeReducer
})

export default rootReducer;