import {all, put, call, takeLatest} from 'redux-saga/effects';
import {Alert, PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import api from '~/services/api';

import {
  StartVisitSuccess,
  StartVisitFailure,
  StopVisitSuccess,
  StopVisitFailure,
} from './actions';

// import api from '~/services/api';
import NavigationService from '~/services/navigation';

function* requestPermissionLocation() {
  try {
    const granted = yield PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'RM Smart Permisão de localização',
        message:
          'RM SMart não tem permissão para acessar sua localização  ' +
          'para continuar permita essa função.',
        buttonNeutral: 'Pergunte-me mais tarde',
        buttonNegative: 'Cancelar',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }
    return false;
  } catch (err) {
    return false;
  }
}

function userPositionPromised() {
  const position = {};
  if (Geolocation) {
    Geolocation.getCurrentPosition(
      location => position.on({location}),
      error => position.on({error}),
      {enableHighAccuracy: true},
    );
  }
  // eslint-disable-next-line no-return-assign
  return {getLocation: () => new Promise(location => (position.on = location))};
}

export function* StartVisit({payload}) {
  const permission = yield requestPermissionLocation();

  if (!permission) {
    yield put(StartVisitFailure());
    Alert.alert(
      'Falha ao Iniciar Visita',
      'ocorreu um erro, tente novamente mais tarde!',
    );
  }

  try {
    const {getLocation} = yield call(userPositionPromised);
    const {error, location} = yield call(getLocation);

    if (error) throw new Error(error);

    const data = {
      atividade: payload.visit.id,
      ...location,
    };

    const response = yield call(api.post, 'visita/iniciar', data);

    const {id, data_inicio, pessoa, endereco_completo} = response.data;

    yield put(
      StartVisitSuccess({
        id,
        name: pessoa,
        started_at: data_inicio,
        endereco: endereco_completo,
      }),
    );

    NavigationService.navigate('VisitsStarted');
  } catch (error) {
    yield put(StartVisitFailure());
    Alert.alert(
      'Falha ao Iniciar Visita',
      'ocorreu um erro, tente novamente mais tarde!',
    );
  }
}

export function* StopVisit({payload}) {
  const permission = yield requestPermissionLocation();

  if (!permission) {
    yield put(StopVisitFailure());
    Alert.alert(
      'Falha ao Iniciar Visita!',
      'ocorreu um erro, tente novamente mais tarde!',
    );
  }

  try {
    const {getLocation} = yield call(userPositionPromised);
    const {error, location} = yield call(getLocation);

    if (error) throw new Error(error);

    const {obs, price} = payload;
    const data = {
      obs,
      price,
      ...location,
    };

    yield call(api.post, 'visita/finalizar', data);

    yield put(StopVisitSuccess());

    NavigationService.navigate('VisitsList');
  } catch (error) {
    yield put(StopVisitFailure());
    Alert.alert(
      'Falha ao Finalizar Visita',
      'ocorreu um erro, tente novamente mais tarde!',
    );
  }
}

export default all([
  takeLatest('@visit/START_VISIT_REQUEST', StartVisit),
  takeLatest('@visit/STOP_VISIT_REQUEST', StopVisit),
]);
