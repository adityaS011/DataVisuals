'use client';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { BiBarChart, BiHome, BiLineChart, BiTable } from 'react-icons/bi';

const sidebarItems = [
  {
    label: 'Home',
    icon: <BiHome className='w-5 h-5' />,
    route: '/dashboard',
  },
  {
    label: 'Bar Chart',
    icon: <BiBarChart className='w-5 h-5' />,
    route: '/dashboard/bar-chart',
  },
  //  {
  //    label: 'Line Chart',
  //    icon: <BiLineChart className='w-5 h-5' />,
  //    route: '/dashboard/line-chart',
  //  },
  {
    label: 'Data Table',
    icon: <BiTable className='w-5 h-5' />,
    route: '/dashboard/data-table',
  },
];

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div
      className='
      md:w-1/6 w-full md:h-full h-auto border-e md:border-b-0 border-slate-200
      flex md:flex-col flex-row fixed md:relative bottom-0 md:pt-12 justify-evenly md:justify-start
      md:px-4 px-2 text-gray-600 text-sm  gap-4 z-100 bg-white pb-2
    '
    >
      {sidebarItems.map((item, index) => (
        <div
          key={index}
          onClick={() => {
            router.push(item.route);
          }}
          className={`flex flex-row gap-2 items-center hover:bg-green-300 p-2 rounded-lg cursor-pointer ${
            item.route === pathname ? 'bg-green-200 text-green-600' : ''
          }`}
        >
          {item.icon}
          <span className='md:block hidden'>{item.label}</span>{' '}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
