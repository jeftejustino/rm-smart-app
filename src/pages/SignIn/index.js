import React, {useState, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {Container, Logo, Form, Div} from './styles';
import Input from '~/components/Input';
import Button from '~/components/Button';

import logo from '~/assets/images/logo.png';

import {SignInRequest} from '~/store/modules/auth/actions';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passwordRef = useRef();

  const loading = useSelector(state => state.auth.loading);
  const dispatch = useDispatch();

  function handleSubmit() {
    dispatch(SignInRequest({email, password}));
  }

  return (
    <Container>
      <Logo source={logo} resizeMode="stretch" />
      <Div>
        <Form>
          <Input
            icon="person"
            keyboardType="email-address"
            placeholder="Seu Email"
            autoCompleteType="email"
            style={{marginBottom: 40}}
            value={email}
            autoCorrect={false}
            onChangeText={setEmail}
            onSubmitEditing={() => passwordRef.current.focus()}
            returnKeyType="next"
          />
          <Input
            icon="https"
            autoCorrect={false}
            secureTextEntry
            placeholder="Sua Senha"
            style={{marginBottom: 40}}
            value={password}
            onChangeText={setPassword}
            ref={passwordRef}
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
