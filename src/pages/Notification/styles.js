import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  background: #fff;
`;

export const Title = styled.Text`
  text-align: center;
  font-weight: bold;
  color: #000;
  font-size: 20px;
  margin-top: 15px;
  margin-bottom: 30px;
`;

export const Label = styled.Text`
  font-size: 16px;
  color: #333;
  margin-right: 10px;
`;

export const Desc = styled.Text`
  font-size: 12px;
  color: #666;
  margin-right: 10px;
`;

export const Div = styled.View`
  margin-bottom: 15px;
  flex-direction: row;
  text-align: center;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
  justify-content: space-between;
  padding: 0px 20px 15px 20px;
`;

export const DivText = styled.View`
  flex: 1;
  border-right-width: 1px;
  border-right-color: #eee;
  margin-right: 15px;
`;

export const Content = styled.View`
  border-top-width: 1px;
  border-top-color: #eee;
  padding-top: 15px;
`;

export const Switch = styled.Switch``;
