/* eslint-disable eqeqeq */
import React, {useState} from 'react';
import PropTypes from 'prop-types';

import MultiSelectAjax from '~/components/MultiSelectAjax';

import {Container, Products, Item, Name, Input} from './styles';
import Custom from '../Custom';

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
    // if (!value) value = 1;
    // const numero2 = value.match(/\d+/g).map(Number);
    // console.tron.log(numero2);
    const numero = parseInt(value, 10);
    console.tron.log(value);
    console.tron.log(numero);
    vls2[index].quantity = numero;
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
    console.tron.log(numero);
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

      <Products
        data={products}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <Item>
            <Name>{item.nome}</Name>

            <Input
              placeholder="Quantidade"
              value={item.quantity || '0'}
              keyboardType="numeric"
              onChangeText={value => handleChangeQtd(item, value)}
            />

            <Input
              placeholder="Valor"
              value={item.price || '0,00'}
              keyboardType="numeric"
              onChangeText={value => handleChangePrice(item, value)}
            />

            {item.caracteristica && (
              <Custom
                options={item.caracteristica}
                value={item.customValues || []}
                onChange={value => handleChange(item, value)}
              />
            )}
          </Item>
        )}
      />
    </Container>
  );
}

BusinessProducts.propTypes = {
  onChange: PropTypes.func.isRequired,
  defaultProducts: PropTypes.object,
  defaultValues: PropTypes.oneOf([PropTypes.array, PropTypes.object]),
};

BusinessProducts.defaultProps = {
  defaultValues: [],
  defaultProducts: [],
};
