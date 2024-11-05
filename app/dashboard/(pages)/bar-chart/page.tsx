import React, { Suspense } from 'react';
import BarGraph from './components/BarGraph';

const page = () => {
  return (
    <Suspense>
      <BarGraph />
    </Suspense>
  );
};

export default page;
