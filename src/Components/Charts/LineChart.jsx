import React from 'react';
import Chart from 'react-apexcharts'

const LineChart = ({type, title, name}) => {
    const options = {
        series: [{
            name: name,
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
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
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        }
    };

    return (

        <div>
            <Chart options={options} series={options?.series} type={type} height={320} />
        </div>
    );
}

export default LineChart;
