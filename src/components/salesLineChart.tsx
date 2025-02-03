import { useSelector } from 'react-redux';
import React, { useState, useEffect, useRef } from 'react';

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from 'recharts';
export const SalesLineChart = () => {
  const data = useSelector((state) => state.chart.lineChartData);
  const [height, setHeight] = useState(300);
  const [width, setWidth] = useState(350)
  const elementRef = useRef(null);
  
  
  const style = {
    width: width, 
    height:height, 
    flex: 1, 
    resize:"both", 
    overflow:'hidden', 
    border:'1px solid #c7c7c7', 
    background: 'white'  
  };
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setHeight(entry.contentRect.height);
        setWidth(entry.contentRect.width);
      }
    });


    if (elementRef.current) {
      resizeObserver.observe(elementRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md" style={style}>
      <h2 className="text-xl font-semibold mb-4">Monthly Performance</h2>
      <div  style={{ width: "100%", height:"70%"}}>
        <ResponsiveContainer>
          <LineChart width={600} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sales" stroke="#8884d8" />
            <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
            <Line type="monotone" dataKey="profit" stroke="#ffc658" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
