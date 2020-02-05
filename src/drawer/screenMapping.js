import {createStackNavigator} from 'react-navigation-stack';
import Dashboard from '~/pages/Dashboard';
import People from '~/pages/People';
import SingOut from '~/pages/SingOut';

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

  People: {
    screen: createStackNavigator(
      {
        People,
      },
      {
        defaultNavigationOptions: Header,
      },
    ),
    navigationOptions: {
      title: 'Pessoas',
    },
  },

  Companies: {
    screen: createStackNavigator(
      {
        Dashboard,
      },
      {
        defaultNavigationOptions: Header,
      },
    ),
    navigationOptions: {
      title: 'Empresas',
    },
  },

  RealTime: {
    screen: createStackNavigator(
      {
        Dashboard,
      },
      {
        defaultNavigationOptions: Header,
      },
    ),
    navigationOptions: {
      title: 'Em Tempo Real',
    },
  },

  Activities: {
    screen: createStackNavigator(
      {
        Dashboard,
      },
      {
        defaultNavigationOptions: Header,
      },
    ),
    navigationOptions: {
      title: 'Atividades / Lembretes',
    },
  },

  Visits: {
    screen: createStackNavigator(
      {
        Dashboard,
      },
      {
        defaultNavigationOptions: Header,
      },
    ),
    navigationOptions: {
      title: 'Visitas',
    },
  },

  Notifications: {
    screen: createStackNavigator(
      {
        Dashboard,
      },
      {
        defaultNavigationOptions: Header,
      },
    ),
    navigationOptions: {
      title: 'Notificações',
    },
  },

  SingOut: {
    screen: SingOut,
    navigationOptions: {
      title: 'Sair',
    },
  },
};
