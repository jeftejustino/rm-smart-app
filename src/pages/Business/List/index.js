import React, {useState, useEffect} from 'react';
import {Alert, ActivityIndicator, FlatList} from 'react-native';
import PropTypes from 'prop-types';
import api from '~/services/api';
import {formatPrice} from '~/util/format';

import Select from '~/components/Select';
import Button from '~/components/Button';

import {
  Container,
  Header,
  Pipeline,
  PPItem,
  PPItemHeader,
  PPItemName,
  PPItemInfo,
  PPItemPrice,
  PPItemPriceSuffix,
  PPItemQtd,
  PPItemContent,
  PPB,
  PPBName,
  PPBClient,
  PPBDays,
  PPBPrice,
  PPBPriceSuffix,
  PPBTop,
  PPBBottom,
  HeaderInfo,
  HeaderPrice,
  HeaderQtd,
} from './styles';

export default function BusinessList({navigation}) {
  const [totalQtd, setTotalQtd] = useState(0);
  const [totalPrice, setTotalPrice] = useState('0,00');
  const [loading, setLoading] = useState(true);
  const [etapas, setEtapas] = useState([]);
  const [pipelines, setPipelines] = useState([]);
  const [pipeline, setPipeline] = useState(0);
  const [options, setOptions] = useState([]);
  const [status, setStatus] = useState(0);
  const [firstOrder, setfirstOrder] = useState(0);
  const optionsStatus = [
    {value: 0, label: 'Em Andamento'},
    {value: -1, label: 'Ganho(s)'},
    {value: 1, label: 'Perdido(s)'},
  ];
  const optionsFirstOrder = [
    {value: 0, label: 'Selecione'},
    {value: 1, label: 'Primeira Compra'},
    {value: 2, label: 'Recompra (Cliente)'},
  ];

  async function loadPipelines() {
    try {
      const response = await api.get('negocio/funis');

      setPipelines(response.data);
      setEtapas(response.data[0].etapas);
      setPipeline(response.data[0].id);
    } catch (error) {
      Alert.alert('Erro ao carregar Pipelines');
    }
  }

  async function loadPipeline() {
    setLoading(true);
    try {
      const response = await api.get(`negocio/${pipeline}`, {
        params: {
          status,
          cliente: firstOrder,
        },
      });

      let pipelineEtapas = [];
      pipelines.forEach(item => {
        if (item.id === pipeline) {
          pipelineEtapas = item.etapas;
        }
      });

      let q2 = 0;
      let price2 = 0;
      const etps = pipelineEtapas.map(item => {
        let q = 0;
        let price = 0;
        const business = [];

        if (response.data[item.id]) {
          response.data[item.id].forEach(element => {
            price += parseInt(element.valor, 10);
            price2 += parseInt(element.valor, 10);
            q += 1;
            q2 += 1;
            business.push({
              ...element,
              dias: 0,
              cliente: element.cliente_nome || element.cliente_empresa,
              price_formatted: formatPrice(
                parseInt(element.valor, 10) / 100,
              ).replace('R$', ''),
            });
          });
        }

        return {
          ...item,
          business,
          qtd: q,
          price_formatted: formatPrice(price / 100).replace('R$', ''),
        };
      });

      setTotalPrice(formatPrice(price2 / 100).replace('R$', ''));
      setTotalQtd(q2);

      setEtapas(etps);
    } catch (error) {
      Alert.alert('Erro ao carregar Pipelines');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPipelines();
  }, []);

  useEffect(() => {
    if (pipelines) {
      const opts = [];
      pipelines.forEach(item => {
        opts.push({
          value: item.id,
          label: item.nome,
        });
      });
      setOptions(opts);
    }
  }, [pipelines]);

  useEffect(() => {
    if (pipeline) loadPipeline();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pipeline, status, firstOrder]);

  return (
    <Container>
      <Header>
        <HeaderInfo>
          <HeaderPrice>R$ {totalPrice}</HeaderPrice>
          <HeaderQtd>{totalQtd} Negócios</HeaderQtd>
        </HeaderInfo>

        <Select
          options={options}
          selectedValue={pipeline}
          onValueChange={value => setPipeline(value)}
        />
        <Select
          options={optionsStatus}
          selectedValue={status}
          onValueChange={value => setStatus(value)}
        />
        <Select
          options={optionsFirstOrder}
          selectedValue={firstOrder}
          onValueChange={value => setfirstOrder(value)}
        />

        <Button onPress={() => navigation.navigate('BusinessNew')}>
          Adicionar Negócio
        </Button>
      </Header>

      {loading ? (
        <ActivityIndicator />
      ) : (
        <Pipeline
          horizontal
          data={etapas}
          keyExtractor={item => item.id}
          numColumns={1}
          renderItem={({item}) => (
            <PPItem>
              <PPItemHeader color={item.cor}>
                <PPItemName color={item.cor2}>{item.nome}</PPItemName>
                <PPItemInfo>
                  <PPItemPrice color={item.cor2}>
                    <PPItemPriceSuffix>R$</PPItemPriceSuffix>{' '}
                    {item.price_formatted}
                  </PPItemPrice>
                  <PPItemQtd color={item.cor2}>Qtd: {item.qtd}</PPItemQtd>
                </PPItemInfo>
              </PPItemHeader>
              <PPItemContent>
                {item.business && (
                  <FlatList
                    data={item.business}
                    keyExtractor={business => business.id}
                    numColumns={1}
                    renderItem={({item: business}) => (
                      <PPB color={item.cor}>
                        <PPBTop>
                          <PPBName>{business.nome}</PPBName>
                          <PPBDays>{business.dias_info}</PPBDays>
                        </PPBTop>

                        <PPBBottom>
                          <PPBPrice color={business.cor2}>
                            <PPBPriceSuffix>R$</PPBPriceSuffix>{' '}
                            {business.price_formatted}
                          </PPBPrice>

                          <PPBClient>{business.cliente}</PPBClient>
                        </PPBBottom>
                      </PPB>
                    )}
                  />
                )}
              </PPItemContent>
            </PPItem>
          )}
        />
      )}
    </Container>
  );
}

BusinessList.propTypes = {
  navigation: PropTypes.object.isRequired,
};
