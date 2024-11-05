'use client';
import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Data_Table, FeatureKeys } from '../../data-table/DataTable';
import Filters from './Filters';
import { useRouter, useSearchParams } from 'next/navigation';
import LineGraph from '../../line-chart/LineGraph';

interface ChartData {
  feature: string;
  total: number;
}
export interface LineData {
  date: string;
  value: number;
}

const BarGraph: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [tableData, setTableData] = useState<Data_Table[]>([]);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [lineData, setLineData] = useState<LineData[]>([]);
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  const [ageFilter, setAgeFilter] = useState<string>(
    searchParams.get('age') || ''
  );
  const [genderFilter, setGenderFilter] = useState<string>(
    searchParams.get('gender') || ''
  );
  const [startDate, setStartDate] = useState<string>(
    searchParams.get('startDate') || ''
  );
  const [endDate, setEndDate] = useState<string>(
    searchParams.get('endDate') || ''
  );

  const fetchData = async () => {
    const response = await fetch('api/data');
    const data: Data_Table[] = await response.json();
    setTableData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterData();
  }, [tableData, ageFilter, genderFilter, startDate, endDate]);

  const updateFiltersInURL = (filters: {
    age: string;
    gender: string;
    startDate: string;
    endDate: string;
  }) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      }
    });
    router.push(`?${params.toString()}`);
  };

  const filterData = () => {
    const filtered = tableData.filter((item) => {
      const date = new Date(item.Day);
      const isWithinDateRange =
        (!startDate || date >= new Date(startDate)) &&
        (!endDate || date <= new Date(endDate));
      const isAgeMatch = !ageFilter || item.Age === ageFilter;
      const isGenderMatch = !genderFilter || item.Gender === genderFilter;

      return isWithinDateRange && isAgeMatch && isGenderMatch;
    });

    const totals: { [key in FeatureKeys]: number } = {
      A: 0,
      B: 0,
      C: 0,
      D: 0,
      E: 0,
      F: 0,
    };
    filtered.forEach((item) => {
      (['A', 'B', 'C', 'D', 'E', 'F'] as FeatureKeys[]).forEach((feature) => {
        const value = parseInt(item[feature]);
        if (!isNaN(value)) {
          totals[feature] += value; // This will now work without type errors
        }
      });
    });

    const chartDataArray = Object.entries(totals).map(([feature, total]) => ({
      feature,
      total,
    }));

    setChartData(chartDataArray);
  };

  const handleBarClick = (data: { feature: FeatureKeys }) => {
    setSelectedFeature(data.feature);
    const timeTrendData = tableData
      .filter((item) => {
        const date = new Date(item.Day);
        const isWithinDateRange =
          (!startDate || date >= new Date(startDate)) &&
          (!endDate || date <= new Date(endDate));
        const isAgeMatch = !ageFilter || item.Age === ageFilter;

        return (
          isWithinDateRange &&
          isAgeMatch &&
          !isNaN(parseInt(item[data.feature]))
        );
      })
      .map((item) => ({
        date: item.Day,
        value: parseInt(item[data.feature]),
      }));

    setLineData(timeTrendData);
  };

  return (
    <div className='flex flex-col w-full p-4 overflow-auto h-full pb-24'>
      <Filters
        ageFilter={ageFilter}
        genderFilter={genderFilter}
        startDate={startDate}
        endDate={endDate}
        setAgeFilter={(value) => {
          setAgeFilter(value);
          updateFiltersInURL({
            age: value,
            gender: genderFilter,
            startDate,
            endDate,
          });
        }}
        setEndDate={(value) => {
          setEndDate(value);
          updateFiltersInURL({
            age: ageFilter,
            gender: genderFilter,
            startDate,
            endDate: value,
          });
        }}
        setGenderFilter={(value) => {
          setGenderFilter(value);
          updateFiltersInURL({
            age: ageFilter,
            gender: value,
            startDate,
            endDate,
          });
        }}
        setStartDate={(value) => {
          setStartDate(value);
          updateFiltersInURL({
            age: ageFilter,
            gender: genderFilter,
            startDate: value,
            endDate,
          });
        }}
      />

      <ResponsiveContainer height={400} className='w-full  md:w-1/2 z-50'>
        <BarChart
          data={chartData}
          onClick={(e) =>
            e && handleBarClick(e.activePayload && e.activePayload[0].payload)
          }
          layout='vertical'
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          barSize={30}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis type='number' />
          <YAxis type='category' dataKey='feature' />
          <Tooltip />
          <Legend />
          <Bar dataKey='total' fill='#8884d8' />
        </BarChart>
      </ResponsiveContainer>

      {selectedFeature && <LineGraph lineData={lineData} />}
    </div>
  );
};

export default BarGraph;
