import styled from 'styled-components/native';

export const Container = styled.View``;

export const Products = styled.FlatList``;

export const Item = styled.View`
  background: #f5f5f5;
  margin: 5px 0px;
  padding: 15px;
  border: 1px solid #ccc;
`;

export const Name = styled.Text`
  font-size: 16px;
  color: #000;
`;

export const Label = styled.Text`
  font-size: 13px;
  color: #000;
  margin-right: 10px;
`;

export const Div = styled.View`
  flex-direction: row;
  margin-top: 10px;
  align-items: center;
`;

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
