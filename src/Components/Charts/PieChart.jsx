import React from 'react';
import Chart from 'react-apexcharts'

const PieChart = ({title}) => {
    let series= [44, 55, 13, 43, 22]
    let options = {
        chart: {
          width: 380,
          type: 'pie',
        },
        title: {
            text: title,
            align: 'center'
        },
        labels: ['Device 1', 'Device 2', 'Device 3', 'Device 4', 'Device 5'],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      }


    return (
        <div>
            <Chart options={options} series={series} type="pie" width={400} />
        </div>
    );
}

export default PieChart;
