import React, {useState, useEffect} from 'react';
import {Animated, ActivityIndicator, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import {
  parseISO,
  format,
  eachDayOfInterval,
  setHours,
  setMinutes,
} from 'date-fns';

import api from '~/services/api';

import {
  Container,
  Actions,
  Filter,
  ItemHeader,
  List,
  Item,
  ItemContent,
  ItemName,
  // ItemPeople,
  ItemCreated,
} from './styles';

import ActionButton from '~/components/ActionButton';
import Input from '~/components/Input';
import Button from '~/components/Button';

export default function ActivityList({navigation}) {
  const [filterHeight] = useState(new Animated.Value(0));
  const [filterActive, setFilterActive] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [total, setTotal] = useState(0);
  const [max] = useState(8);
  const [activities, setActivities] = useState([]);

  const [filterName, setFilterName] = useState('');
  const [filterEmail, setFilterEmail] = useState('');

  async function getData(refresh) {
    if (loadingMore) return false;
    if (activities.length >= total && total !== 0 && !refresh) return false;
    setLoadingMore(true);
    try {
      const response = await api.get('atividades', {
        params: {
          start: refresh ? 0 : activities.length,
          max,
          nome: filterName,
          email: filterEmail,
        },
      });
      setTotal(response.headers.total);

      const data = response.data.map(item => {
        const itemData =
          parseInt(item.realizado, 10) !== 0
            ? parseISO(item.finalizado)
            : setMinutes(setHours(parseISO(item.data), item.hora), item.minuto);
        const interval = {
          start: parseISO(item.cadastro),
          end: itemData,
        };
        let dias = 0;
        try {
          const interv = eachDayOfInterval(interval);
          dias = interv.length;
        } catch (error) {
          // console.tron.warn(interval);
        }

        return {
          ...item,
          dias,
          data_ini: format(parseISO(item.cadastro), "dd/LL/Y 'às' HH:mm"),
          data_fim: format(itemData, "dd/LL/Y 'às' HH:mm"),
        };
      });
      if (refresh) {
        setActivities(data);
      } else {
        setActivities([...activities, ...data]);
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
                icon="account-plus"
                onPress={() => {
                  navigation.navigate('ActivityForm');
                }}>
                Adicionar
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
                  value={filterEmail}
                  onChangeText={setFilterEmail}
                />

                <Button>Buscar</Button>
              </Filter>
            </Animated.View>
            <ItemHeader>Atividades</ItemHeader>
          </>
        }
        ListFooterComponent={
          <>
            {loadingMore && (
              <ActivityIndicator color="#f60" style={{padding: 20}} />
            )}
          </>
        }
        data={activities}
        keyExtractor={item => String(item.id)}
        renderItem={({item, index}) => (
          <Item
            index={index}
            onPress={() => {
              navigation.navigate('ActivityForm', {itemId: item.id});
            }}>
            <ItemContent>
              <ItemName>{item.porcentagem}%</ItemName>
              <ItemName>{item.nome_cliente}</ItemName>
              <ItemName>{item.nome_empresa}</ItemName>
              <ItemName>{item.dias}</ItemName>
              <ItemName>{item.aviso}</ItemName>
              <ItemName>{item.data_ini}</ItemName>
              <ItemName>{item.data_fim}</ItemName>
              <ItemName>{item.tipo_atv}</ItemName>
              <ItemName>{item.nome_usuario}</ItemName>
              <ItemCreated>
                <Icon name="clock-outline" size={12} color="#333" />
              </ItemCreated>
            </ItemContent>
          </Item>
        )}
      />
    </Container>
  );
}

ActivityList.propTypes = {
  navigation: PropTypes.object.isRequired,
};
