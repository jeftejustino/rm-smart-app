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

export const Item = styled.View`
  border: 1px solid #ccc;
  border-top-width: 0;
  margin: 0px 20px;
  background: ${props => (props.index % 2 ? '#fff' : '#f6f6f6')};
`;

export const ItemContent = styled.View`
  padding: 10px;
`;

export const ItemInfo = styled.Text`
  font-weight: normal;
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 5px;
`;

export const ItemName = styled.Text`
  font-weight: normal;
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 5px;
`;

export const ItemDesc = styled.Text`
  font-weight: normal;
  font-size: 12px;
  margin-bottom: 5px;
`;

export const ItemCreated = styled.Text`
  font-weight: normal;
  font-size: 12px;
`;
