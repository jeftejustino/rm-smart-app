import styled from 'styled-components/native';

export const Container = styled.View``;

export const Actions = styled.View`
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 30px;
  padding: 0px 20px;
`;

export const Filter = styled.View`
  background: #333;
  margin: 15px 0px 30px 0px;
  padding: 25px 20px;
`;

export const Info = styled.Text`
  font-size: 11px;
  flex-grow: 1;
  flex-basis: 100%;
  padding: 0px 20px;
  background: #fff;
`;

export const List = styled.FlatList`
  background: #fff;
`;

export const Item = styled.View`
  border: 1px solid #ccc;
  margin: 15px 20px;
  background: #fff;
`;

export const ItemHeader = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
  padding: 5px 10px;
`;

export const ItemName = styled.Text`
  font-weight: bold;
  font-size: 13px;
`;

export const ItemContent = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

export const ItemRank = styled.View`
  background: ${props => (props.rankColor ? props.rankColor : '#fff')};
  border-radius: 10px;
  height: 20px;
  width: 20px;
  border: 1px solid #ccc;
  margin: 0px 5px;
  justify-content: center;
  align-items: center;
`;

export const ItemRankText = styled.Text`
  font-size: 12px;
  color: ${props => (props.rankColor ? '#fff' : '#333')};
`;

export const ItemConversions = styled.View`
  margin: 0px 15px;
  flex-grow: 0;
`;

export const ItemConversionsTitle = styled.Text`
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
  font-size: 10px;
  padding-bottom: 3px;
`;

export const ItemConversionsValue = styled.Text`
  font-size: 10px;
  text-align: center;
`;

export const ItemUpdated = styled.View`
  margin: 0px 15px;
  flex-grow: 0;
`;

export const ItemUpdatedTitle = styled.Text`
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
  font-size: 10px;
  padding-bottom: 3px;
  text-align: center;
`;

export const ItemUpdatedValue = styled.Text`
  background: #090;
  color: #fff;
  font-size: 10px;
  padding: 3px 5px;
`;

export const ItemResponsible = styled.View`
  margin: 0px 15px;
  flex-grow: 1;
`;

export const ItemResponsibleTitle = styled.Text`
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
  font-size: 10px;
  padding-bottom: 3px;
  text-align: center;
`;

export const ItemResponsibleValue = styled.Text.attrs({numberOfLines: 1})`
  font-size: 10px;
`;
