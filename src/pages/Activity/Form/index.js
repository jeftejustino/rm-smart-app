import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity, Alert} from 'react-native';
import PropTypes from 'prop-types';

import api from '~/services/api';

import Button from '~/components/Button';
import SelectAjax from '~/components/SelectAjax';

import {
  Container,
  Groups,
  Group,
  GroupHeader,
  Title,
  GroupContent,
  Input,
  InputTextArea,
} from './styles';

export default function ActivityForm({navigation}) {
  const itemId = navigation.getParam('itemId');
  const [loading, setLoading] = useState(false);
  const [aviso, setAviso] = useState('');

  async function submitNewCompany() {
    setLoading(true);
    try {
      await api.post('empresa/create', {
        aviso,
      });
      Alert.alert('Novo cadastro realizado!');
      navigation.navigate('CompanyList');
    } catch (error) {
      Alert.alert('Erro ao salvar!', error.response.data.error || '');
      console.tron.log();
    } finally {
      setLoading(false);
    }
  }

  async function submitUpdateCompany() {
    setLoading(true);
    try {
      await api.post(`empresa/update/${itemId}`, {
        aviso,
      });
      Alert.alert('Cadastro atualizado!');
      navigation.navigate('CompanyList');
    } catch (error) {
      Alert.alert('Erro ao salvar!', error.response.data.error || '');
      console.tron.log();
    } finally {
      setLoading(false);
    }
  }

  function handleSubmitForm() {
    if (itemId) {
      submitUpdateCompany();
    } else {
      submitNewCompany();
    }
  }

  async function loadCompany() {
    if (!itemId) return;

    setLoading(true);

    try {
      const response = await api.get(`empresa/${itemId}`);
      const {data} = response;
      setAviso(data.aviso);
    } catch (error) {
      Alert.alert('Falha ao carregar pessoa!');
      navigation.navigate('CompanyList');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCompany();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Groups>
        <Group>
          <GroupHeader>
            <Title>Empresa</Title>
          </GroupHeader>
          <GroupContent>
            <SelectAjax
              defaultLabel="Selecione a Pessoa"
              defaultValue="0"
              url="pessoas"
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

ActivityForm.navigationOptions = ({navigation}) => ({
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

ActivityForm.propTypes = {
  navigation: PropTypes.object.isRequired,
};
