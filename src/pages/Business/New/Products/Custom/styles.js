import styled from 'styled-components/native';

export const Container = styled.View``;

export const Label = styled.Text``;

export const Item = styled.View``;

export const Input = styled.TextInput`
  background: #fff;
  margin: 8px 0px;
  padding: 0px 10px;
  height: 40px;
  color: #000;
`;

export const Textarea = styled.TextInput.attrs({
  multiline: true,
  numberOfLines: 4,
  textAlignVertical: 'top',
})`
  background: #fff;
  margin: 8px 0px;
  padding: 10px 10px;
  height: 120px;
  color: #000;
`;
