import {combineReducers} from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import visit from './visit/reducer';

const reducers = combineReducers({
  auth,
  user,
  visit,
});

export default reducers;
