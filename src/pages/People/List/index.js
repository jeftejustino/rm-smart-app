import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Animated, Alert, ActivityIndicator} from 'react-native';
import {format, parseISO} from 'date-fns';
import {Container, Actions, Filter, Info, List, Item} from './styles';

import ActionButton from '~/components/ActionButton';
import Input from '~/components/Input';
import Button from '~/components/Button';
import api from '~/services/api';

import ItemList from './item';

export default function PeopleList({navigation}) {
  const [filterHeight] = useState(new Animated.Value(0));
  const [filterActive, setFilterActive] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [total, setTotal] = useState(0);
  const [people, setPeople] = useState([]);
  const max = 8;
  const RankColor = {
    A: '#ff781f',
    B: '#34A853',
    C: '#4285F4',
    D: '#A1DCEF',
    E: null,
  };
  const [filterName, setFilterName] = useState('');
  const [filterEmail, setFilterEmail] = useState('');

  async function getData() {
    if (loadingMore) return false;
    if (people.length >= total && total !== 0 && !refreshing) return false;
    setLoadingMore(true);
    try {
      const response = await api.get('pessoas', {
        params: {
          start: people.length,
          max,
          nome: filterName,
          email: filterEmail,
        },
      });
      setTotal(response.headers.total);

      const data = response.data.map(item => ({
        ...item,
        rankColor: RankColor[item.rank],
        updated_at_formatted: format(
          parseISO(item.updated_at),
          "dd/LL/Y 'às' HH:mm",
        ),
      }));

      setPeople([...people, ...data]);
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

    setTotal(0);
    setPeople([]);

    await getData();

    setRefreshing(false);
  }

  async function loadMore() {
    await getData();
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

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <List
        onRefresh={() => {
          refreshData();
        }}
        refreshing={refreshing}
        onEndReachedThreshold={0.2}
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
                icon="account-plus"
                onPress={() => {
                  // eslint-disable-next-line react/prop-types
                  navigation.navigate('PeopleForm');
                }}>
                Adicionar
              </ActionButton>

              <ActionButton icon="filter-outline" onPress={() => {}}>
                Últimas Conversões
              </ActionButton>

              <ActionButton
                icon="cached"
                onPress={() => {
                  refreshData();
                }}>
                Leads Atualizados
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
                <Input
                  icon="person"
                  placeholder="Nome | Empresa"
                  value={filterName}
                  onChangeText={setFilterName}
                />
                <Input
                  icon="email"
                  placeholder="Email da Pessoa"
                  value={filterEmail}
                  onChangeText={setFilterEmail}
                />

                <Button
                  onPress={() => {
                    refreshData();
                  }}>
                  Buscar
                </Button>
              </Filter>
            </Animated.View>
            <Info>Total de leads únicos: {total}</Info>
          </>
        }
        ListFooterComponent={
          <>
            {loadingMore && (
              <ActivityIndicator color="#f60" style={{padding: 20}} />
            )}
          </>
        }
        data={people}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => (
          <Item
            onPress={() => {
              navigation.navigate('PeopleForm', {itemId: item.id});
            }}>
            <ItemList key={item.id} item={item} />
          </Item>
        )}
      />
    </Container>
  );
}

PeopleList.propTypes = {
  navigation: PropTypes.object.isRequired,
};
