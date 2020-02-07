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

import Header from '~/components/Header';

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
        Dashboard,
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
