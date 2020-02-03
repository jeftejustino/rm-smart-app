// import {Image, View} from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import SignIn from '~/pages/SignIn';
import Dashboard from '~/pages/Dashboard';

// import logo from '~/assets/images/header_logo.png';

export default (Signed = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        SignIn,
        Dashboard,
      },
      {
        initialRouteName: Signed ? 'App' : 'SignIn',
      },
    ),
  );
