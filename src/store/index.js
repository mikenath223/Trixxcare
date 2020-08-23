import { combineReducers } from 'redux';
import auth from './reducers/auth';
import docs from './reducers/docs';
import singleDoc from './reducers/singleDoc';
import appoints from './reducers/appoint';
import trigger from './reducers/triggerSingin';


const rootReducer = combineReducers({
  auth,
  docs,
  singleDoc,
  appoints,
  trigger,
});

export default rootReducer;
