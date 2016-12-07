import { combineReducers } from 'redux';
import tblist from './tblist';
import datasrc from './datasrc';



const rootReducer = combineReducers({
  tblist,
  datasrc
});

export default rootReducer;
