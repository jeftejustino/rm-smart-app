import React, {useState, useRef} from 'react';

import {Container, Logo, Form, Div} from './styles';

import logo from '~/assets/images/logo.png';

import Input from '~/components/Input';

import Button from '~/components/Button';

export default function SignIn() {
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const passRef = useRef();

  function handleSubmit() {}

  return (
    <Container>
      <Logo source={logo} resizeMode="stretch" />
      <Div>
        <Form>
          <Input
            name="email"
            icon="person"
            keyboardType="email-address"
            placeholder="Seu Email"
            autoCompleteType="email"
            style={{marginBottom: 40}}
            value={name}
            autoCorrect={false}
            onChangeText={setName}
            onSubmitEditing={() => passRef.current.focus()}
            returnKeyType="next"
          />
          <Input
            name="senha"
            icon="https"
            autoCorrect={false}
            secureTextEntry
            placeholder="Sua Senha"
            style={{marginBottom: 40}}
            value={pass}
            onChangeText={setPass}
            ref={passRef}
            onSubmitEditing={() => handleSubmit()}
            returnKeyType="send"
          />

          <Button onPress={() => handleSubmit()}>ENTRAR</Button>
        </Form>
      </Div>
    </Container>
  );
}
