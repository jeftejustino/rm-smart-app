/* eslint-disable prettier/prettier */
import styled from 'styled-components/native';

export const Container = styled.View``;

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

export const FilterBlock = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
  justify-content: center;
`;

export const FilterLabel = styled.Text`
  color: #fff;
  font-size: 16px;
  width: 80px;
  padding-top: 15px;
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
  align-items: flex-start;
  padding: 10px;
`;

export const ItemDate = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 5px;
`;

export const ItemStart = styled.Text`
  font-size: 13px;
`;

export const ItemEnd = styled.Text`
  font-size: 13px;
`;

export const ItemAtvDate = styled.Text`
  font-size: 13px;
  margin-bottom: 5px;
`;

export const ItemAtvAddress = styled.Text`
  font-size: 13px;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom-color: #eee;
  width: 100%;
  border-bottom-width: 1px;
`;

export const ItemDisctance = styled.Text`
  font-size: 13px;
  margin-bottom: 5px;
`;

export const ItemAddress = styled.Text`
  font-size: 13px;
`;
