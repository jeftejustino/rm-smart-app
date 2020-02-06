import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled.ScrollView`
  padding: 0px 15px;
  background: #fff;
  flex: 1;
`;

export const Groups = styled.View`
  margin: 30px 0;
`;

export const Group = styled.KeyboardAvoidingView``;

export const GroupHeader = styled(RectButton)`
  background: #dadada;
  padding: 10px 15px;
  margin-top: 1px;
`;

export const Title = styled.Text`
  color: #f60;
  font-size: 14px;
`;

export const GroupContent = styled.View`
  background: #f2f2f2;
  padding: 15px 15px;
`;

export const Input = styled.TextInput`
  background: #fff;
  margin: 8px 0px;
  padding: 0px 10px;
  height: 40px;
`;

export const InputTextArea = styled.TextInput.attrs({
  multiline: true,
  numberOfLines: 3,
  textAlignVertical: 'top',
})`
  background: #fff;
  margin: 8px 0px;
  padding: 10px 10px;
  height: 70px;
`;
