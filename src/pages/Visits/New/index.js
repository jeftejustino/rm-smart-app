import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity, ActivityIndicator, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {format, parseISO, setMinutes, setHours} from 'date-fns';
import PropTypes from 'prop-types';

import api from '~/services/api';
import Button from '~/components/Button';
import DatePicker from '~/components/DatePicker';

import {Container, List, HeaderTitle, Item} from './styles';
import {
  ItemContent,
  ItemName,
  ItemHeader,
  ItemAtvDT,
  ItemAtvDate,
  ItemAtvDTTitle,
  ItemAtvTime,
  ItemAtvDTDate,
  ItemAtvAddress,
  ItemAtvAddressTitle,
} from '../List/styles';

import {StartVisitRequest} from '~/store/modules/visit/actions';

export default function VisitNew({navigation}) {
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [visits, setVisits] = useState([]);
  const [total, setTotal] = useState(0);
  const [filterDate, setFilterDate] = useState(new Date());

  const loading = useSelector(state => state.visit.loading);

  const dispatch = useDispatch();

  function startVisit(visit) {
    Alert.alert(
      'Atenção!',
      `Deseja iniciar a reunião com ${visit.name}?`,
      [
        {
          text: 'Não',
          onPress: () => {},
          style: 'cancel',
        },
        {text: 'Sim', onPress: () => dispatch(StartVisitRequest(visit))},
      ],
      {cancelable: false},
    );
  }

  async function loadVisits(refresh) {
    if (visits.length >= total && total !== 0 && !refresh) return false;
    try {
      setRefreshing(true);

      const response = await api.get('atividades', {
        params: {
          start: refresh ? 0 : visits.length,
          status: 1,
          tipo: 5,
          data: format(filterDate, 'Y-LL-dd'),
        },
      });
      setTotal(response.headers.total);

      const data = response.data.map(item => {
        const cli = item.nome_cliente || item.email_cliente;
        const nome_pessoa = `${cli || ''}${
          cli && item.nome_empresa ? ' | ' : ''
        }${item.nome_empresa || ''}`;

        const itemData =
          parseInt(item.realizado, 10) !== 0
            ? parseISO(item.finalizado)
            : setMinutes(setHours(parseISO(item.data), item.hora), item.minuto);

        return {
          id: item.id,
          name: nome_pessoa,
          endereco: item.endereco,
          atv_date_formatted: format(itemData, 'dd/LL/Y'),
          atv_time_formatted: format(itemData, 'HH:mm'),
        };
      });

      if (refresh) {
        setVisits(data);
      } else {
        setVisits([...visits, ...data]);
      }
    } catch (error) {
      // console.tron.warn(error);
      // error
    } finally {
      setRefreshing(false);
      setLoadingMore(false);
    }

    return true;
  }

  function loadMore() {
    loadVisits();
  }

  useEffect(() => {
    loadVisits(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterDate]);

  return (
    <Container>
      <List
        onRefresh={() => {
          loadVisits(true);
        }}
        refreshing={refreshing || loading}
        ListHeaderComponent={
          <>
            <HeaderTitle>Selecione a visita que deseja começar</HeaderTitle>
            <Button onPress={() => navigation.navigate('ActivityForm')}>
              Adicionar Visita
            </Button>

            <DatePicker
              defaultDate={filterDate}
              onDateChange={setFilterDate}
              enabledTime={false}
              prefix="Filtro: "
              style={{textAlign: 'center'}}
            />
            {visits.length === 0 ? (
              <HeaderTitle>
                Não há reuniões agendadas para esta data!
              </HeaderTitle>
            ) : (
              <></>
            )}
          </>
        }
        onEndReachedThreshold={0.4}
        onEndReached={() => {
          loadMore();
        }}
        ListFooterComponent={
          <>
            {(loadingMore || loading) && (
              <ActivityIndicator color="#f60" style={{padding: 20}} />
            )}
          </>
        }
        data={visits}
        keyExtractor={item => String(item.id)}
        renderItem={({item, index}) => (
          <Item index={index} onPress={() => startVisit(item)}>
            <ItemHeader>
              <ItemName>{item.name}</ItemName>
            </ItemHeader>
            <ItemContent>
              <ItemAtvDT>
                <ItemAtvDate>
                  <ItemAtvDTTitle>Agendado para:</ItemAtvDTTitle>
                  <ItemAtvDTDate>{item.atv_date_formatted}</ItemAtvDTDate>
                </ItemAtvDate>
                <ItemAtvTime>
                  <ItemAtvDTTitle>Horário:</ItemAtvDTTitle>
                  <ItemAtvDTDate>{item.atv_time_formatted}</ItemAtvDTDate>
                </ItemAtvTime>
              </ItemAtvDT>
              <ItemAtvAddress>
                <ItemAtvAddressTitle>Endereço:</ItemAtvAddressTitle>{' '}
                {item.endereco}
              </ItemAtvAddress>
            </ItemContent>
          </Item>
        )}
      />
    </Container>
  );
}

VisitNew.navigationOptions = ({navigation}) => ({
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}>
      <Icon name="chevron-left" size={30} color="#fff" />
    </TouchableOpacity>
  ),
  headerLeftContainerStyle: {
    paddingLeft: 15,
  },
});

VisitNew.propTypes = {
  navigation: PropTypes.object.isRequired,
};
