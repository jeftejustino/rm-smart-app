import styled from 'styled-components/native';
import {Dimensions} from 'react-native';

export const Container = styled.ScrollView``;

export const Header = styled.View`
  padding: 0px 10px 15px;
`;

export const Total = styled.Text``;

export const Qtd = styled.Text``;

export const Pipeline = styled.FlatList`
  flex-grow: 1;
`;

export const PPItem = styled.View`
  width: ${() => Dimensions.get('window').width}px;
`;

export const PPItemHeader = styled.View`
  background: ${props => (props.color ? props.color : '#fff')};
  padding: 6px 0px;
`;

export const PPItemName = styled.Text`
  color: ${props => (props.color ? props.color : '#000')};
  text-align: center;
  font-weight: bold;
  font-size: 18px;
`;

export const PPItemInfo = styled.View`
  flex-direction: row;
  justify-content: center;
  padding-top: 5px;
`;

export const PPItemPrice = styled.Text`
  color: ${props => (props.color ? props.color : '#000')};
  padding-right: 10px;
  border-right-color: ${props => (props.color ? props.color : '#000')};
  border-right-width: 1px;
  font-size: 16px;
  font-weight: bold;
`;

export const PPItemPriceSuffix = styled.Text`
  font-weight: normal;
  font-size: 13px;
`;

export const PPItemQtd = styled.Text`
  color: ${props => (props.color ? props.color : '#000')};
  padding-left: 10px;
`;

export const PPItemContent = styled.View``;

export const PPB = styled.View`
  background: #fff;
  border-bottom-width: 1px;
  border-bottom-color: ${props => (props.color ? props.color : '#000')};
  padding: 5px 10px;
`;

export const PPBName = styled.Text`
  font-weight: bold;
  color: #000;
`;

export const PPBClient = styled.Text``;

export const PPBDays = styled.Text``;

export const PPBPrice = styled.Text`
  border-right-width: 1px;
  border-right-color: #000;
  margin-right: 10px;
  padding-right: 10px;
`;

export const PPBPriceSuffix = styled.Text``;

export const PPBTop = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const PPBBottom = styled.View`
  flex-direction: row;
`;

export const HeaderInfo = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin: 10px 0px 10px;
`;

export const HeaderQtd = styled.Text`
  color: #000;
  font-size: 12px;
  padding-top: 4px;
`;

export const HeaderPrice = styled.Text`
  font-size: 18px;
  color: #000;
  font-weight: bold;
`;
