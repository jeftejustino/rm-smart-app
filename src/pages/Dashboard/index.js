import React, {useEffect, useState} from 'react';

import api from '~/services/api';

import {Container, Chart} from './styles';

import Views from './Views';
import People from './People';
import Business from './Business';

export default function Dashboard() {
  const [views, setViews] = useState({
    '2000-01-01': 1,
    '2000-01-02': 1,
    '2000-01-03': 1,
    '2000-01-04': 1,
    '2000-01-05': 1,
    '2000-01-06': 1,
    '2000-01-07': 1,
  });

  const [people, setPeople] = useState({
    '2000-01-01': 1,
    '2000-01-02': 1,
    '2000-01-03': 1,
    '2000-01-04': 1,
    '2000-01-05': 1,
    '2000-01-06': 1,
    '2000-01-07': 1,
  });

  const [business, setBusiness] = useState({
    '2000-01-01': 1,
    '2000-01-02': 1,
    '2000-01-03': 1,
    '2000-01-04': 1,
    '2000-01-05': 1,
    '2000-01-06': 1,
    '2000-01-07': 1,
  });

  async function getData() {
    try {
      const response = await api.get('dashboard');
      const {visitas, pessoas, vendas} = response.data;

      setViews(visitas);
      setPeople(pessoas);
      setBusiness(vendas);
    } catch (error) {
      // error
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      {views && (
        <Chart>
          <Views info={views} />
        </Chart>
      )}

      {people && (
        <Chart>
          <People info={people} />
        </Chart>
      )}

      {business && (
        <Chart>
          <Business info={business} />
        </Chart>
      )}
    </Container>
  );
}
