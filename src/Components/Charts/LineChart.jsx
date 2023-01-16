import React, { useContext } from 'react';
import Chart from 'react-apexcharts'
import { ThemeContext } from '../../App.js'


const LineChart = ({ type, title, name, data, from, to, zoom }) => {
    let { isDark } = useContext(ThemeContext)
    var date = new Date();
    from = new Date(from)
    to = new Date(to)
    const options = {
        series: [{
            name: name,
            data: data
        }],
        chart: {
            height: 350,
            zoom: {
                enabled: zoom
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },
        title: {
            text: title,
            align: 'center'
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            },
        },
        xaxis: {
            type: 'month',
            // min: new Date(from).getTime() || new Date(date.getFullYear(), date.getMonth(), 1).getTime(),
            // max: new Date(to).getTime() || new Date(date.getFullYear(), date.getMonth() + 1, 0).getTime(),
            // tickAmount: 6,
        },
        tooltip: {
            x: {
                format: 'dd MMM yyyy'
            }
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
        } : {}
    };

    return (

        <div>
            <Chart options={options} series={options?.series} type={type} height={320} />
        </div>
    );
}

export default LineChart;
