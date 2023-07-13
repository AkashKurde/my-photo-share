import { combineReducers } from 'redux';
import CategoryReducer from './reducers/CategoryReducer';
import authReducer from './reducers/authReducer';
import AgreeReducer from './reducers/AgreeReducer';
import UploadCompReduer from './reducers/UploadCompReduer';


const rootReducer = combineReducers({
    CategoryReducer:CategoryReducer,
    auth:authReducer,
    AgreeReducer:AgreeReducer,
    UploadCompReduer:UploadCompReduer
})

export default rootReducer;