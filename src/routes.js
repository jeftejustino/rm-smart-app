// import {Image, View} from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import SignIn from '~/pages/SignIn';
import App from '~/drawer/MainDrawer';

export default (Signed = false, Profile = null) =>
  createAppContainer(
    createSwitchNavigator(
      {
        SignIn,
        App: App(Profile),
      },
      {
        initialRouteName: Signed ? 'App' : 'SignIn',
      },
    ),
  );
