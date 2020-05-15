import { combineReducers } from 'redux';
import auth from './auth';
import docs from './docs';
import singleDoc from './singleDoc'
import appoints from './appoint'

const rootReducer = combineReducers({
  auth,
  docs,
  singleDoc,
  appoints
})

export default rootReducer;