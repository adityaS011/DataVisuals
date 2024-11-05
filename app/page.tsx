
import Link from 'next/link';

export default function Home() {
  return (
    <main className='flex justify-center items-center h-screen'>
      <div className='flex gap-4'>
        <Link
          href='/auth/signup'
          className='bg-green-500 text-white py-2 px-4 rounded'
        >
          Sign Up
        </Link>
        <Link
          href='/auth/login'
          className='bg-blue-500 text-white py-2 px-4 rounded'
        >
          Log In
        </Link>
      </div>
    </main>
  );
}
