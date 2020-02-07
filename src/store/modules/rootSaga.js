import {all} from 'redux-saga/effects';

import auth from './auth/sagas';
import visit from './visit/sagas';

export default function* rootSaga() {
  yield all([auth, visit]);
}
