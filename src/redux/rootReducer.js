import { combineReducers } from 'redux';
import CountReducer from './reducers/CountReducer';


const rootReducer = combineReducers({
    CountReducer:CountReducer,
})

export default rootReducer;