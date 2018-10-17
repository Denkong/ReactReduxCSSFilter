import {combineReducers} from 'redux';
import photoReducer from './photoReducer';
import filterReducer from "./filterReducer"

export default combineReducers({photoReducer,filterReducer})