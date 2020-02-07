import React, {useState} from 'react';
import {Animated} from 'react-native';
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

export default function PeopleList() {
  const [visitStarted, setVisitStarted] = useState(false);
  const [filterHeight, setFilterHeight] = useState(new Animated.Value(0));
  const [filterActive, setFilterActive] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [total, setTotal] = useState(0);
  const [visits, setVisits] = useState([
    {
      id: 1,
      name: 'Teste desenvolvimento',
      price: 120.54,
      price_formatted: 'R$ 120,54',
      address:
        'R. Napoleão Laureano, 5 - Fatima, Fortaleza - CE, 60040-530, Brazil',
      start_at: '2019-09-13 16:34',
      start_at_formatted: '13/09/19 16:34',
      end_at: '2019-09-13 18:10',
      end_at_formatted: '13/09/19 18:10',
    },
    {
      id: 2,
      name: 'Teste desenvolvimento',
      price: 120.54,
      price_formatted: 'R$ 120,54',
      address:
        'R. Napoleão Laureano, 5 - Fatima, Fortaleza - CE, 60040-530, Brazil',
      start_at: '2019-09-13 16:34',
      start_at_formatted: '13/09/19 16:34',
      end_at: '2019-09-13 18:10',
      end_at_formatted: '13/09/19 18:10',
    },
    {
      id: 3,
      name: 'Teste desenvolvimento',
      price: 120.54,
      price_formatted: 'R$ 120,54',
      address:
        'R. Napoleão Laureano, 5 - Fatima, Fortaleza - CE, 60040-530, Brazil',
      start_at: '2019-09-13 16:34',
      start_at_formatted: '13/09/19 16:34',
      end_at: '2019-09-13 18:10',
      end_at_formatted: '13/09/19 18:10',
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

  function startVisit() {
    setVisitStarted(true);
  }

  function stopVisit() {
    setVisitStarted(false);
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

              {visitStarted ? (
                <ActionButton
                  icon="minus"
                  onPress={() => {
                    stopVisit();
                  }}>
                  Finalizar Visita
                </ActionButton>
              ) : (
                <ActionButton
                  icon="plus"
                  onPress={() => {
                    startVisit();
                  }}>
                  Iniciar Visita
                </ActionButton>
              )}
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
