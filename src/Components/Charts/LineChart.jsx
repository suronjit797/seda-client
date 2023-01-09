import React from 'react';
import Chart from 'react-apexcharts'

const LineChart = ({ type, title, name, data, from, to }) => {
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
                enabled: false
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
    };

    return (

        <div>
            <Chart options={options} series={options?.series} type={type} height={320} />
        </div>
    );
}

export default LineChart;
