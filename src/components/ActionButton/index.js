import React from 'react';
import {ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';

import {Container, Button, Title} from './styles';

export default function ActionButton({
  icon,
  backgroundColor,
  backgroundColorActive,
  iconColor,
  iconColorActive,
  children,
  ...rest
}) {
  return (
    <Container>
      <Button
        backgroundColor={backgroundColor}
        backgroundColorActive={backgroundColorActive}
        {...rest}>
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
  backgroundColor: PropTypes.string,
  backgroundColorActive: PropTypes.string,
  iconColor: PropTypes.string,
  iconColorActive: PropTypes.string,
};

ActionButton.defaultProps = {
  children: '',
  backgroundColor: '#e7e7e7',
  iconColor: '#777',
  backgroundColorActive: '#000000',
  iconColorActive: '#f60',
};
