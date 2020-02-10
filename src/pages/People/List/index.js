import React, {useState} from 'react';
import {Animated} from 'react-native';
import {
  Container,
  Actions,
  Filter,
  Info,
  List,
  Item,
  ItemHeader,
  ItemName,
  ItemContent,
  ItemRank,
  ItemRankText,
  ItemConversions,
  ItemConversionsTitle,
  ItemConversionsValue,
  ItemUpdated,
  ItemUpdatedTitle,
  ItemUpdatedValue,
  ItemResponsible,
  ItemResponsibleTitle,
  ItemResponsibleValue,
} from './styles';

import ActionButton from '~/components/ActionButton';
import Input from '~/components/Input';
import Button from '~/components/Button';

export default function PeopleList({navigation}) {
  const [filterHeight, setFilterHeight] = useState(new Animated.Value(0));
  const [filterActive, setFilterActive] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [total, setTotal] = useState(0);
  const [people, setPeople] = useState([
    {
      id: 1,
      name: 'Teste NFS',
      conversions: 15,
      updated_at: '2019-09-13 16:34',
      updated_at_formatted: '13/09/19 16:34',
      responsible: '--Teste Desenvolvimento',
      rank: 'A',
      rankColor: '#ff781f',
    },
    {
      id: 2,
      name: 'Teste BCS',
      conversions: 22,
      updated_at: '2019-09-13 16:34',
      updated_at_formatted: '13/09/19 16:34',
      responsible: '--Teste Desenvolvimento',
      rank: 'B',
      rankColor: '#34A853',
    },
    {
      id: 3,
      name: 'Teste QWS',
      conversions: 22,
      updated_at: '2019-09-13 16:34',
      updated_at_formatted: '13/09/19 16:34',
      responsible: '--Teste Desenvolvimento',
      rank: 'C',
      rankColor: '#4285F4',
    },
    {
      id: 4,
      name: 'Teste NF',
      conversions: 22,
      updated_at: '2019-09-13 16:34',
      updated_at_formatted: '13/09/19 16:34',
      responsible: '--Teste Desenvolvimento',
      rank: 'D',
      rankColor: '#A1DCEF',
    },
    {
      id: 5,
      name: 'Teste NF',
      conversions: 22,
      updated_at: '2019-09-13 16:34',
      updated_at_formatted: '13/09/19 16:34',
      responsible: '--Teste Desenvolvimento',
      rank: 'E',
      rankColor: null,
    },
    {
      id: 6,
      name: 'Teste NF',
      conversions: 22,
      updated_at: '2019-09-13 16:34',
      updated_at_formatted: '13/09/19 16:34',
      responsible: '--Teste Desenvolvimento',
      rank: 'A',
      rankColor: '#ff781f',
    },
    {
      id: 7,
      name: 'Teste NF',
      conversions: 22,
      updated_at: '2019-09-13 16:34',
      updated_at_formatted: '13/09/19 16:34',
      responsible: '--Teste Desenvolvimento',
      rank: 'B',
      rankColor: '#34A853',
    },
    {
      id: 8,
      name: 'Teste NF',
      conversions: 22,
      updated_at: '2019-09-13 16:34',
      updated_at_formatted: '13/09/19 16:34',
      responsible: '--Teste Desenvolvimento',
      rank: 'C',
      rankColor: '#4285F4',
    },
    {
      id: 9,
      name: 'Teste NF',
      conversions: 22,
      updated_at: '2019-09-13 16:34',
      updated_at_formatted: '13/09/19 16:34',
      responsible: '--Teste Desenvolvimento',
      rank: 'D',
      rankColor: '#A1DCEF',
    },
    {
      id: 10,
      name: 'Teste NF',
      conversions: 22,
      updated_at: '2019-09-13 16:34',
      updated_at_formatted: '13/09/19 16:34',
      responsible: '--Teste Desenvolvimento',
      rank: 'E',
      rankColor: null,
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
        onRefresh={() => {}}
        refreshing={refreshing}
        onEndReachedThreshold={0.4}
        onEndReached={() => {}}
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
                  navigation.navigate('PeopleForm');
                }}>
                Adicionar
              </ActionButton>

              <ActionButton icon="filter-outline" onPress={() => {}}>
                Últimas Conversões
              </ActionButton>

              <ActionButton icon="cached" onPress={() => {}}>
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
                <Input icon="person" name="name" placeholder="Nome | Empresa" />
                <Input
                  icon="email"
                  name="email"
                  placeholder="Email da Pessoa"
                />

                <Button>Buscar</Button>
              </Filter>
            </Animated.View>
            <Info>Total de leads únicos: {total}</Info>
          </>
        }
        data={people}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => (
          <Item>
            <ItemHeader>
              <ItemName>{item.name}</ItemName>
            </ItemHeader>

            <ItemContent>
              <ItemRank rankColor={item.rankColor}>
                <ItemRankText rankColor={item.rankColor}>
                  {item.rank}
                </ItemRankText>
              </ItemRank>

              <ItemConversions>
                <ItemConversionsTitle>Conversões</ItemConversionsTitle>
                <ItemConversionsValue>{item.conversions}</ItemConversionsValue>
              </ItemConversions>

              <ItemUpdated>
                <ItemUpdatedTitle>Atualizado</ItemUpdatedTitle>
                <ItemUpdatedValue>{item.updated_at_formatted}</ItemUpdatedValue>
              </ItemUpdated>

              <ItemResponsible>
                <ItemResponsibleTitle>Dono do Lead</ItemResponsibleTitle>
                <ItemResponsibleValue>{item.responsible}</ItemResponsibleValue>
              </ItemResponsible>
            </ItemContent>
          </Item>
        )}
      />
    </Container>
  );
}
