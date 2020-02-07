import React from 'react';
import {Dimensions} from 'react-native';
import {BarChart} from 'react-native-chart-kit';

import {Container, Title} from './styles';

export default function People() {
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
        data: [20, 45, 28, 80, 99, 43, 34],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        barColors: ['#f00'],
      },
    ],
    barColors: ['#f00'],
  };

  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: '#f60',
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    barPercentage: 1,
    barColors: ['#f00'],
  };

  return (
    <Container>
      <Title>Pessoas</Title>
      <BarChart
        barColors="#f00"
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
      />
    </Container>
  );
}
