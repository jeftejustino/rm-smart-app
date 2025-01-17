import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {formatRelative, parseISO} from 'date-fns';
import pt from 'date-fns/locale/pt';

import Button from '~/components/Button';
import {
  Container,
  Title,
  User,
  Started,
  Input,
  InputTextArea,
  Address,
} from './styles';

import {StopVisitRequest} from '~/store/modules/visit/actions';

export default function VisitStarted() {
  const [obs, setObs] = useState();
  const [price, setPrice] = useState();
  const loading = useSelector(state => state.visit.loading);

  const dispacth = useDispatch();
  const visit = useSelector(state => {
    const started_at_formatted =
      state.visit.visit &&
      formatRelative(parseISO(state.visit.visit.started_at), new Date(), {
        locale: pt,
        addSuffix: true,
      });
    return {
      ...state.visit.visit,
      started_at_formatted,
    };
  });

  function StopVisit() {
    dispacth(StopVisitRequest({obs, price}));
  }

  return (
    <Container>
      <Title>Visita em Andamento</Title>
      <User>
        <Icon name="account" size={14} /> {visit.name}
      </User>
      <Address>
        <Icon name="map-marker" size={14} /> {visit.endereco}
      </Address>
      <Started>
        <Icon name="clock-outline" size={14} /> {visit.started_at_formatted}
      </Started>

      <InputTextArea
        placeholder="Observação"
        value={obs}
        onChangeText={setObs}
      />

      <Input placeholder="Valor" value={price} onChangeText={setPrice} />

      <Button loading={loading} onPress={() => StopVisit()}>
        Finalizar Visita
      </Button>
    </Container>
  );
}
