'use client';
import { User } from '@/utils/auth';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { BiLogOut, BiUser } from 'react-icons/bi';
import { BsGraphDown } from 'react-icons/bs';

const Navbar = () => {
  const router = useRouter();
  const [username, setUsername] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUsername(JSON.parse(storedUser));
    }
  }, []);
  const handleLogout = () => {
    alert('Logged out successfully.');
    router.push('/auth/login');
  };

  return (
    <div className='w-full border-b  shadow-sm p-4 flex flex-row items-center justify-between'>
      <div className='font-medium md:text-lg uppercase px-2 py-1 rounded-md bg-green-100 flex flex-row gap-2 items-center'>
        <BsGraphDown />
        Graph n Charts
      </div>
      <div className='flex flex-row gap-4'>
        <div className='flex flex-row items-center gap-2 px-2 rounded-md border border-gray-300 bg-green-400 hover:green-500 cursor-pointer '>
          <BiUser className='bg-slate-200 p-1 rounded-full w-6 h-6' />
          <div className='font-medium text-sm'>{username?.username}</div>
        </div>
        <button
          onClick={handleLogout}
          className=' bg-green-400 hover:green-500 text-gray-700 p-2 rounded-full border flex items-center cursor-pointer'
        >
          <BiLogOut className='w-4 h-4' />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
