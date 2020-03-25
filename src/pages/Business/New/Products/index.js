/* eslint-disable eqeqeq */
import React, {useState} from 'react';
import PropTypes from 'prop-types';

import MultiSelectAjax from '~/components/MultiSelectAjax';

import {Container, Item, Name, Label, Input, Div} from './styles';
import Custom from './Custom';

export default function BusinessProducts({
  onChange,
  defaultValues,
  defaultProducts,
}) {
  const [products, setProducts] = useState(defaultProducts);
  const [qtdProducts, setQtdProducts] = useState(0);
  const [json, setJson] = useState(JSON.stringify(defaultValues));
  // Tipo 1 select
  // Tipo 2 MultiSelect
  // Tipo 3 Input
  // Tipo 4 InputArea

  function handleChange(item, value) {
    const vls2 = products;
    const index = products.findIndex(i => i.id === item.id);
    vls2[index].customValues = value;
    setProducts(vls2);
    setJson(JSON.stringify(vls2));
    onChange(vls2);
  }

  function handleChangeQtd(item, value) {
    const vls2 = products;
    const index = products.findIndex(i => i.id === item.id);
    if (!value) value = 0;
    const numero = parseInt(value, 10);
    vls2[index].quantity = String(numero);
    setProducts(vls2);
    setJson(JSON.stringify(vls2));
    onChange(vls2);
  }

  function handleChangePrice(item, value) {
    const vls2 = products;
    const index = products.findIndex(i => i.id === item.id);
    const numero2 = value.match(/\d+/g).map(Number);
    let numero = parseInt(numero2.join(''), 10) / 100;
    numero = numero.toFixed(2).split('.');
    numero[0] = `${numero[0].split(/(?=(?:...)*$)/).join('.')}`;
    numero = numero.join(',');
    vls2[index].price = numero;
    setProducts(vls2);
    setJson(JSON.stringify(vls2));
    onChange(vls2);
  }

  function handleProducts(value) {
    setProducts(value);
    setQtdProducts(value.length);
  }

  return (
    <Container>
      <MultiSelectAjax
        defaultLabel="Selecione os Produtos"
        defaultValue={products}
        onValueChange={handleProducts}
        url="negocio/produtos"
      />

      {products.map(item => (
        <Item key={String(item.id)}>
          <Name>{item.nome}</Name>
          <Div>
            <Label>Quantidade: </Label>
            <Input
              style={{flexGrow: 1}}
              placeholder="Quantidade"
              value={item.quantity || '0'}
              keyboardType="numeric"
              onChangeText={value => handleChangeQtd(item, value)}
            />
          </Div>

          <Div>
            <Label>Valor: </Label>
            <Input
              style={{flexGrow: 1}}
              placeholder="Valor"
              value={item.price || '0,00'}
              keyboardType="numeric"
              onChangeText={value => handleChangePrice(item, value)}
            />
          </Div>

          {item.caracteristica && (
            <Custom
              options={item.caracteristica}
              value={item.customValues || []}
              type={2}
              onValueChange={value => handleChange(item, value)}
            />
          )}
        </Item>
      ))}
    </Container>
  );
}

BusinessProducts.propTypes = {
  onChange: PropTypes.func.isRequired,
  defaultProducts: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  defaultValues: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

BusinessProducts.defaultProps = {
  defaultValues: [],
  defaultProducts: [],
};
