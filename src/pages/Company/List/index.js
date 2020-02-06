import React, {useState} from 'react';
import {Animated} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Container,
  Actions,
  Filter,
  ItemHeader,
  List,
  Item,
  ItemContent,
  ItemName,
  ItemPeople,
  ItemCreated,
} from './styles';

import ActionButton from '~/components/ActionButton';
import Input from '~/components/Input';
import Button from '~/components/Button';

export default function CompanyList({navigation}) {
  const [filterHeight, setFilterHeight] = useState(new Animated.Value(0));
  const [filterActive, setFilterActive] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [total, setTotal] = useState(0);
  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: 'Teste NF',
      people: 15,
      created_at: '2019-09-13 16:34',
      created_at_formatted: '13/09/19 às 16:34',
    },
    {
      id: 2,
      name: 'Teste NF',
      people: 15,
      created_at: '2019-09-13 16:34',
      created_at_formatted: '13/09/19 às 16:34',
    },
    {
      id: 3,
      name: 'Teste NF',
      people: 15,
      created_at: '2019-09-13 16:34',
      created_at_formatted: '13/09/19 às 16:34',
    },
  ]);

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

  return (
    <Container>
      <List
        onRefresh={() => {
          console.tron.warn('Refresh!');
        }}
        refreshing={refreshing}
        onEndReachedThreshold={0.4}
        onEndReached={() => {
          console.tron.warn('Load More!');
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
                <Input icon="person" name="name" placeholder="Nome | Empresa" />
                <Input
                  icon="email"
                  name="email"
                  placeholder="Email da Pessoa"
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
          <Item index={index}>
            <ItemContent>
              <ItemName>{item.name}</ItemName>
              <ItemPeople>Quantidade de Pessoas: {item.people}</ItemPeople>
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
