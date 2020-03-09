import React, {useState, useEffect} from 'react';
import {Animated, Alert} from 'react-native';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {format, parseISO} from 'date-fns';
// import NumberFormat from 'react-number-format';

import api from '~/services/api';

import {
  Container,
  Actions,
  Filter,
  List,
  Item,
  ItemHeader,
  ItemName,
  ItemContent,
  ItemDate,
  ItemStart,
  ItemEnd,
  ItemPrice,
  ItemAddress,
} from './styles';

import ActionButton from '~/components/ActionButton';
import Input from '~/components/Input';
import Button from '~/components/Button';

export default function VisitList({navigation}) {
  const [filterHeight] = useState(new Animated.Value(0));
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
          // nome: filterName,
          // status: filterStatus,
        },
      });
      setTotal(response.headers.total);

      const data = response.data.map(item => {
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
                <Input icon="person" name="name" placeholder="Nome | Empresa" />
                <Input
                  icon="email"
                  name="email"
                  placeholder="Email da Pessoa"
                />

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
              <ItemDate>
                <ItemStart>Inicio: {item.start_at_formatted}</ItemStart>
                <ItemEnd>Fim: {item.end_at_formatted}</ItemEnd>
              </ItemDate>
              <ItemPrice>{item.price_formatted}</ItemPrice>
              <ItemAddress>{item.address}</ItemAddress>
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
