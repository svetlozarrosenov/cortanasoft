'use client';
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from './chart.module.css';

const Chart: React.FC = () => {
  const data = [
    { name: 'Януари', value: 400 },
    { name: 'Февруари', value: 300 },
    { name: 'Март', value: 650 },
    { name: 'Април', value: 200 },
    { name: 'Май', value: 660 },
    { name: 'Юни', value: 500 },
    { name: 'Юли', value: 300 },
    { name: 'Август', value: 100 },
    { name: 'Септември', value: 1600 },
    { name: 'Октомври', value: 1200 },
    { name: 'Ноември', value: 900 },
    { name: 'Декември', value: 920 },
  ];
  
  return (
    <div className={styles.chart}>
      <ResponsiveContainer width="100%" height={480}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;