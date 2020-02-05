import React from 'react';
import {ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import {Container, Button, Title} from './styles';

export default function ActionButton({icon, children, ...rest}) {
  return (
    <Container>
      <Button {...rest}>
        {rest.loading ? (
          <ActivityIndicator color="#000" size="large" />
        ) : (
          <Icon name={icon} size={35} color={rest.active ? '#000' : '#666'} />
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
