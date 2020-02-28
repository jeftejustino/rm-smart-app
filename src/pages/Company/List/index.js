import React, {useState, useEffect} from 'react';
import {Animated, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import {parseISO, format} from 'date-fns';

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

export default function CompanyList({navigation}) {
  const [filterHeight] = useState(new Animated.Value(0));
  const [filterActive, setFilterActive] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [total, setTotal] = useState(0);
  const [max] = useState(8);
  const [companies, setCompanies] = useState([]);

  const [filterName, setFilterName] = useState('');
  const [filterEmail, setFilterEmail] = useState('');

  async function getData() {
    if (loadingMore) return false;
    if (companies.length >= total && total !== 0 && !refreshing) return false;
    setLoadingMore(true);
    try {
      const response = await api.get('empresas', {
        params: {
          start: companies.length,
          max,
          nome: filterName,
          email: filterEmail,
        },
      });
      setTotal(response.headers.total);

      const data = response.data.map(item => ({
        ...item,
        created_at_formatted: format(
          parseISO(item.cadastro),
          "dd/LL/Y 'às' HH:mm",
        ),
      }));

      setCompanies([...companies, ...data]);
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
    setCompanies([]);

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
                  navigation.navigate('CompanyForm');
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
            <ItemHeader>Empresas</ItemHeader>
          </>
        }
        data={companies}
        keyExtractor={item => String(item.id)}
        renderItem={({item, index}) => (
          <Item
            index={index}
            onPress={() => {
              navigation.navigate('CompanyForm', {itemId: item.id});
            }}>
            <ItemContent>
              <ItemName>{item.empresa}</ItemName>
              {/* <ItemPeople>Quantidade de Pessoas: {item.people}</ItemPeople> */}
              <ItemCreated>
                <Icon name="clock-outline" size={12} color="#333" />{' '}
                {item.created_at_formatted}
              </ItemCreated>
            </ItemContent>
          </Item>
        )}
      />
    </Container>
  );
}

CompanyList.propTypes = {
  navigation: PropTypes.object.isRequired,
};
