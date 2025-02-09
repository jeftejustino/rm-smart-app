import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import {View} from 'react-native';

import {Container, Image, Button} from './styles';
import logo from '~/assets/images/logo.png';

export default function Header({navigation}) {
  return {
    headerTitle: () => (
      <Container>
        <Image source={logo} resizeMode="stretch" />
      </Container>
    ),
    headerRight: () => (
      <Button
        onPress={() => {
          navigation.toggleDrawer();
        }}>
        <Icon name="menu" size={30} color="#fff" />
      </Button>
    ),
    headerLeft: () => <View />,
    headerStyle: {
      backgroundColor: '#000',
    },
    headerTitleAlign: 'center',
    headerRightContainerStyle: {
      paddingRight: 15,
    },
    headerLeftContainerStyle: {
      paddingLeft: 15,
    },
    headerTitleContainerStyle: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  };
}

Header.propTypes = {
  navigation: PropTypes.object.isRequired,
};
