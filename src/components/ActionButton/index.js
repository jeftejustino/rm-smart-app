import React from 'react';
import {ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';

import {Container, Button, Title} from './styles';

export default function ActionButton({icon, children, ...rest}) {
  return (
    <Container>
      <Button {...rest}>
        {rest.loading ? (
          <ActivityIndicator color="#000" size="large" />
        ) : (
          <Icon name={icon} size={30} color={rest.active ? '#f60' : '#777'} />
        )}
      </Button>
      {children && <Title>{children}</Title>}
    </Container>
  );
}

ActionButton.propTypes = {
  icon: PropTypes.string.isRequired,
  children: PropTypes.string,
};

ActionButton.defaultProps = {
  children: '',
};
