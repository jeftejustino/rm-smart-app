import React, {useState, useEffect} from 'react';
import {Dimensions} from 'react-native';
import {BarChart} from 'react-native-chart-kit';
import {parseISO, format} from 'date-fns';
import PropTypes from 'prop-types';

import {Container, Title} from './styles';

export default function People({info}) {
  const screenWidth = Dimensions.get('window').width;
  const [values, setValues] = useState([1, 1, 1, 1, 1, 1, 1]);
  const [labels, setLabels] = useState([
    '01/01',
    '02/01',
    '03/01',
    '04/01',
    '05/01',
    '06/01',
    '07/01',
  ]);

  const data = {
    labels,
    datasets: [
      {
        data: values,
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

  useEffect(() => {
    const lb = [];
    const vl = [];
    Object.entries(info).map(value => {
      lb.push(format(parseISO(value[0]), 'dd/MM'));
      vl.push(value[1]);
      return 0;
    });
    setLabels(lb);
    setValues(vl);
  }, [info]);

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

People.propTypes = {
  info: PropTypes.object.isRequired,
};
