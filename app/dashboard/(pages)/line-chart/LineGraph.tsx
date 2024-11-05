import React from 'react';
import {
  Brush,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { LineData } from '../bar-chart/components/BarGraph';

const LineGraph = ({ lineData }: { lineData: LineData[] }) => {
  return (
    <div>
      <ResponsiveContainer className='w-full  ' height={400}>
        <LineChart data={lineData}>
          <Brush dataKey='date' height={30} stroke='#8884d8' />
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='date' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type='monotone'
            dataKey='value'
            label='Date range'
            stroke='#82ca9d'
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineGraph;
