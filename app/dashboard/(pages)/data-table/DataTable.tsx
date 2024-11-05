'use client';
import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
} from '@mui/material';

export type Data_Table = {
  Day: string;
  Age: string;
  Gender: string;
  A: string;
  B: string;
  C: string;
  D: string;
  E: string;
  F: string;
};
export type FeatureKeys = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
const DataTable = () => {
  const [tableData, setTableData] = useState<Data_Table[]>([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedData = tableData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  const fetchData = async () => {
    const response = await fetch('api/data');
    const data = await response.json();
    console.log(data);
    setTableData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Paper className='border shadow-lg'>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow className='bg-slate-200'>
              <TableCell>Day</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>A</TableCell>
              <TableCell>B</TableCell>
              <TableCell>C</TableCell>
              <TableCell>D</TableCell>
              <TableCell>E</TableCell>
              <TableCell>F</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.Day}</TableCell>
                <TableCell>{row.Age}</TableCell>
                <TableCell>{row.Gender}</TableCell>
                <TableCell>{row.A}</TableCell>
                <TableCell>{row.B}</TableCell>
                <TableCell>{row.C}</TableCell>
                <TableCell>{row.D}</TableCell>
                <TableCell>{row.E}</TableCell>
                <TableCell>{row.F}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component='div'
        count={tableData.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[10, 15, 25]}
      />
    </Paper>
  );
};

export default DataTable;
