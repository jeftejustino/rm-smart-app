import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';

import {
  Container,
  List,
  HeaderTitle,
  Item,
  ItemContent,
  ItemName,
  ItemDate,
} from './styles';

import {StartVisitRequest} from '~/store/modules/visit/actions';

export default function ListNew() {
  const [refreshing, setRefreshing] = useState(false);
  const [visits] = useState([
    {
      id: 1,
      name: 'Cliente Name',
      date_at: '2020-02-07 16:00',
      date_at_formatted: '07/02/2020 às 16:00',
      isSelected: false,
    },
    {
      id: 2,
      name: 'Cliente Name',
      date_at: '2020-02-07 16:00',
      date_at_formatted: '07/02/2020 às 16:00',
      isSelected: false,
    },
  ]);

  const dispatch = useDispatch();

  function startVisit(visit) {
    dispatch(StartVisitRequest(visit));
  }

  return (
    <Container>
      <List
        onRefresh={() => {}}
        refreshing={refreshing}
        ListHeaderComponent={
          <>
            <HeaderTitle>Selecione a visita que deseja começar</HeaderTitle>
          </>
        }
        data={visits}
        keyExtractor={item => String(item.id)}
        renderItem={({item, index}) => (
          <Item index={index} onPress={() => startVisit(item)}>
            <ItemContent>
              <ItemName>{item.name}</ItemName>
              <ItemDate>
                <Icon name="clock-outline" size={12} color="#333" />{' '}
                {item.date_at_formatted}
              </ItemDate>
            </ItemContent>
          </Item>
        )}
      />
    </Container>
  );
}

ListNew.navigationOptions = ({navigation}) => ({
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}>
      <Icon name="chevron-left" size={30} color="#fff" />
    </TouchableOpacity>
  ),
  headerLeftContainerStyle: {
    paddingLeft: 15,
  },
});
