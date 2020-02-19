import React from 'react';
import {View, Text} from 'react-native';

import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import screenMapping from '~/drawer/screenMapping';

export default function App(profile) {
  const DrawerContent = props => (
    <View>
      <View
        style={{
          backgroundColor: '#000',
          textColor: '#f60',
          height: 56,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        }}>
        <Icon name="person" size={20} color="#fff" />
        <Text style={{color: 'white', fontSize: 16}}> Olá, {profile.nome}</Text>
      </View>
      <DrawerItems {...props} />
    </View>
  );

  // conrrst mapping = screenMapping(visit);

  return createDrawerNavigator(
    {
      ...screenMapping(),
    },
    {
      contentComponent: DrawerContent,
      drawerBackgroundColor: '#f0f0f0',
      contentOptions: {
        activeBackgroundColor: '#000',
        activeTintColor: '#f60',
      },
    },
  );
}
