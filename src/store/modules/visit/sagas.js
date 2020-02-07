import {all, put, call, takeLatest} from 'redux-saga/effects';
import {Alert, PermissionsAndroid} from 'react-native';

import Geolocation from 'react-native-geolocation-service';
import {StartVisitSuccess, StartVisitFailure} from './actions';

// import api from '~/services/api';
import NavigationService from '../../../services/navigation';

export function* StartVisit({payload}) {
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
        name: 'Teste Usuario',
        visit: 'jefte.justino@gmail.comn',
      }),
    );

    NavigationService.navigate('VisitsList');
  } catch (error) {
    yield put(StartVisitFailure());
    console.tron.error(error);
    Alert.alert(
      'Falha ao Iniciar Visita',
      'ocorreu um erro, tente novamente mais tarde!',
    );
  }
}

export default all([takeLatest('@visit/START_VISIT_REQUEST', StartVisit)]);
