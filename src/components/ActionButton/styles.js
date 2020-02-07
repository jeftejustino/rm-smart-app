import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled.View``;

export const Button = styled(RectButton)`
  background: ${props => (props.active ? props.bgColorActive : props.bgColor)};
  border-radius: 30px;
  width: 60px;
  height: 60px;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  color: #333;
  font-size: 11px;
  width: 60px;
  text-align: center;
  margin-top: 5px;
`;
