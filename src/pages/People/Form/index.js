import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity, Animated, Alert} from 'react-native';
import PropTypes from 'prop-types';

import api from '~/services/api';

import Button from '~/components/Button';
import Select from '~/components/Select';

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

export default function PeopleForm({navigation}) {
  const itemId = navigation.getParam('itemId');
  const [loading, setLoading] = useState(false);
  const [pessoalHeight] = useState(new Animated.Value(535));
  const [pessoalActive, setPessoalActive] = useState(true);
  const [enderecoHeight] = useState(new Animated.Value(0));
  const [enderecoActive, setEnderecoActive] = useState(false);
  const [socialHeight] = useState(new Animated.Value(0));
  const [socialActive, setSocialActive] = useState(false);
  const [dataTipo, setDataTipo] = useState(1);
  const [dataNome, setDataNome] = useState('');
  const [dataEmail, setDataEmail] = useState('');
  const [dataTelefone1, setDataTelefone1] = useState('');
  const [dataTelefone2, setDataTelefone2] = useState('');
  const [dataEmpresa, setDataEmpresa] = useState('');
  const [dataCargo, setDataCargo] = useState('');
  const [dataOrigem, setDataOrigem] = useState(1);
  const [dataVend_id, setDataVend_id] = useState(0);
  const [dataCep, setDataCep] = useState('');
  const [dataEndereco, setDataEndereco] = useState('');
  const [dataNumero, setDataNumero] = useState('');
  const [dataComplemento, setDataComplemento] = useState('');
  const [dataBairro, setDataBairro] = useState('');
  const [dataCidade, setDataCidade] = useState('');
  const [dataEstado, setDataEstado] = useState('');
  const [dataObservacoes, setDataObservacoes] = useState('');
  const [dataFacebook, setDataFacebook] = useState('');
  const [dataInstagram, setDataInstagram] = useState('');
  const [dataLinkedin, setDataLinkedin] = useState('');
  const [dataYoutube, setDataYoutube] = useState('');

  const [responsible, setResponsible] = useState([]);

  const reference = [
    {
      value: 1,
      label: 'Google Orgânico',
    },
    {
      value: 3,
      label: 'Acesso Direto',
    },
    {
      value: 6,
      label: 'Social',
    },
    {
      value: 2,
      label: 'Google Adwords',
    },
    {
      value: 4,
      label: 'Email',
    },
    {
      value: 5,
      label: 'Referência',
    },
    {
      value: 7,
      label: 'Outros',
    },
    {
      value: 8,
      label: 'Cadastro Direto',
    },
    {
      value: 9,
      label: 'Carrinho Abandonado',
    },
    {
      value: 10,
      label: 'Telefone',
    },
    {
      value: 11,
      label: 'Indicação',
    },
    {
      value: 12,
      label: 'Feira/Eventos',
    },
  ];

  const types = [
    {
      value: 1,
      label: 'Novo Lead',
    },
    {
      value: 2,
      label: 'Novo Cliente',
    },
  ];

  async function loadReference() {
    try {
      const response = await api.get('colaborador/listar');

      setResponsible([
        {
          value: 0,
          label: 'Escolher Vendedor',
        },
        ...response.data,
      ]);
    } catch (error) {
      setResponsible([
        {
          value: 0,
          label: 'Escolher Vendedor',
        },
      ]);
    }
  }

  async function loadPeople() {
    if (!itemId) return;

    setLoading(true);

    try {
      const response = await api.get(`pessoa/${itemId}`);
      const {data} = response;
      setDataTipo(data.cliente ? 2 : 1);
      setDataNome(data.nome);
      setDataEmail(data.email);
      setDataTelefone1(data.telefone1);
      setDataTelefone2(data.telefone2);
      setDataEmpresa(data.empresa);
      setDataCargo(data.cargo);
      setDataOrigem(data.origem);
      setDataVend_id(data.vend_id);
      setDataCep(data.cep);
      setDataEndereco(data.endereco);
      setDataNumero(data.numero);
      setDataComplemento(data.complemento);
      setDataBairro(data.bairro);
      setDataCidade(data.cidade);
      setDataEstado(data.estado);
      setDataObservacoes(data.observacoes);
      setDataFacebook(data.facebook);
      setDataInstagram(data.instagram);
      setDataLinkedin(data.linkedin);
      setDataYoutube(data.youtube);
    } catch (error) {
      Alert.alert('Falha ao carregar pessoa!');
      navigation.navigate('PeopleList');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadReference();
    loadPeople();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function toggleGroupPessoal() {
    if (pessoalActive) {
      Animated.timing(pessoalHeight, {
        toValue: 0,
        duration: 500,
      }).start();
    } else {
      Animated.timing(pessoalHeight, {
        toValue: 535,
        duration: 500,
      }).start();
    }

    setPessoalActive(!pessoalActive);
  }

  function toggleGroupEndereco() {
    if (enderecoActive) {
      Animated.timing(enderecoHeight, {
        toValue: 0,
        duration: 500,
      }).start();
    } else {
      Animated.timing(enderecoHeight, {
        toValue: 509,
        duration: 500,
      }).start();
    }

    setEnderecoActive(!enderecoActive);
  }

  function toggleGroupSocial() {
    if (socialActive) {
      Animated.timing(socialHeight, {
        toValue: 0,
        duration: 500,
      }).start();
    } else {
      Animated.timing(socialHeight, {
        toValue: 254,
        duration: 500,
      }).start();
    }

    setSocialActive(!socialActive);
  }

  async function submitNewPeople() {
    setLoading(true);
    try {
      await api.post('pessoa/create', {
        lead: dataTipo === 1 ? 1 : 0,
        cliente: dataTipo === 2 ? 1 : 0,
        nome: dataNome,
        email: dataEmail,
        telefone1: dataTelefone1,
        telefone2: dataTelefone2,
        empresa: dataEmpresa,
        cargo: dataCargo,
        origem: dataOrigem,
        vend_id: dataVend_id,
        cep: dataCep,
        endereco: dataEndereco,
        numero: dataNumero,
        complemento: dataComplemento,
        bairro: dataBairro,
        cidade: dataCidade,
        estado: dataEstado,
        observacoes: dataObservacoes,
        facebook: dataFacebook,
        instagram: dataInstagram,
        linkedin: dataLinkedin,
        youtube: dataYoutube,
      });
      Alert.alert('Novo cadastro realizado!');
      navigation.navigate('PeopleList');
    } catch (error) {
      Alert.alert('Erro ao salvar!', error.response.data.error || '');
      console.tron.log();
    } finally {
      setLoading(false);
    }
  }

  async function submitUpdatePeople() {
    setLoading(true);
    try {
      await api.post(`pessoa/update/${itemId}`, {
        lead: dataTipo === 1 ? 1 : 0,
        cliente: dataTipo === 2 ? 1 : 0,
        nome: dataNome,
        email: dataEmail,
        telefone1: dataTelefone1,
        telefone2: dataTelefone2,
        empresa: dataEmpresa,
        cargo: dataCargo,
        origem: dataOrigem,
        vend_id: dataVend_id,
        cep: dataCep,
        endereco: dataEndereco,
        numero: dataNumero,
        complemento: dataComplemento,
        bairro: dataBairro,
        cidade: dataCidade,
        estado: dataEstado,
        observacoes: dataObservacoes,
        facebook: dataFacebook,
        instagram: dataInstagram,
        linkedin: dataLinkedin,
        youtube: dataYoutube,
      });
      Alert.alert('Cadastro atualizado!');
      navigation.navigate('PeopleList');
    } catch (error) {
      Alert.alert('Erro ao salvar!', error.response.data.error || '');
      console.tron.log();
    } finally {
      setLoading(false);
    }
  }

  function handleSubmitForm() {
    if (itemId) {
      submitUpdatePeople();
    } else {
      submitNewPeople();
    }
  }

  return (
    <Container>
      <Groups>
        <Group>
          <GroupHeader
            onPress={() => {
              toggleGroupPessoal();
            }}>
            <Title>Pessoal/Profissional</Title>
          </GroupHeader>
          <Animated.View
            style={{
              overflow: 'hidden',
              height: pessoalHeight,
            }}>
            <GroupContent>
              <Select
                options={types}
                selectedValue={dataTipo}
                onValueChange={value => setDataTipo(value)}
              />
              <Input
                placeholder="Nome"
                value={dataNome}
                onChangeText={setDataNome}
              />
              <Input
                placeholder="email"
                value={dataEmail}
                onChangeText={setDataEmail}
              />
              <Input
                placeholder="Telefone"
                value={dataTelefone1}
                onChangeText={setDataTelefone1}
              />
              <Input
                placeholder="Celular"
                value={dataTelefone2}
                onChangeText={setDataTelefone2}
              />
              <Input
                placeholder="Empresa"
                value={dataEmpresa}
                onChangeText={setDataEmpresa}
              />
              <Input
                placeholder="Cargo"
                value={dataCargo}
                onChangeText={setDataCargo}
              />
              <Select
                options={reference}
                selectedValue={dataOrigem}
                onValueChange={value => setDataOrigem(value)}
              />
              <Select
                options={responsible}
                selectedValue={dataVend_id}
                onValueChange={value => setDataVend_id(value)}
              />
            </GroupContent>
          </Animated.View>
        </Group>

        <Group>
          <GroupHeader
            onPress={() => {
              toggleGroupEndereco();
            }}>
            <Title>Endereço</Title>
          </GroupHeader>
          <Animated.View
            style={{
              overflow: 'hidden',
              height: enderecoHeight,
            }}>
            <GroupContent>
              <Input
                placeholder="CEP"
                value={dataCep}
                onChangeText={setDataCep}
              />
              <Input
                placeholder="Endereço"
                value={dataEndereco}
                onChangeText={setDataEndereco}
              />
              <Input
                placeholder="Numero"
                value={dataNumero}
                onChangeText={setDataNumero}
              />
              <Input
                placeholder="Complemento"
                value={dataComplemento}
                onChangeText={setDataComplemento}
              />
              <Input
                placeholder="Bairro"
                value={dataBairro}
                onChangeText={setDataBairro}
              />
              <Input
                placeholder="Cidade"
                value={dataCidade}
                onChangeText={setDataCidade}
              />
              <Input
                placeholder="Estado"
                value={dataEstado}
                onChangeText={setDataEstado}
              />
              <InputTextArea
                placeholder="Informações adicionais"
                value={dataObservacoes}
                onChangeText={setDataObservacoes}
              />
            </GroupContent>
          </Animated.View>
        </Group>

        <Group>
          <GroupHeader
            onPress={() => {
              toggleGroupSocial();
            }}>
            <Title>Social</Title>
          </GroupHeader>
          <Animated.View
            style={{
              overflow: 'hidden',
              height: socialHeight,
            }}>
            <GroupContent>
              <Input
                placeholder="Facebook"
                value={dataFacebook}
                onChangeText={setDataFacebook}
              />
              <Input
                placeholder="Instagram"
                value={dataInstagram}
                onChangeText={setDataInstagram}
              />
              <Input
                placeholder="Linkedin"
                value={dataLinkedin}
                onChangeText={setDataLinkedin}
              />
              <Input
                placeholder="Youtube"
                value={dataYoutube}
                onChangeText={setDataYoutube}
              />
            </GroupContent>
          </Animated.View>
        </Group>

        <Button
          loading={loading}
          style={{marginTop: 30}}
          onPress={() => handleSubmitForm()}>
          Salvar
        </Button>
      </Groups>
    </Container>
  );
}

PeopleForm.navigationOptions = ({navigation}) => ({
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

PeopleForm.propTypes = {
  navigation: PropTypes.object.isRequired,
};
