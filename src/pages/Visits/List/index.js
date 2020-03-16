import React, {useState, useEffect} from 'react';
import {Animated, Alert} from 'react-native';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {format, parseISO, lastDayOfMonth, formatDistance} from 'date-fns';
import pt from 'date-fns/locale/pt';

import DatePicker from '~/components/DatePicker';

import api from '~/services/api';

import {
  Container,
  Actions,
  Filter,
  FilterLabel,
  FilterBlock,
  List,
  Item,
  ItemHeader,
  ItemName,
  ItemContent,
  ItemAtvDate,
  ItemAtvAddress,
  ItemDistance,
  ItemAtvDT,
  ItemAtvDTTitle,
  ItemAtvDTDate,
  ItemAtvTime,
  ItemAtvAddressTitle,
  ItemVisit,
  ItemCheckin,
  ItemCheckinTitle,
  ItemCheckinDate,
  ItemCheckout,
  ItemCheckoutTitle,
  ItemCheckoutDate,
  ItemDistanceTitle,
  ItemDistanceTime,
} from './styles';

import ActionButton from '~/components/ActionButton';
import Button from '~/components/Button';

export default function VisitList({navigation}) {
  const d = new Date();
  const [filterHeight] = useState(new Animated.Value(0));
  const [filterDateStart, setFilterDateStart] = useState(
    new Date(d.getFullYear(), d.getMonth(), 1),
  );
  const [filterDateEnd, setFilterDateEnd] = useState(lastDayOfMonth(d));
  const [filterActive, setFilterActive] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [total, setTotal] = useState(0);
  const [visits, setVisits] = useState([]);
  const visit_started = useSelector(state => state.visit.visit_started);

  if (visit_started) {
    navigation.navigate('VisitsStarted');
  }

  function ToogleFilter() {
    if (filterActive) {
      Animated.timing(filterHeight, {
        toValue: 0,
        duration: 500,
      }).start();
    } else {
      Animated.timing(filterHeight, {
        toValue: 250,
        duration: 500,
      }).start();
    }

    setFilterActive(!filterActive);
  }

  async function getData(refresh) {
    if (loadingMore) return false;
    if (visits.length >= total && total !== 0 && !refresh) return false;
    setLoadingMore(true);
    try {
      const response = await api.get('visitas', {
        params: {
          start: refresh ? 0 : visits.length,
          data_ini: format(filterDateStart, 'Y-LL-dd'),
          data_fim: format(filterDateEnd, 'Y-LL-dd'),
        },
      });
      setTotal(response.headers.total);

      const data = response.data.map(item => {
        const atv_date = item.atv_data.split('-');
        return {
          id: item.id,
          name: item.nome,
          price: item.valor,
          price_formatted: `R$ ${parseFloat(item.valor)
            .toFixed(2)
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`,
          address: item.endereco_completo,
          start_at_formatted: format(
            parseISO(item.inicio_data),
            "dd/LL/Y 'às' HH:mm",
          ),
          end_at_formatted: format(
            parseISO(item.fim_data),
            "dd/LL/Y 'às' HH:mm",
          ),
          interval: formatDistance(
            parseISO(item.inicio_data),
            parseISO(item.fim_data),
            {
              locale: pt,
            },
          ),
          atv_endereco: item.atv_endereco,
          atv_date_formatted: format(
            new Date(
              atv_date[0],
              atv_date[1],
              atv_date[2],
              item.atv_hora,
              item.atv_minuto,
            ),
            'dd/LL/Y',
          ),
          atv_time_formatted: format(
            new Date(
              atv_date[0],
              atv_date[1],
              atv_date[2],
              item.atv_hora,
              item.atv_minuto,
            ),
            'HH:mm',
          ),
        };
      });
      if (refresh) {
        setVisits(data);
      } else {
        setVisits([...visits, ...data]);
      }
    } catch (error) {
      Alert.alert('Falha ao carregar!');
    } finally {
      setLoadingMore(false);
      setRefreshing(false);
    }
    return true;
  }

  async function refreshData() {
    setRefreshing(true);

    getData(true);
  }

  async function loadMore() {
    await getData();
  }

  function handleSearch() {
    setVisits([]);
    getData(true);
  }

  useEffect(() => {
    getData(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <List
        onRefresh={() => refreshData()}
        refreshing={refreshing}
        onEndReachedThreshold={0.4}
        onEndReached={() => {
          loadMore();
        }}
        ListHeaderComponent={
          <>
            <Actions>
              <ActionButton
                icon="magnify"
                active={filterActive}
                onPress={() => {
                  ToogleFilter();
                }}>
                Pesquisar
              </ActionButton>

              <ActionButton
                icon="plus"
                bgColor="#0b0"
                iconColor="#fff"
                onPress={() => {
                  navigation.navigate('VisitsNew');
                }}>
                Iniciar Visita
              </ActionButton>
            </Actions>
            <Animated.View
              style={{
                overflow: 'hidden',
                height: filterHeight,
                opacity: filterHeight.interpolate({
                  inputRange: [0, 50],
                  outputRange: [0, 1],
                }),
              }}>
              <Filter>
                <FilterBlock>
                  <FilterLabel>Inicio: </FilterLabel>
                  <DatePicker
                    defaultDate={filterDateStart}
                    enabledTime={false}
                    onDateChange={setFilterDateStart}
                  />
                </FilterBlock>

                <FilterBlock>
                  <FilterLabel>Fim: </FilterLabel>
                  <DatePicker
                    defaultDate={filterDateEnd}
                    enabledTime={false}
                    onDateChange={setFilterDateEnd}
                  />
                </FilterBlock>

                <Button onPress={() => handleSearch()}>Buscar</Button>
              </Filter>
            </Animated.View>
          </>
        }
        data={visits}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => (
          <Item>
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
                {item.atv_endereco}
              </ItemAtvAddress>
            </ItemContent>
            <ItemContent>
              <ItemVisit>
                <ItemCheckin>
                  <ItemCheckinTitle>Check-in</ItemCheckinTitle>
                  <ItemCheckinDate>{item.start_at_formatted}</ItemCheckinDate>
                </ItemCheckin>
                <ItemCheckout>
                  <ItemCheckoutTitle>Check-in</ItemCheckoutTitle>
                  <ItemCheckoutDate>{item.end_at_formatted}</ItemCheckoutDate>
                </ItemCheckout>
                <ItemDistance>
                  <ItemDistanceTitle>Duração:</ItemDistanceTitle>
                  <ItemDistanceTime>{item.interval}</ItemDistanceTime>
                </ItemDistance>
              </ItemVisit>
              <ItemAtvAddress>
                <ItemAtvAddressTitle>Endereço:</ItemAtvAddressTitle>{' '}
                {item.address}
              </ItemAtvAddress>
            </ItemContent>
          </Item>
        )}
      />
    </Container>
  );
}

VisitList.propTypes = {
  navigation: PropTypes.object.isRequired,
};
