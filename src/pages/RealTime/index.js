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
  ItemInfo,
  ItemName,
  ItemDesc,
  ItemCreated,
} from './styles';

import ActionButton from '~/components/ActionButton';
import Input from '~/components/Input';
import Button from '~/components/Button';

export default function RealTime({navigation}) {
  const [filterHeight, setFilterHeight] = useState(new Animated.Value(0));
  const [filterActive, setFilterActive] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [total, setTotal] = useState(0);
  const [realTime, setRealTime] = useState([
    {
      id: 1,
      name: 'Teste NF',
      desc: 'Campanha de Email Marketing',
      action: 'Clickou',
      time: '2019-09-13 16:34',
      time_formatted: '13/09/19 às 16:34',
    },
    {
      id: 2,
      name: 'Teste NF',
      desc: 'Campanha de Email Marketing',
      action: 'Clickou',
      time: '2019-09-13 16:34',
      time_formatted: '13/09/19 às 16:34',
    },
    {
      id: 3,
      name: 'Teste NF',
      desc: 'Email de Aniversario',
      action: 'Visualizou',
      time: '2019-09-13 16:34',
      time_formatted: '13/09/19 às 16:34',
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
            <ItemHeader>Atividades Recentes</ItemHeader>
          </>
        }
        data={realTime}
        keyExtractor={item => String(item.id)}
        renderItem={({item, index}) => (
          <Item index={index}>
            <ItemContent>
              <ItemInfo>
                <ItemName>{item.name}</ItemName>
                {' | '}
                <ItemDesc>{item.desc}</ItemDesc>
              </ItemInfo>
              <ItemCreated>
                <Icon name="clock-outline" size={12} color="#333" />
                {item.action}
                {item.created_at_formatted}
              </ItemCreated>
            </ItemContent>
          </Item>
        )}
      />
    </Container>
  );
}
