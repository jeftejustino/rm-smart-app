import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity, Alert} from 'react-native';
import PropTypes from 'prop-types';

import api from '~/services/api';

import Select from '~/components/Select';
import Button from '~/components/Button';

import {
  Container,
  Groups,
  Group,
  GroupHeader,
  Title,
  GroupContent,
  InputTextArea,
} from './styles';

export default function ActivityUpdate({navigation}) {
  const itemId = navigation.getParam('itemId');
  const [loading, setLoading] = useState(false);
  const [obs, setObs] = useState('');
  const [progress, setProgress] = useState('');
  const [options, setOptions] = useState([]);

  async function updateActivity() {
    setLoading(true);
    try {
      await api.post(`atividade/obs/${itemId}`, {
        obs,
        progress,
      });
      Alert.alert('Atividade atualizada!');
      navigation.navigate('ActivityList');
    } catch (error) {
      Alert.alert('Erro ao salvar!', error.response.data.error || '');
    } finally {
      setLoading(false);
    }
  }

  function handleSubmitForm() {
    if (itemId) {
      updateActivity();
    }
  }

  async function loadActivity() {
    setLoading(true);

    try {
      const response = await api.get(`atividade/${itemId}`);
      const {data} = response;
      const opts = [];
      for (
        let index = parseInt(data.porcentagem, 10);
        index <= 100;
        index += 10
      ) {
        opts.push({
          value: index,
          label: `${index}%`,
        });
      }
      setOptions(opts);
    } catch (error) {
      Alert.alert('Falha ao carregar atividade!');
      navigation.navigate('activityList');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadActivity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Groups>
        <Group>
          <GroupHeader>
            <Title>Atividade</Title>
          </GroupHeader>
          <GroupContent>
            <Select
              options={options}
              selectedValue={progress}
              onValueChange={value => setProgress(value)}
            />

            <InputTextArea
              placeholder="Observações"
              value={obs}
              onChangeText={setObs}
            />
          </GroupContent>
        </Group>

        <Button
          style={{marginTop: 30}}
          loading={loading}
          onPress={() => {
            handleSubmitForm();
          }}>
          Salvar
        </Button>
      </Groups>
    </Container>
  );
}

ActivityUpdate.navigationOptions = ({navigation}) => ({
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

ActivityUpdate.propTypes = {
  navigation: PropTypes.object.isRequired,
};
