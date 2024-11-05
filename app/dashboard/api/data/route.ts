import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

export async function GET() {
  const filePath = path.join(process.cwd(), '/public/data.csv');
  const results: any[] = [];

  await new Promise<void>((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        resolve();
      })
      .on('error', (error) => reject(error));
  });

  return NextResponse.json(results);
}
