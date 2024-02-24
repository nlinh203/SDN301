import React from 'react';
import LineChart from './LineChart';
import PieChart from './PieChart';
import PolarChart from './PolarChart';
import BarChart from './BarChart';
import DoughnutChart from './DoughnutChart';

const Dashboard = () => {
  return (
    <div className="flex flex-wrap">
      <div className="sm:w-full lg:w-4/12 p-4">
        <PieChart />
      </div>
      <div className="sm:w-full lg:w-4/12 p-4">
        <PolarChart />
      </div>
      <div className="sm:w-full lg:w-4/12 p-4">
        <DoughnutChart />
      </div>
      <div className="sm:w-full lg:w-6/12 p-4">
        <LineChart />
      </div>
      <div className="sm:w-full lg:w-6/12 p-4">
        <BarChart />
      </div>
    </div>
  );
};

export default Dashboard;
