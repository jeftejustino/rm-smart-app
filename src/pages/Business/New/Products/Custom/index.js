/* eslint-disable eqeqeq */
import React, {useState} from 'react';
import PropTypes from 'prop-types';

import Select from '~/components/Select';
import MultiSelect from '~/components/MultiSelect';

import {Container, Input, Textarea, Item} from './styles';

export default function Custom({options, values, onValueChange, ...rest}) {
  const [vls, setVls] = useState(values);
  const [json, setJson] = useState(JSON.stringify(values));
  // Tipo 1 select
  // Tipo 2 MultiSelect
  // Tipo 3 Input
  // Tipo 4 InputArea

  function handleChange(value, item) {
    const vls2 = vls;

    vls2[item.id] = value;
    setVls(vls2);
    onValueChange(vls2);
    setJson(JSON.stringify(vls2));
  }

  return (
    <Container {...rest}>
      {options.map(item => (
        <Item key={String(item.id)}>
          {item.tipo == 1 ? (
            <Select
              options={item.opcoes}
              selectedValue={vls[item.id] || ''}
              onValueChange={value => handleChange(value, item)}
            />
          ) : (
            <></>
          )}
          {item.tipo == 2 ? (
            <MultiSelect
              defaultLabel={item.nome}
              options={item.opcoes}
              defaultValue={vls[item.id] || []}
              onValueChange={value => handleChange(value, item)}
            />
          ) : (
            <></>
          )}
          {item.tipo == 3 ? (
            <Input
              placeholder={item.nome}
              value={vls[item.id] || ''}
              onChangeText={value => handleChange(value, item)}
            />
          ) : (
            <></>
          )}
          {item.tipo == 4 ? (
            <Textarea
              placeholder={item.nome}
              value={vls[item.id] || ''}
              onChangeText={value => handleChange(value, item)}
            />
          ) : (
            <></>
          )}
        </Item>
      ))}
    </Container>
  );
}

Custom.propTypes = {
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  values: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  onValueChange: PropTypes.func.isRequired,
};

Custom.defaultProps = {
  values: {},
};
