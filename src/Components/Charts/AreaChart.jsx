import React, { useContext } from 'react';
import Chart from 'react-apexcharts'
import { ThemeContext } from '../../App.js'

const AreaChart = ({ name, title, data, from, to }) => {
    let { isDark } = useContext(ThemeContext)
    var date = new Date();
    from = new Date(from)
    to = new Date(to)
    const series = [{
        name: name,
        data: data
    }]
    const options = {
        chart: {
            id: 'area-datetime',
            type: 'area',
            height: 350,
        },
        dataLabels: {
            enabled: false
        },
        markers: {
            size: 0,
            style: 'hollow',
        },
        xaxis: {
            type: 'datetime',
            min: new Date(from).getTime() || new Date(date.getFullYear(), date.getMonth(), 1).getTime(),
            max: new Date(to).getTime() || new Date(date.getFullYear(), date.getMonth() + 1, 0).getTime(),
            tickAmount: 6,
        },
        tooltip: {
            x: {
                format: 'dd MMM yyyy'
            }
        },
        title: {
            text: title,
            align: 'center'
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.5,
                opacityTo: 0.9,
                stops: [0, 100]
            }
        },
        theme: isDark ? { mode: 'dark' } : { mode: 'light', },
    }
    return (
        <div>
            <Chart options={options} series={series} type="area" height={350} />
        </div>
    );
}

export default AreaChart;
