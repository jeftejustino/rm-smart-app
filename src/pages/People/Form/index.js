import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity, Animated} from 'react-native';

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

export default function PeopleForm() {
  const [pessoalHeight] = useState(new Animated.Value(565));
  const [pessoalActive, setPessoalActive] = useState(true);
  const [enderecoHeight] = useState(new Animated.Value(0));
  const [enderecoActive, setEnderecoActive] = useState(false);
  const [socialHeight] = useState(new Animated.Value(0));
  const [socialActive, setSocialActive] = useState(false);
  const [dataForm, setDataForm] = useState({
    nome: '',
    email: '',
    telefone1: '',
    telefone2: '',
    empresa: '',
    cargo: '',
    origem: 1,
    vend_id: 0,
    msg: '',
    cep: '',
    endereco: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    observacoes: '',
    facebook: '',
    instagram: '',
    linkedin: '',
    youtube: '',
  });

  const [responsible, setResponsible] = useState([
    {
      value: 0,
      label: 'Escolher Vendedor',
    },
    {
      value: 1,
      label: 'Nome Vendedor 2',
    },
    {
      value: 2,
      label: 'Nome Vendedor 3',
    },
    {
      value: 3,
      label: 'Nome Vendedor 4',
    },
  ]);

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

  function toggleGroupPessoal() {
    if (pessoalActive) {
      Animated.timing(pessoalHeight, {
        toValue: 0,
        duration: 500,
      }).start();
    } else {
      Animated.timing(pessoalHeight, {
        toValue: 565,
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
              <Input placeholder="Nome" />
              <Input placeholder="email" />
              <Input placeholder="Telefone" />
              <Input placeholder="Celular" />
              <Input placeholder="Empresa" />
              <Input placeholder="Cargo" />
              <Select options={reference} />
              <Select options={responsible} />
              <InputTextArea placeholder="Solicitação do Cliente" />
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
              <Input name="cep" placeholder="CEP" />
              <Input name="endereco" placeholder="Endereço" />
              <Input name="numero" placeholder="Numero" />
              <Input name="complemento" placeholder="Complemento" />
              <Input name="bairro" placeholder="Bairro" />
              <Input name="cidade" placeholder="Cidade" />
              <Input name="estado" placeholder="Estado" />
              <InputTextArea name="obs" placeholder="Informações adicionais" />
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
              <Input name="facebook" placeholder="Facebook" />
              <Input name="instagram" placeholder="Instagram" />
              <Input name="linkedin" placeholder="Linkedin" />
              <Input name="youtube" placeholder="Youtube" />
            </GroupContent>
          </Animated.View>
        </Group>

        <Button style={{marginTop: 30}}>Salvar</Button>
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
