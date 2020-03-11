import styled from 'styled-components/native';

export const Container = styled.View`
  background: #fff;
  flex: 1;
`;

export const Actions = styled.View`
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: 30px;
  padding: 0px 20px;
`;

export const Filter = styled.View`
  background: #333;
  margin: 15px 0px 30px 0px;
  padding: 25px 20px;
`;

export const ItemHeader = styled.Text`
  border: 1px solid #ccc;
  font-weight: bold;
  padding: 5px 10px;
  margin: 30px 20px 0px;
`;

export const List = styled.FlatList`
  background: #fff;
`;

export const Item = styled.TouchableOpacity`
  border: 1px solid #ccc;
  border-top-width: 0;
  margin: 10px 20px;
  /* background: ${props => (props.index % 2 ? '#fff' : '#f6f6f6')}; */
  background: #fff;
`;

export const ItemContent = styled.View`
  padding: 0px;
`;

export const ItemTop = styled.View`
  flex-direction: row;
  padding: 5px 15px;
  background: ${props => (props.color ? props.color : '#ccc')};
`;

export const ItemProgress = styled.Text`
  width: 30%;
  font-size: 12px;
  color: #fff;
`;

export const ItemDays = styled.Text`
  width: 30%;
  font-size: 12px;
  color: #fff;
`;

export const ItemType = styled.Text`
  width: 40%;
  text-align: right;
  font-size: 12px;
  color: #fff;
`;

export const ItemName = styled.Text`
  font-weight: normal;
  font-size: 12px;
  padding: 10px 15px 0;
`;

export const ItemAtv = styled.Text`
  padding: 10px 15px;
  font-size: 13px;
  line-height: 20px;
`;

export const ItemDate = styled.View`
  flex-direction: row;
  padding: 0px 15px 5px;
  justify-content: space-between;
`;

export const ItemDateIni = styled.View`
  font-size: 12px;
`;

export const ItemDateIniSpan = styled.Text`
  font-size: 12px;
  font-weight: bold;
  text-align: center;
`;

export const ItemDateIniDate = styled.Text`
  font-size: 12px;
`;

export const ItemDateFim = styled.View`
  font-size: 12px;
`;

export const ItemDateFimSpan = styled.Text`
  font-weight: bold;
  font-size: 12px;
  text-align: center;
`;

export const ItemDateFimDate = styled.Text`
  font-size: 12px;
`;

export const ItemBottom = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 5px 15px 15px;
`;

export const ItemUser = styled.Text`
  padding: 5px 10px 0 0;
`;

export const ItemUpdate = styled.TouchableOpacity`
  background: #0a0;
  padding: 5px 10px;
  border-radius: 5px;
`;

export const ItemUpdateText = styled.Text`
  color: #fff;
  font-size: 13px;
`;
