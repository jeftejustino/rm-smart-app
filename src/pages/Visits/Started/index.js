import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {formatRelative, parseISO} from 'date-fns';
import pt from 'date-fns/locale/pt';

import Button from '~/components/Button';
import {Container, Title, User, Started} from './styles';

import {StopVisitRequest} from '~/store/modules/visit/actions';

export default function VisitStarted() {
  const dispacth = useDispatch();
  const visit = useSelector(state => {
    const started_at_formatted =
      state.visit.visit &&
      formatRelative(state.visit.visit.started_at, new Date(), {
        locale: pt,
        addSuffix: true,
      });
    return {
      ...state.visit.visit,
      started_at_formatted,
    };
  });

  function StopVisit() {
    dispacth(StopVisitRequest());
  }

  return (
    <Container>
      <Title>Visita em Andamento</Title>
      <User>
        <Icon name="account" size={14} />
        {visit.name}
      </User>
      <Started>
        <Icon name="clock-outline" size={14} />
        {visit.started_at_formatted}
      </Started>

      <Button onPress={() => StopVisit()}> Finalizar Visita</Button>
    </Container>
  );
}
