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
  formatISO,
  compareAsc,
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
  ItemTop,
  ItemProgress,
  ItemDays,
  ItemType,
  ItemAtv,
  ItemDate,
  ItemDateIni,
  ItemDateIniDate,
  ItemDateIniSpan,
  ItemDateFim,
  ItemDateFimDate,
  ItemDateFimSpan,
  ItemUser,
  ItemBottom,
  ItemUpdate,
  ItemUpdateText,
} from './styles';

import ActionButton from '~/components/ActionButton';
import Input from '~/components/Input';
import Select from '~/components/Select';
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
  const [filterStatus, setFilterStatus] = useState(1);

  const types = [
    {
      value: 1,
      label: 'Atividades Pendentes',
    },
    {
      value: 2,
      label: 'Atividade Finalizadas',
    },
    {
      value: 3,
      label: 'Atividades Adicionadas',
    },
    {
      value: 4,
      label: 'Todas as Atividades',
    },
  ];

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
          status: filterStatus,
        },
      });
      setTotal(response.headers.total);

      const data = response.data.map(item => {
        let itemData = parseISO(item.cadastro);
        if (item.data !== '0000-00-00') {
          itemData =
            parseInt(item.realizado, 10) !== 0
              ? parseISO(item.finalizado)
              : setMinutes(
                  setHours(parseISO(item.data), item.hora),
                  item.minuto,
                );
        }
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
        let color = '';
        const comparison = compareAsc(
          parseISO(item.data),
          parseISO(formatISO(new Date(), {representation: 'date'})),
        );
        // if (comparison === 0) color = '#f00';
        if (comparison === -1) color = '#f41e1e';
        if (parseInt(item.realizado, 10) !== 0) color = '#40af2f';

        const cli = item.nome_cliente || item.email_cliente;
        const nome_pessoa = `${cli || ''}${
          cli && item.nome_empresa ? ' | ' : ''
        }${item.nome_empresa || ''}`;

        return {
          ...item,
          dias,
          color,
          nome_pessoa,
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

  function handleSearch() {
    setActivities([]);
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
                <Select
                  options={types}
                  selectedValue={filterStatus}
                  onValueChange={value => setFilterStatus(value)}
                />

                <Button
                  loading={loadingMore}
                  onPress={() => {
                    handleSearch();
                  }}>
                  Buscar
                </Button>
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
              <ItemTop color={item.color}>
                <ItemProgress>{item.porcentagem}%</ItemProgress>
                <ItemDays>{item.dias} dias</ItemDays>
                <ItemType>Tipo de Atv: {item.tipo_atv}</ItemType>
              </ItemTop>

              <ItemName>{item.nome_pessoa}</ItemName>

              <ItemAtv>{item.aviso}</ItemAtv>

              <ItemDate>
                <ItemDateIni>
                  <ItemDateIniSpan>Data de Inicio</ItemDateIniSpan>
                  <ItemDateIniDate>{item.data_ini}</ItemDateIniDate>
                </ItemDateIni>
                <ItemDateFim>
                  <ItemDateFimSpan>Finalizar até</ItemDateFimSpan>
                  <ItemDateFimDate>{item.data_fim}</ItemDateFimDate>
                </ItemDateFim>
              </ItemDate>
              <ItemBottom>
                <ItemUser>{item.nome_usuario}</ItemUser>
                <ItemUpdate
                  onPress={() => {
                    navigation.navigate('ActivityUpdate', {itemId: item.id});
                  }}>
                  <ItemUpdateText>
                    <Icon name="pencil" /> Atualizar
                  </ItemUpdateText>
                </ItemUpdate>
              </ItemBottom>
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
