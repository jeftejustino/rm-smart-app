import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity, Animated, Alert} from 'react-native';
import PropTypes from 'prop-types';

import api from '~/services/api';

import Button from '~/components/Button';

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

export default function CompanyForm({navigation}) {
  const itemId = navigation.getParam('itemId');
  const [loading, setLoading] = useState(false);
  const [pessoalHeight] = useState(new Animated.Value(745));
  const [pessoalActive, setPessoalActive] = useState(true);
  const [enderecoHeight] = useState(new Animated.Value(0));
  const [enderecoActive, setEnderecoActive] = useState(false);
  const [socialHeight] = useState(new Animated.Value(0));
  const [socialActive, setSocialActive] = useState(false);
  const [dataEmpresa, setDataEmpresa] = useState('');
  const [dataCnpj, setDataCnpj] = useState('');
  const [dataEmail, setDataEmail] = useState('');
  const [dataTelefone1, setDataTelefone1] = useState('');
  const [dataTelefone2, setDataTelefone2] = useState('');
  const [dataSite, setDataSite] = useState('');
  const [dataTamanho, setDataTamanho] = useState('');
  const [dataSetor, setDataSetor] = useState('');
  const [dataMunicipal, setDataMunicipal] = useState('');
  const [dataEstadual, setDataEstadual] = useState('');
  const [dataFaturamento, setDataFaturamento] = useState('');
  const [dataAbertura, setDataAbertura] = useState('');
  const [dataHolding, setDataHolding] = useState('');
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

  function toggleGroupPessoal() {
    if (pessoalActive) {
      Animated.timing(pessoalHeight, {
        toValue: 0,
        duration: 500,
      }).start();
    } else {
      Animated.timing(pessoalHeight, {
        toValue: 745,
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

  async function submitNewCompany() {
    setLoading(true);
    try {
      await api.post('empresa/create', {
        empresa: dataEmpresa,
        cnpj: dataCnpj,
        email: dataEmail,
        telefone1: dataTelefone1,
        telefone2: dataTelefone2,
        site: dataSite,
        tamanho: dataTamanho,
        setor: dataSetor,
        inscricao_municipal: dataMunicipal,
        inscricao_estadual: dataEstadual,
        faturamento_anual: dataFaturamento,
        data_abaertura: dataAbertura,
        holding: dataHolding,
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
        empresa: dataEmpresa,
        cnpj: dataCnpj,
        email: dataEmail,
        telefone1: dataTelefone1,
        telefone2: dataTelefone2,
        site: dataSite,
        tamanho: dataTamanho,
        setor: dataSetor,
        inscricao_municipal: dataMunicipal,
        inscricao_estadual: dataEstadual,
        faturamento_anual: dataFaturamento,
        data_abaertura: dataAbertura,
        holding: dataHolding,
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
      setDataEmpresa(data.empresa);
      setDataCnpj(data.cnpj);
      setDataEmail(data.email);
      setDataTelefone1(data.telefone1);
      setDataTelefone2(data.telefone2);
      setDataSite(data.site);
      setDataTamanho(data.tamanhp);
      setDataSetor(data.setor);
      setDataMunicipal(data.inscricao_municipal);
      setDataEstadual(data.inscricao_estadual);
      setDataFaturamento(data.faturamento_anual);
      setDataAbertura(data.data_abaertura);
      setDataHolding(data.holding);
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
          <GroupHeader
            onPress={() => {
              toggleGroupPessoal();
            }}>
            <Title>Empresa</Title>
          </GroupHeader>
          <Animated.View
            style={{
              overflow: 'hidden',
              height: pessoalHeight,
            }}>
            <GroupContent>
              <Input
                placeholder="Empresa"
                value={dataEmpresa}
                onChangeText={setDataEmpresa}
              />
              <Input
                placeholder="CNPJ"
                value={dataCnpj}
                onChangeText={setDataCnpj}
              />
              <Input
                placeholder="Email"
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
                placeholder="Site"
                value={dataSite}
                onChangeText={setDataSite}
              />
              <Input
                placeholder="Tamanho"
                value={dataTamanho}
                onChangeText={setDataTamanho}
              />
              <Input
                placeholder="Setor"
                value={dataSetor}
                onChangeText={setDataSetor}
              />
              <Input
                placeholder="Inscrição Municipal"
                value={dataMunicipal}
                onChangeText={setDataMunicipal}
              />
              <Input
                placeholder="Inscrição Estadual"
                value={dataEstadual}
                onChangeText={setDataEstadual}
              />
              <Input
                placeholder="Faturamento Anual"
                value={dataFaturamento}
                onChangeText={setDataFaturamento}
              />
              <Input
                placeholder="Data de Abertura"
                value={dataAbertura}
                onChangeText={setDataAbertura}
              />
              <Input
                placeholder="Holding"
                value={dataHolding}
                onChangeText={setDataHolding}
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

CompanyForm.navigationOptions = ({navigation}) => ({
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

CompanyForm.propTypes = {
  navigation: PropTypes.object.isRequired,
};
