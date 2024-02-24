import { Hr } from '@components/uiCore';
import React from 'react';
import { TEChart } from 'tw-elements-react';

const BarChart = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-xl">
      <h2 className="font-semibold uppercase text-neutral-800 mb-4">Bar Chart</h2>
      <Hr />
      <TEChart
        type="bar"
        data={{
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [
            {
              label: 'Traffic',
              data: [30, 15, 62, 65, 61, 6],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
            }
          ]
        }}
        options={{
          plugins: {
            legend: {
              position: 'top',
              labels: {
                color: 'green'
              }
            }
          },
          scales: {
            x: {
              ticks: {
                color: '#4285F4'
              }
            },
            y: {
              ticks: {
                color: '#f44242'
              }
            }
          }
        }}
      />
    </div>
  );
};

export default BarChart;
