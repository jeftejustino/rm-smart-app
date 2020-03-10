// import React from 'react';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import {createStackNavigator} from 'react-navigation-stack';
import Dashboard from '~/pages/Dashboard';
import PeopleList from '~/pages/People/List';
import PeopleForm from '~/pages/People/Form';
import CompanyList from '~/pages/Company/List';
import CompanyForm from '~/pages/Company/Form';
import SingOut from '~/pages/SingOut';
import RealTime from '~/pages/RealTime';
import VisitsList from '~/pages/Visits/List';
import VisitsNew from '~/pages/Visits/New';
import VisitsStarted from '~/pages/Visits/Started';
import ActivityList from '~/pages/Activity/List';
import ActivityForm from '~/pages/Activity/Form';
import ActivityUpdate from '~/pages/Activity/Update';
import Notification from '~/pages/Notification';

import Header from '~/components/Header';

export default function screenMapping() {
  return {
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
          PeopleList,
          PeopleForm,
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
          CompanyList,
          CompanyForm,
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
          RealTime,
        },
        {
          defaultNavigationOptions: Header,
        },
      ),
      navigationOptions: {
        title: 'Atividades Recentes',
      },
    },

    Activities: {
      screen: createStackNavigator(
        {
          ActivityList,
          ActivityForm,
          ActivityUpdate,
        },
        {
          defaultNavigationOptions: Header,
        },
      ),
      navigationOptions: {
        title: 'Minhas Atividades',
      },
    },

    Visits: {
      screen: createStackNavigator(
        {
          VisitsList,
          VisitsNew,
          VisitsStarted,
        },
        {
          defaultNavigationOptions: Header,
        },
      ),
      navigationOptions: {
        title: `Visitas`,
      },
    },

    Notifications: {
      screen: createStackNavigator(
        {
          Notification,
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
}
