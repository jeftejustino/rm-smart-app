import React from 'react';
import {Dimensions} from 'react-native';
import {LineChart} from 'react-native-chart-kit';

import {Container, Title} from './styles';

export default function Business() {
  const screenWidth = Dimensions.get('window').width;

  const labels = [
    '01/02',
    '02/02',
    '03/02',
    '04/02',
    '05/02',
    '06/02',
    '07/02',
  ];

  const data = {
    labels,
    datasets: [
      {
        data: [0, 5, 9, 15, 17, 10, 5],
        color: () => `#f60`, // optional
        strokeWidth: 2, // optional
      },
    ],
    // legend: ['Visitas'], // optional
  };

  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: '#f60',
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    barPercentage: 0,
  };

  return (
    <Container>
      <Title>Relatório de Vendas</Title>

      <LineChart
        data={data}
        width={screenWidth}
        height={250}
        chartConfig={chartConfig}
        withDots={false}
        verticalLabelRotation={30}
        segments={4}
        fromZero
        formatYLabel={string => parseInt(string, 10)}
      />
    </Container>
  );
}
