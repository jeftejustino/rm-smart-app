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
  const [pessoalHeight] = useState(new Animated.Value(475));
  const [pessoalActive, setPessoalActive] = useState(true);
  const [enderecoHeight] = useState(new Animated.Value(0));
  const [enderecoActive, setEnderecoActive] = useState(false);
  const [socialHeight] = useState(new Animated.Value(0));
  const [socialActive, setSocialActive] = useState(false);

  const sector = [
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
  ];

  const sizeCompany = [
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
  ];

  function toggleGroupPessoal() {
    if (pessoalActive) {
      console.tron.warn(pessoalHeight);
      Animated.timing(pessoalHeight, {
        toValue: 0,
        duration: 500,
      }).start();
    } else {
      console.tron.warn(pessoalHeight);
      Animated.timing(pessoalHeight, {
        toValue: 565,
        duration: 500,
      }).start();
    }

    setPessoalActive(!pessoalActive);
  }

  function toggleGroupEndereco() {
    if (enderecoActive) {
      console.tron.warn(enderecoHeight);
      Animated.timing(enderecoHeight, {
        toValue: 0,
        duration: 500,
      }).start();
    } else {
      console.tron.warn(enderecoHeight);
      Animated.timing(enderecoHeight, {
        toValue: 509,
        duration: 500,
      }).start();
    }

    setEnderecoActive(!enderecoActive);
  }

  function toggleGroupSocial() {
    if (socialActive) {
      console.tron.warn(socialHeight);
      Animated.timing(socialHeight, {
        toValue: 0,
        duration: 500,
      }).start();
    } else {
      console.tron.warn(socialHeight);
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
            <Title>Empresa</Title>
          </GroupHeader>
          <Animated.View
            style={{
              overflow: 'hidden',
              height: pessoalHeight,
            }}>
            <GroupContent>
              <Input placeholder="Empresa" />
              <Input placeholder="CNPJ" />
              <Input placeholder="Email" />
              <Input placeholder="Telefone" />
              <Input placeholder="Celular" />
              <Input placeholder="Site" />
              <Select options={sector} />
              <Select options={sizeCompany} />
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