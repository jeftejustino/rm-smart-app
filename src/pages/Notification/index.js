import React, {useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native';
import OneSignal from 'react-native-onesignal';

import api from '~/services/api';

import {
  Container,
  Content,
  Title,
  Desc,
  Label,
  Div,
  DivText,
  Switch,
} from './styles';

export default function Dashboard() {
  const [start, setStart] = useState(true);
  const [pushToken, setPushToken] = useState();
  const [userId, setUserId] = useState();
  const [lead, setLead] = useState();
  const [atividade, setAtividade] = useState();
  const [reuniao, setReuniao] = useState();
  const [loading, setLoading] = useState(true);

  const onIds = data => {
    setPushToken(data.pushToken);
    setUserId(data.userId);
  };

  OneSignal.addEventListener('ids', onIds);

  async function getData() {
    if (!userId) return;
    try {
      const response = await api.get('config/notificacao', {
        params: {
          userId,
          pushToken,
        },
      });
      setAtividade(Boolean(response.data.atividade));
      setReuniao(Boolean(response.data.reuniao));
      setLead(Boolean(response.data.lead));
    } catch (error) {
      // error
    } finally {
      setLoading(false);
      setStart(false);
    }
  }

  async function updateData() {
    if (start) return;
    try {
      await api.post('config/notificacao/update', {
        userId,
        pushToken,
        atividade,
        reuniao,
        lead,
      });
    } catch (error) {
      // error
    }
  }

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  useEffect(() => {
    updateData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [atividade, lead, reuniao]);

  return (
    <Container>
      <Title>Notificações</Title>

      {loading ? (
        <ActivityIndicator />
      ) : (
        <Content>
          <Div>
            <DivText>
              <Label>Reuniões</Label>
              <Desc>Notificar sobre Reuniões agendadas</Desc>
            </DivText>
            <Switch value={reuniao} onValueChange={setReuniao} />
          </Div>
          <Div>
            <DivText>
              <Label>Atividades</Label>
              <Desc>Notificar sobre Reuniões agendadas</Desc>
            </DivText>
            <Switch value={atividade} onValueChange={setAtividade} />
          </Div>
          <Div>
            <DivText>
              <Label>Notificar sobre Leads</Label>
              <Desc>Notificar sobre Reuniões agendadas</Desc>
            </DivText>
            <Switch value={lead} onValueChange={setLead} />
          </Div>
        </Content>
      )}
    </Container>
  );
}
