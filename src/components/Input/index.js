import React, {forwardRef} from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {Container, TInput} from './styles';

function Input({style, icon, ...rest}, ref) {
  return (
    <Container style={style}>
      {icon && <Icon name={icon} size={20} color="rgba(255,255,255,0.6)" />}
      <TInput {...rest} ref={ref} />
    </Container>
  );
}

export default forwardRef(Input);

Input.propTypes = {
  style: PropTypes.object,
  icon: PropTypes.string,
};

Input.defaultProps = {
  style: {},
  icon: null,
};
