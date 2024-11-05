import React, { useEffect } from 'react';

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
  const handleAgeFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAgeFilter(e.target.value);
  };

  const handleGenderFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setGenderFilter(e.target.value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'startDate') {
      setStartDate(value);
    } else {
      setEndDate(value);
    }
  };

  useEffect(() => {
    const ageSelect = document.getElementById('ageSelect') as HTMLSelectElement;
    const genderSelect = document.getElementById(
      'genderSelect'
    ) as HTMLSelectElement;
    const startDateInput = document.getElementById(
      'startDateInput'
    ) as HTMLInputElement;
    const endDateInput = document.getElementById(
      'endDateInput'
    ) as HTMLInputElement;

    if (ageSelect) ageSelect.value = ageFilter;
    if (genderSelect) genderSelect.value = genderFilter;
    if (startDateInput) startDateInput.value = startDate;
    if (endDateInput) endDateInput.value = endDate;
  }, [ageFilter, genderFilter, startDate, endDate]);

  return (
    <div className='grid  grid-cols-2 md:grid-cols-4 gap-4 p-4'>
      <label className='p-2 border rounded-lg hover:bg-slate-100 bg-slate-50 flex flex-col gap-1'>
        Age:
        <select
          id='ageSelect'
          onChange={handleAgeFilterChange}
          className='w-full bg-slate-50'
        >
          <option value=''>All</option>
          <option value='15-25'>15-25</option>
          <option value='>25'>{`>25`}</option>
        </select>
      </label>
      <label className='p-2 border rounded-lg hover:bg-slate-100 bg-slate-50 flex flex-col gap-1'>
        Gender:
        <select
          id='genderSelect'
          onChange={handleGenderFilterChange}
          className='w-full bg-slate-50'
        >
          <option value=''>All</option>
          <option value='Male'>Male</option>
          <option value='Female'>Female</option>
        </select>
      </label>
      <label className='p-2 border rounded-lg hover:bg-slate-100 bg-slate-50 flex flex-col gap-1'>
        Start Date:
        <input
          id='startDateInput'
          type='date'
          name='startDate'
          onChange={handleDateChange}
          className='w-full bg-slate-50'
        />
      </label>
      <label className='p-2 border rounded-lg hover:bg-slate-100 bg-slate-50 flex flex-col gap-1'>
        End Date:
        <input
          id='endDateInput'
          type='date'
          name='endDate'
          onChange={handleDateChange}
          className='w-full bg-slate-50'
        />
      </label>
    </div>
  );
};

export default Filters;
