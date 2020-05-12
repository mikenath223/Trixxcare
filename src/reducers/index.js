import { combineReducers } from 'redux';
import auth from './auth';
import docs from './docs'

const rootReducer = combineReducers({
  auth,
  docs
})

export default rootReducer;