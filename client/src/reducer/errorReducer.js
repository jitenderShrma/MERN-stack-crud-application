import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types';
const errors={};

const errorReducer = function(state = errors, action){
  switch(action.type){
    default: 
    return state
    case GET_ERRORS:
    return action.payload;
    case CLEAR_ERRORS:
    return {
      state
    }
  }
}
export default errorReducer;