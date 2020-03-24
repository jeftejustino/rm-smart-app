import React, {useState, useEffect} from 'react';
import {ActivityIndicator, Alert} from 'react-native';
import PropTypes from 'prop-types';
import {format} from 'date-fns';

import api from '~/services/api';
import Button from '~/components/Button';
import SelectAjax from '~/components/SelectAjax';
import Select from '~/components/Select';
import DatePicker from '~/components/DatePicker';

import {Container, Input, Content} from './styles';
import Custom from './Custom';
import Products from './Products';

export default function New({navigation}) {
  const [building, setBuilding] = useState(true);
  const [responsibles, setResponsibles] = useState([]);
  const [custom, setCustom] = useState([]);
  const [customValue, setCustomValue] = useState([]);
  const [cliente, setCliente] = useState(0);
  const [funis, setFunis] = useState([]);
  const [previsao, setPrevisao] = useState(new Date());
  const [responsible, setResponsible] = useState();
  const [pipeline, setPipeline] = useState(0);
  const [price, setPrice] = useState('0,00');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priceRecurrent, setPriceRecurrent] = useState('0,00');
  const [frequencia, setFrequencia] = useState(1);
  const [products, setProducts] = useState([]);

  const frequencias = [
    {value: 1, label: 'Diária'},
    {value: 2, label: 'Semanal'},
    {value: 3, label: 'Quinzenal'},
    {value: 4, label: 'Mensal'},
    {value: 5, label: 'Bimestral'},
    {value: 6, label: 'Trimestral'},
    {value: 7, label: 'Semestral'},
    {value: 8, label: 'Anual'},
  ];

  function maskPrice(value) {
    let numero = value.match(/\d+/g).map(Number);
    numero = parseInt(numero.join(''), 10) / 100;
    numero = numero.toFixed(2).split('.');
    numero[0] = `${numero[0].split(/(?=(?:...)*$)/).join('.')}`;
    numero = numero.join(',');
    return numero;
  }

  async function loadPipelines() {
    try {
      const response = await api.get('negocio/funis');

      const opts = [];
      response.data.forEach(item => {
        opts.push({
          value: item.id,
          label: item.nome,
        });
      });
      if (opts[0].value) setPipeline(opts[0].value);
      setFunis(opts);
    } catch (error) {
      // Error
    }
  }

  async function loadResponsibles() {
    try {
      const response = await api.get('colaborador/listar');

      setResponsibles([
        {
          value: 0,
          label: 'Escolher Vendedor',
        },
        ...response.data,
      ]);
    } catch (error) {
      setResponsibles([
        {
          value: 0,
          label: 'Escolher Vendedor',
        },
      ]);
    }
  }

  async function loadCustom() {
    try {
      const response = await api.get('negocio/personalizado');

      setCustom(response.data);
    } catch (error) {
      // Error
    }
  }

  async function loadBuilding() {
    try {
      await loadResponsibles();
      await loadPipelines();
      await loadCustom();
    } catch (error) {
      // Error
    } finally {
      setBuilding(false);
    }
  }

  useEffect(() => {
    loadBuilding();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit() {
    setBuilding(true);
    try {
      await api.post(`negocio/create`, {
        id_assinante: cliente,
        valor: '160,00',
        recorrente_valor: '20,00',
        recorrente_frequencia: frequencia,
        nome: name,
        descricao: description,
        previsao_visao: format(previsao, 'dd/LL/Y'),
        previsao: format(previsao, 'Y-LL-dd'),
        pipeline,
        produtos: products,
        personalizado: customValue,
        user_para: responsible,
      });
      Alert.alert('Cadastro atualizado!');
      navigation.navigate('CompanyList');
    } catch (error) {
      Alert.alert('Erro ao salvar!', error.response.data.error || '');
    } finally {
      setBuilding(false);
    }
  }

  return (
    <Container>
      <Content>
        {building ? (
          <ActivityIndicator />
        ) : (
          <>
            <Products defaultValues={products} onChange={setProducts} />

            <SelectAjax
              defaultLabel="Selecione a Pessoa"
              defaultValue={cliente}
              onValueChange={setCliente}
              url="pessoas"
            />

            <Input
              placeholder="Valor"
              value={price}
              keyboardType="decimal-pad"
              onChangeText={value => setPrice(maskPrice(value))}
            />

            <Input
              placeholder="Valor Recorrente"
              keyboardType="number-pad"
              value={priceRecurrent}
              onChangeText={value => setPriceRecurrent(maskPrice(value))}
            />

            <Select
              options={frequencias}
              selectedValue={frequencia}
              onValueChange={value => setFrequencia(value)}
            />

            <Input placeholder="nome" value={name} onChangeText={setName} />

            <Input
              placeholder="descricao"
              value={description}
              onChangeText={setDescription}
            />

            <DatePicker
              enabledTime={false}
              defaultDate={previsao}
              onDateChange={setPrevisao}
            />

            <Select
              options={funis}
              selectedValue={pipeline}
              onValueChange={value => setPipeline(value)}
            />

            <Select
              options={responsibles}
              selectedValue={responsible}
              onValueChange={value => setResponsible(value)}
            />

            {custom[pipeline] && (
              <Custom
                options={custom[pipeline]}
                value={customValue}
                type={1}
                onValueChange={setCustomValue}
              />
            )}

            <Button onPress={() => handleSubmit()}>Salvar</Button>
          </>
        )}
      </Content>
    </Container>
  );
}

New.propTypes = {
  navigation: PropTypes.object.isRequired,
};
