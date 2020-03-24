import React, {useState, useEffect} from 'react';
import {ActivityIndicator} from 'react-native';

import api from '~/services/api';
import Button from '~/components/Button';
import SelectAjax from '~/components/SelectAjax';
import Select from '~/components/Select';
import DatePicker from '~/components/DatePicker';

import {Container, Input, Content} from './styles';
import Custom from './Custom';
import Products from './Products';

export default function New() {
  const [building, setBuilding] = useState(true);
  const [responsibles, setResponsibles] = useState([]);
  const [custom, setCustom] = useState([]);
  const [customValue, setCustomValue] = useState([]);
  const [cliente, setCliente] = useState(0);
  const [funis, setFunis] = useState([]);
  const [previsao, setPrevisao] = useState(new Date());
  const [responsible, setResponsible] = useState();
  const [pipeline, setPipeline] = useState(0);
  const [frequencia, setFrequencia] = useState(1);
  const [products, setProducts] = useState([1, 2]);

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

  function handleSubmit() {
    // "id_assinante": "2242276",
    // "empresa_assinante": "cliente_2242276",
    // "confirmacao_menor_minimo": "imaginejefte123",
    // "valor": "160,00",
    // "recorrente_valor": "20,00",
    // "recorrente_frequencia": "4",
    // "nome": "descrição teste",
    // "descricao": "",
    // "previsao_visao": "19/03/2020",
    // "previsao": "2020-03-19",
    // "pipeline": "1",
    // "user_para": "78",
    // "substituir": "",
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

            <Input placeholder="Valor" />

            <Input placeholder="Valor Recorrente" />

            <Input placeholder="nome" />

            <Input placeholder="descricao" />

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
              options={frequencias}
              selectedValue={frequencia}
              onValueChange={value => setFrequencia(value)}
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
                onChange={setCustomValue}
              />
            )}

            <Button onPress={() => handleSubmit()}>Salvar</Button>
          </>
        )}
      </Content>
    </Container>
  );
}
