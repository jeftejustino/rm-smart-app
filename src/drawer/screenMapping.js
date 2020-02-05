import React from 'react';

import {createStackNavigator} from 'react-navigation-stack';
import Dashboard from '~/pages/Dashboard';

import Header from '~/components/header';

export default {
  Dashboard: {
    screen: createStackNavigator(
      {
        Dashboard,
      },
      {
        defaultNavigationOptions: Header,
      },
    ),
  },
  Pessoas: {
    screen: createStackNavigator(
      {
        Dashboard,
      },
      {
        defaultNavigationOptions: Header,
      },
    ),
  },
};
