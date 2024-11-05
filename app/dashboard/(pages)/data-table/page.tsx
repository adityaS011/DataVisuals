import React, { Suspense } from 'react';
import DataTable from './DataTable';

const page = () => {
  return (
    <Suspense>
      <div className='px-2 pt-6 overflow-auto h-full pb-24'>
        <DataTable />
      </div>
    </Suspense>
  );
};

export default page;
