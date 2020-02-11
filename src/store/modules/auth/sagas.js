import {all, put, call, takeLatest} from 'redux-saga/effects';
import {Alert} from 'react-native';

import {SignInSuccess, SignInFailure} from './actions';

import api from '~/services/api';

export function* SignIn({payload}) {
  try {
    const {email, password} = payload;

    if (!email) throw new Error('Informe o email!');
    if (!password) throw new Error('Informe a senha!');

    const response = yield call(api.post, `login`, {
      email,
      password,
    });
    const profile = response.data;
    const {token, userId, gerenciador} = profile;
    api.defaults.headers.common.Rmtoken = token;
    api.defaults.headers.common.Userid = userId;
    api.defaults.headers.common.Gerenciador = gerenciador;

    yield put(SignInSuccess(profile));
  } catch (error) {
    yield put(SignInFailure());
    Alert.alert('Falha na autenticação', 'Informe seus dados corretamente!');
  }
}

export function setToken({payload}) {
  if (payload) {
    const {token, userId, gerenciador} = payload.auth;
    if (token) {
      api.defaults.headers.common.Rmtoken = token;
      api.defaults.headers.common.Userid = userId;
      api.defaults.headers.common.Gerenciador = gerenciador;
      console.tron.log(api.defaults.headers);
    }
  }
}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', SignIn),
  takeLatest('persist/REHYDRATE', setToken),
]);
