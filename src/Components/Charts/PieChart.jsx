import React from 'react';
import Chart from 'react-apexcharts'

const PieChart = ({ data }) => {
  // console.log(data)
  let labels = data.map(d => d._id)
  let series = data.map(d => d.count)
  let options = {
    chart: {
      width: 380,
      type: 'pie',
    },
    title: {
      text: 'title',
      align: 'center'
    },
    labels,
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
