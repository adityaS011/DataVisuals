'use client';
import { useRouter } from 'next/navigation';
import { logout, isLoggedIn } from '@/utils/auth';
import { useEffect } from 'react';

const Dashboard = () => {
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push('/auth/login');
    }
  }, [router]);



  return (
    <div className='flex flex-col justify-center items-center h-full  w-full'>
      <h1 className='text-4xl font-bold mb-8'>Welcome to the Dashboard</h1>
    </div>
  );
};

export default Dashboard;
