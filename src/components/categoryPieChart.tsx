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
  ResponsiveContainer
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


export const CategoryPieChart = (props) => {
  const data = useSelector((state) => state.chart.pieChartData);
  const [height, setHeight] = useState(300);
  const [width, setWidth] = useState(350)
  const elementRef = useRef(null);

  
  const style = {
    width: width, 
    height:height + 150, 
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
    <div className="p-4 bg-white rounded-lg shadow-md"  style={style} >
      <h2 className="text-xl font-semibold mb-4">Category Distribution</h2>
      <div  style={{ width: "100%", height:height}}>
        <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx={200}
            cy={150}
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
