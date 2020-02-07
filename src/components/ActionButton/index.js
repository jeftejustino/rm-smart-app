import React from 'react';
import {ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';

import {Container, Button, Title} from './styles';

export default function ActionButton({
  icon,
  iconColor,
  iconColorActive,
  children,
  ...rest
}) {
  return (
    <Container>
      <Button {...rest}>
        {rest.loading ? (
          <ActivityIndicator color="#000" size="large" />
        ) : (
          <Icon
            name={icon}
            size={30}
            color={rest.active ? iconColorActive : iconColor}
          />
        )}
      </Button>
      {children && <Title>{children}</Title>}
    </Container>
  );
}

ActionButton.propTypes = {
  icon: PropTypes.string.isRequired,
  children: PropTypes.string,
  bgColorActive: PropTypes.string,
  iconColorActive: PropTypes.string,
  bgColor: PropTypes.string,
  iconColor: PropTypes.string,
};

ActionButton.defaultProps = {
  children: '',
  bgColorActive: '#000000',
  iconColorActive: '#f60',
  bgColor: '#e7e7e7',
  iconColor: '#777',
};
