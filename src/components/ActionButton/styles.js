import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled.View``;

export const Button = styled(RectButton)`
  background: #ccc;
  border-radius: 30px;
  width: 60px;
  height: 60px;
  justify-content: center;
  align-items: center;
  color: #f60;
`;

export const Title = styled.Text`
  color: #333;
  font-size: 12px;
`;
