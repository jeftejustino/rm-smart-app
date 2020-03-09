import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #fff;
  padding: 20px 20px;
`;

export const Title = styled.Text`
  text-align: center;
  font-size: 20px;
  margin-bottom: 20px;
`;

export const User = styled.Text`
  font-size: 16px;
  margin-bottom: 5px;
  text-align: left;
`;

export const Address = styled.Text`
  margin-bottom: 5px;
  text-align: left;
`;

export const Started = styled.Text`
  margin-bottom: 5px;
  text-align: left;
`;

export const Input = styled.TextInput`
  background: #fff;
  margin: 8px 0px 16px;
  padding: 0px 10px;
  height: 40px;
  border: 1px solid #ddd;
`;

export const InputTextArea = styled.TextInput.attrs({
  multiline: true,
  numberOfLines: 3,
  textAlignVertical: 'top',
})`
  border: 1px solid #ddd;
  background: #fff;
  margin: 8px 0px;
  padding: 10px 10px;
  height: 70px;
`;
