import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { DateRangePicker } from 'react-date-range';
import { RangeKeyDict } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import Cookies from 'js-cookie';
import { getUser, isLoggedIn } from '@/utils/auth';

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

  const [range, setRange] = useState({
    startDate: startDate ? new Date(startDate) : new Date(),
    endDate: endDate ? new Date(endDate) : new Date(),
    key: 'selection',
  });

  const updateUrlParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.replace(`?${params.toString()}`);
  };

  const saveFiltersToCookies = () => {
    const user = getUser();
    if (user && isLoggedIn()) {
      const userFilters = {
        ageFilter,
        genderFilter,
        startDate,
        endDate,
      };
      Cookies.set(`filters_${user.username}`, JSON.stringify(userFilters), {
        expires: 30,
      });
    }
  };

  const loadFiltersFromCookies = () => {
    const user = getUser();
    if (user && isLoggedIn()) {
      const filters = Cookies.get(`filters_${user.username}`);
      if (filters) {
        const parsedFilters = JSON.parse(filters);
        setAgeFilter(parsedFilters.ageFilter);
        setGenderFilter(parsedFilters.genderFilter);
        setStartDate(parsedFilters.startDate);
        setEndDate(parsedFilters.endDate);
        setRange({
          ...range,
          startDate: new Date(parsedFilters.startDate),
          endDate: new Date(parsedFilters.endDate),
        });
      }
    }
  };

  const handleAgeFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setAgeFilter(value);
    updateUrlParams('age', value);
    saveFiltersToCookies(); // Save to cookies when changed
  };

  const handleGenderFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = e.target.value;
    setGenderFilter(value);
    updateUrlParams('gender', value);
    saveFiltersToCookies();
  };

  const handleDateRangeChange = (ranges: RangeKeyDict) => {
    const { startDate, endDate } = ranges.selection;
    const startStr = startDate ? startDate.toISOString().split('T')[0] : '';
    const endStr = endDate ? endDate.toISOString().split('T')[0] : '';

    setStartDate(startStr);
    setEndDate(endStr);
    updateUrlParams('startDate', startStr);
    updateUrlParams('endDate', endStr);
    if (startDate && endDate) setRange({ ...range, startDate, endDate });
    saveFiltersToCookies();
  };

  useEffect(() => {
    loadFiltersFromCookies();
  }, []);

  useEffect(() => {
    const age = searchParams.get('age') || '';
    const gender = searchParams.get('gender') || '';
    const start = searchParams.get('startDate') || '';
    const end = searchParams.get('endDate') || '';

    if (age !== ageFilter) setAgeFilter(age);
    if (gender !== genderFilter) setGenderFilter(gender);
    if (start !== startDate) setStartDate(start);
    if (end !== endDate) setEndDate(end);
  }, [searchParams]);

  return (
    <div className='grid grid-cols-2 md:flex flex-row gap-4 p-4'>
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
      <DateRangePicker
        ranges={[range]}
        onChange={handleDateRangeChange}
        className='border rounded-lg'
      />
    </div>
  );
};

export default Filters;
