import React, { useContext } from 'react';
import Chart from 'react-apexcharts'
import { ThemeContext } from '../../App.js'

const PieChart = ({ data }) => {
  let { isDark } = useContext(ThemeContext)
  // console.log(data)
  let labels = data.map(d => d?.name)
  let series = data.map(d => d?.value)
  let options = {
    chart: {
      width: 380,
      type: 'pie',
    },
    title: {
      text: 'Device (kWh)',
      align: 'center'
    },
    theme: isDark ? {
      mode: 'dark',
      palette: 'palette1',
      monochrome: {
        enabled: false,
        color: 'green',
        shadeTo: 'light',
        shadeIntensity: 0.65
      },
    } : {},
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
