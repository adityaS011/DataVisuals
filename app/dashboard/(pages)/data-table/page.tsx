import React, { Suspense } from 'react';
import DataTable from './DataTable';

const page = () => {
  return (
    <Suspense>
      <div className='p-2 overflow-auto h-full'>
        <DataTable />
      </div>
    </Suspense>
  );
};

export default page;
