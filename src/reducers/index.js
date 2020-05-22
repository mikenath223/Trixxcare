import { combineReducers } from 'redux';
import auth from './auth';
import docs from './docs';
import singleDoc from './singleDoc';
import appoints from './appoint';
import trigger from './triggerSingin';


const rootReducer = combineReducers({
  auth,
  docs,
  singleDoc,
  appoints,
  trigger,
});

export default rootReducer;
