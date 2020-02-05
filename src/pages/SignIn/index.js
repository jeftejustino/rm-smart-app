import React, {useState, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {Container, Logo, Form, Div} from './styles';
import Input from '~/components/Input';
import Button from '~/components/Button';

import logo from '~/assets/images/logo.png';

import {SignInRequest} from '~/store/modules/auth/actions';

export default function SignIn() {
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const passRef = useRef();

  const loading = useSelector(state => state.auth.loading);
  const dispatch = useDispatch();

  function handleSubmit() {
    dispatch(SignInRequest({name, pass}));
  }

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

          <Button onPress={() => handleSubmit()} loading={loading}>
            ENTRAR
          </Button>
        </Form>
      </Div>
    </Container>
  );
}
