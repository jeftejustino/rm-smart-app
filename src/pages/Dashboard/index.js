import React from 'react';

import {Container, Chart} from './styles';

import Views from './Views';
import People from './People';
import Business from './Business';

export default function Dashboard() {
  return (
    <Container>
      <Chart>
        <Views />
      </Chart>

      <Chart>
        <People />
      </Chart>

      <Chart>
        <Business />
      </Chart>
    </Container>
  );
}
