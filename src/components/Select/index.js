import React from 'react';
import PropTypes from 'prop-types';
import {Container, Picker} from './styles';

export default function Select({options, ...rest}) {
  return (
    <Container>
      <Picker {...rest}>
        {options &&
          options.map(item => (
            <Picker.Item
              value={item.value}
              key={item.value}
              label={item.label}
            />
          ))}
      </Picker>
    </Container>
  );
}

Select.propTypes = {
  options: PropTypes.array.isRequired,
};
