import styled from 'styled-components/native';

export const Container = styled.View`
  background: #fff;
  margin: 8px 0px;
  padding: 0px 15px;
  height: 40px;
`;

export const ModalContainer = styled.View`
  background: #000a;
  padding: 20px;
  flex: 1;
`;
export const ModalContent = styled.View`
  background: #fff;
  flex: 1;
`;

export const ModalOptions = styled.View`
  flex: 1;
`;
export const InputSearch = styled.TextInput`
  border: 1px solid #ccc;
  margin: 15px 15px;
  height: 40px;
`;

export const Options = styled.FlatList``;

export const NotFound = styled.Text`
  padding: 15px 15px;
`;

export const OpenModal = styled.TouchableOpacity``;

export const CloseModal = styled.TouchableOpacity`
  align-self: center;
  margin-bottom: 15px;
  background: #666;
  border-radius: 5px;
  padding: 10px 15px;
`;

export const CloseModalText = styled.Text`
  color: #fff;
`;

export const Label = styled.Text`
  height: 40px;
  color: #000;
  padding: 0px;
  line-height: 40px;
  font-size: 15px;
`;

export const Item = styled.TouchableOpacity`
  padding: 10px 15px;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
`;

export const ItemText = styled.Text`
  height: 40px;
  color: #000;
  padding: 10px 0px;
`;
