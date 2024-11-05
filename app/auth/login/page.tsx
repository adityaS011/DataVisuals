// pages/login.tsx

'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { validateLogin } from '@/utils/auth';

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateLogin(formData.username, formData.password)) {
      alert('Login successful!');
      router.push('/dashboard');
    } else {
      alert('Invalid username or password.');
    }
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <form
        className='w-1/3 bg-gray-100 p-8 rounded shadow-md'
        onSubmit={handleLogin}
      >
        <h2 className='text-2xl font-bold mb-6'>Log In</h2>
        <input
          className='w-full p-2 mb-4 border'
          type='text'
          placeholder='Username'
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          required
        />
        <input
          className='w-full p-2 mb-4 border'
          type='password'
          placeholder='Password'
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />
        <div className='flex flex-row gap-2 items-center'>
          <button
            type='submit'
            className='w-full bg-blue-500 text-white py-2 rounded'
          >
            Log In
          </button>
          <p>or</p>
          <button
            onClick={() => {
              router.push('/auth/signup');
            }}
            className='w-full bg-green-500 text-white py-2 rounded mt-2'
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;