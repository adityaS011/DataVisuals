import React, { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  getUser,
  getUserPreferences,
  resetUserPreferences,
  saveUserPreferences,
} from '@/utils/auth';

interface FiltersProps {
  ageFilter: string;
  genderFilter: string;
  startDate: string;
  endDate: string;
  setAgeFilter: (val: string) => void;
  setGenderFilter: (val: string) => void;
  setEndDate: (val: string) => void;
  setStartDate: (val: string) => void;
}

const Filters: React.FC<FiltersProps> = ({
  ageFilter,
  genderFilter,
  startDate,
  endDate,
  setAgeFilter,
  setGenderFilter,
  setEndDate,
  setStartDate,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const user = getUser();

  if (!user) {
    router.push('/dashboard');
  }

  const updateUrlParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.replace(`?${params.toString()}`);
  };

  const handleAgeFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setAgeFilter(value);
    updateUrlParams('age', value);
    if (user)
      saveUserPreferences(user, { ...getUserPreferences(user), age: value });
  };

  const handleGenderFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = e.target.value;
    setGenderFilter(value);
    updateUrlParams('gender', value);
    if (user)
      saveUserPreferences(user, { ...getUserPreferences(user), gender: value });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'startDate') {
      setStartDate(value);
      updateUrlParams('startDate', value);
      if (user)
        saveUserPreferences(user, {
          ...getUserPreferences(user),
          startDate: value,
        });
    } else {
      setEndDate(value);
      updateUrlParams('endDate', value);
      if (user)
        saveUserPreferences(user, {
          ...getUserPreferences(user),
          endDate: value,
        });
    }
  };

  const resetFilters = () => {
    setAgeFilter('');
    setGenderFilter('');
    setStartDate('');
    setEndDate('');
    if (user) resetUserPreferences(user);
    updateUrlParams('age', '');
    updateUrlParams('gender', '');
    updateUrlParams('startDate', '');
    updateUrlParams('endDate', '');
  };

  useEffect(() => {
    if (user) {
      const storedPreferences = getUserPreferences(user);
      if (storedPreferences) {
        const { age, gender, startDate, endDate } = storedPreferences;
        setAgeFilter(age || '');
        setGenderFilter(gender || '');
        setStartDate(startDate || '');
        setEndDate(endDate || '');
      }
    }
  }, [searchParams]);

  return (
    <div className='grid grid-cols-2 md:flex flex-row md:items-center gap-4 p-4'>
      <label className='p-1 h-8 text-sm border rounded-lg hover:bg-slate-100 bg-slate-50 flex flex-row items-center gap-1'>
        Age:
        <select
          value={ageFilter}
          onChange={handleAgeFilterChange}
          className='w-fit h-fit bg-slate-50'
        >
          <option value=''>All</option>
          <option value='15-25'>15-25</option>
          <option value='>25'>{`>25`}</option>
        </select>
      </label>
      <label className='p-1 h-8 text-sm border rounded-lg hover:bg-slate-100 bg-slate-50 flex flex-row items-center gap-1'>
        Gender:
        <select
          value={genderFilter}
          onChange={handleGenderFilterChange}
          className='w-full bg-slate-50'
        >
          <option value=''>All</option>
          <option value='Male'>Male</option>
          <option value='Female'>Female</option>
        </select>
      </label>
      <label className='p-1 h-8 w-fit text-sm border rounded-lg hover:bg-slate-100 bg-slate-50 flex flex-row items-center gap-1'>
        <p className='flex flex-row w-full'>Start Date:</p>
        <input
          type='date'
          name='startDate'
          value={startDate}
          onChange={handleDateChange}
          className='w-fit h-fit bg-slate-50'
        />
      </label>
      <label className='p-1 h-8 w-fit text-sm border rounded-lg hover:bg-slate-100 bg-slate-50 flex flex-row items-center gap-1'>
        End Date:
        <input
          type='date'
          name='endDate'
          value={endDate}
          onChange={handleDateChange}
          className='w-fit h-fit bg-slate-50'
        />
      </label>

      {/* Reset button */}
      <button
        onClick={resetFilters}
        className='mt-4 text-sm text-blue-500 hover:underline'
      >
        Reset Filters
      </button>
    </div>
  );
};

export default Filters;
