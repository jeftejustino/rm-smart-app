import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity, Alert} from 'react-native';
import PropTypes from 'prop-types';
import {
  format,
  getHours,
  getMinutes,
  setMinutes,
  setHours,
  parseISO,
} from 'date-fns';

import api from '~/services/api';

import Button from '~/components/Button';
import SelectAjax from '~/components/SelectAjax';
import Select from '~/components/Select';
import DatePicker from '~/components/DatePicker';

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
  const [cliente, setCliente] = useState('');
  const [clienteName, setClienteName] = useState('Selecione a Pessoa');
  const [responsibles, setResponsibles] = useState([]);
  const [responsible, setResponsible] = useState();
  const [date, setDate] = useState(new Date());
  const [type, setType] = useState();
  const [location, setLocation] = useState('');

  const types = [
    {
      value: 0,
      label: 'Tipo da Atividade',
    },
    {
      value: 1,
      label: 'Email',
    },
    {
      value: 2,
      label: 'Ligação',
    },
    {
      value: 3,
      label: 'Proposta',
    },
    {
      value: 4,
      label: 'Reunião',
    },
    {
      value: 5,
      label: 'Visita',
    },
  ];

  async function submitNewActivity() {
    setLoading(true);
    try {
      await api.post('atividade/create', {
        id_assinante: cliente,
        aviso,
        tipo: type,
        use_id: responsible,
        endereco: location,
        hora: getHours(date),
        minuto: getMinutes(date),
        data: format(date, 'Y-LL-dd'),
      });
      Alert.alert('Novo cadastro realizado!');
      navigation.navigate('ActivityList');
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
      await api.post(`atividade/update/${itemId}`, {
        id_assinante: cliente,
        aviso,
        tipo: type,
        use_id: responsible,
        endereco: location,
        hora: getHours(date),
        minuto: getMinutes(date),
        data: format(date, 'Y-LL-dd'),
      });
      Alert.alert('Cadastro atualizado!');
      navigation.navigate('ActivityList');
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
      submitNewActivity();
    }
  }

  async function loadActivity() {
    if (!itemId) return;

    setLoading(true);

    try {
      const response = await api.get(`atividade/${itemId}`);
      const {data} = response;
      setAviso(data.aviso);
      setDate(
        setMinutes(setHours(parseISO(data.data), data.hora), data.minuto),
      );

      setClienteName(data.nome_emp_ass);
      setCliente(data.id_assinante);
      setResponsible(data.id_user);
      setLocation(data.endereco);
      setType(parseInt(data.tipo, 10));
    } catch (error) {
      Alert.alert('Falha ao carregar atividade!');
      navigation.navigate('activityList');
    } finally {
      setLoading(false);
    }
  }

  async function loadResponsibles() {
    try {
      const response = await api.get('colaborador/listar');

      setResponsibles([
        {
          value: 0,
          label: 'Escolher Vendedor',
        },
        ...response.data,
      ]);
    } catch (error) {
      setResponsibles([
        {
          value: 0,
          label: 'Escolher Vendedor',
        },
      ]);
    }
  }

  useEffect(() => {
    loadResponsibles();
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
            <SelectAjax
              defaultLabel={clienteName}
              defaultValue={cliente}
              url="pessoas"
              onValueChange={setCliente}
            />
            {responsibles.length ? (
              <Select
                options={responsibles}
                selectedValue={responsible}
                onValueChange={value => setResponsible(value)}
              />
            ) : (
              <></>
            )}

            <DatePicker defaultDate={date} onDateChange={setDate} />

            <Select
              options={types}
              selectedValue={type}
              onValueChange={value => setType(value)}
            />

            {type === 5 ? (
              <Input
                placeholder="Localização"
                value={location}
                onChangeText={setLocation}
              />
            ) : (
              <></>
            )}

            <InputTextArea
              placeholder="Descrição"
              value={aviso}
              onChangeText={setAviso}
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
