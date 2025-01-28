import React from 'react';

import { SalesLineChart } from "./components/salesLineChart.tsx";
import { SalesBarChart } from "./components/salesBarChart.tsx";
import { CategoryPieChart } from "./components/categoryPieChart.tsx";
import { UsersTable, ProductsTable } from "./components/usersTable.tsx";


// Main App Component
export default function App() {
  return (
    <div className="parent">
      <h1 className="title">Sample Dashboard with resize & reposition </h1>
      
      {/* Charts Section */}
      <div className='chartContainer'>
        <SalesLineChart />
        <CategoryPieChart />
        <SalesBarChart />
      </div>
      
      {/* Tables Section */}
      <div className='tableContainer'>
        <UsersTable />
        <ProductsTable />
      </div>
    </div>
  );
}