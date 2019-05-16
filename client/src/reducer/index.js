import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import merchantReducer from './merchantReducer';


export default combineReducers({
  errors: errorReducer,
  merchant: merchantReducer
});
