import {all, put, call, takeLatest} from 'redux-saga/effects';
import {Alert, PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
// import {getDate} from 'date-fns';

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
      console.tron.log('You can use the location');
    } else {
      console.tron.log('Location permission denied');
    }
  } catch (err) {
    console.tron.warn(err);
  }
}

export function* StartVisit({payload}) {
  requestPermissionLocation();

  try {
    Geolocation.getCurrentPosition(
      position => {
        console.tron.log(position);
      },
      error => {
        // See error code charts below.
        console.tron.log(error.code);
        console.tron.log(error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );

    yield put(
      StartVisitSuccess({
        id: 1,
        name: 'Cliente de Teste',
        started_at: new Date(),
        visit: 'jefte.justino@gmail.comn',
      }),
    );

    NavigationService.navigate('VisitsStarted');
  } catch (error) {
    yield put(StartVisitFailure());
    console.tron.error(error);
    Alert.alert(
      'Falha ao Iniciar Visita',
      'ocorreu um erro, tente novamente mais tarde!',
    );
  }
}

export function* StopVisit({payload}) {
  yield requestPermissionLocation();

  try {
    Geolocation.getCurrentPosition(
      position => {
        console.tron.log(position);
      },
      error => {
        // See error code charts below.
        console.tron.log(error.code);
        console.tron.log(error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );

    yield put(StopVisitSuccess());

    NavigationService.navigate('VisitsList');
  } catch (error) {
    yield put(StopVisitFailure());
    console.tron.error(error);
    Alert.alert(
      'Falha ao Parar Visita',
      'ocorreu um erro, tente novamente mais tarde!',
    );
  }
}

export default all([
  takeLatest('@visit/START_VISIT_REQUEST', StartVisit),
  takeLatest('@visit/STOP_VISIT_REQUEST', StopVisit),
]);
