import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

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

export default function People() {
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [total, setTotal] = useState(0);
  const [people, setPeople] = useState([
    {
      id: 1,
      name: 'Teste NF',
      conversions: 15,
      updated_at: '2019-09-13 16:34',
      updated_at_formatted: '13/09/19 16:34',
      responsible: '--Teste Desenvolvimento',
      rank: 'A',
      rankColor: '#ff781f',
    },
    {
      id: 2,
      name: 'Teste NF',
      conversions: 15,
      updated_at: '2019-09-13 16:34',
      updated_at_formatted: '13/09/19 16:34',
      responsible: '--Teste Desenvolvimento',
      rank: 'B',
      rankColor: '#34A853',
    },
    {
      id: 3,
      name: 'Teste NF',
      conversions: 15,
      updated_at: '2019-09-13 16:34',
      updated_at_formatted: '13/09/19 16:34',
      responsible: '--Teste Desenvolvimento',
      rank: 'C',
      rankColor: '#4285F4',
    },
    {
      id: 4,
      name: 'Teste NF',
      conversions: 15,
      updated_at: '2019-09-13 16:34',
      updated_at_formatted: '13/09/19 16:34',
      responsible: '--Teste Desenvolvimento',
      rank: 'D',
      rankColor: '#A1DCEF',
    },
    {
      id: 5,
      name: 'Teste NF',
      conversions: 15,
      updated_at: '2019-09-13 16:34',
      updated_at_formatted: '13/09/19 16:34',
      responsible: '--Teste Desenvolvimento',
      rank: 'E',
      rankColor: null,
    },
    {
      id: 6,
      name: 'Teste NF',
      conversions: 15,
      updated_at: '2019-09-13 16:34',
      updated_at_formatted: '13/09/19 16:34',
      responsible: '--Teste Desenvolvimento',
      rank: 'A',
      rankColor: '#ff781f',
    },
    {
      id: 7,
      name: 'Teste NF',
      conversions: 15,
      updated_at: '2019-09-13 16:34',
      updated_at_formatted: '13/09/19 16:34',
      responsible: '--Teste Desenvolvimento',
      rank: 'B',
      rankColor: '#34A853',
    },
    {
      id: 8,
      name: 'Teste NF',
      conversions: 15,
      updated_at: '2019-09-13 16:34',
      updated_at_formatted: '13/09/19 16:34',
      responsible: '--Teste Desenvolvimento',
      rank: 'C',
      rankColor: '#4285F4',
    },
    {
      id: 9,
      name: 'Teste NF',
      conversions: 15,
      updated_at: '2019-09-13 16:34',
      updated_at_formatted: '13/09/19 16:34',
      responsible: '--Teste Desenvolvimento',
      rank: 'D',
      rankColor: '#A1DCEF',
    },
    {
      id: 10,
      name: 'Teste NF',
      conversions: 15,
      updated_at: '2019-09-13 16:34',
      updated_at_formatted: '13/09/19 16:34',
      responsible: '--Teste Desenvolvimento',
      rank: 'E',
      rankColor: null,
    },
  ]);

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
          <Actions>
            <ActionButton
              icon="magnify"
              onPress={() => {
                console.tron.warn('pressed!');
              }}>
              Pesquisar
            </ActionButton>

            <ActionButton
              icon="account-plus"
              onPress={() => {
                console.tron.warn('pressed!');
              }}>
              Pesquisar
            </ActionButton>

            <ActionButton
              icon="filter-outline"
              onPress={() => {
                console.tron.warn('pressed!');
              }}>
              Últimas Conversões
            </ActionButton>

            <ActionButton
              icon="cached"
              onPress={() => {
                console.tron.warn('pressed!');
              }}>
              Leads Atualizados
            </ActionButton>
            <Filter>
              <Icon />
            </Filter>
            <Info>Total de leads únicos: {total}</Info>
          </Actions>
        }
        data={people}
        keyExtractor={item => item.id}
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
