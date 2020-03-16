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
  margin: 15px 20px;
  background: #fff;
`;

export const ItemHeader = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
  padding: 5px 10px;
  background: #868788;
`;

export const ItemName = styled.Text`
  font-weight: bold;
  color: #fff;
  font-size: 13px;
`;

export const ItemContent = styled.View`
  align-items: flex-start;
  background: #F7F7F7;
  padding: 15px 10px;
  border-top-width: 0px;
  border-bottom-color: #868788;
  border-bottom-width: 1px;
  border-right-color: #868788;
  border-right-width: 1px;
  border-left-color: #868788;
  border-left-width: 1px;
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

export const ItemDistance = styled.View``;

export const ItemAtvDT = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
`;

export const ItemAtvDate = styled.View`
  margin-right: 15px;
  padding-right: 15px;
  border-right-color: #c2c2c2;
  border-right-width: 1px;
`;

export const ItemAtvDTTitle = styled.Text`
  color: #000;
  font-size:12px;
  font-weight: bold;
`;

export const ItemAtvDTDate = styled.Text`
  color: #868788;
  font-weight: bold;
  font-size: 18px;
`;

export const ItemAtvTime = styled.View``;

export const ItemAtvAddress = styled.Text`
  font-size: 12px;
  width: 100%;
  color: #868788;
`;

export const ItemAtvAddressTitle = styled.Text`
  font-weight: bold;
`;

export const ItemVisit = styled.View`
  flex-direction: row;
  flex-basis: 100%;
  width: 100%;
  justify-content: space-between;
  margin-bottom:15px;
`;

export const ItemCheckin = styled.View`
  background: #F9DBC6;
padding:5px 10px;
`;

export const ItemCheckinTitle = styled.Text`
  color: #F37B2C;
  font-weight: bold;
  font-size:12px;
`;

export const ItemCheckinDate = styled.Text`
  color: #868788;
font-size:10px;
`;

export const ItemCheckout = styled.View`
  background: #CAECC9;
  padding:5px 10px;
`;

export const ItemCheckoutTitle = styled.Text`
  color: #6DCF4E;
  font-size:12px;
  font-weight: bold;
`;

export const ItemCheckoutDate = styled.Text`
color: #868788;
font-size:10px;
`;

export const ItemDisctance = styled.Text`
  font-size: 13px;
  margin-bottom: 5px;
`;

export const ItemDistanceTitle = styled.Text`
  color: #000;
  font-size: 15px;
  font-weight: bold;
`;

export const ItemDistanceTime = styled.Text`
  font-size:13px;
`;
