import React from 'react';
import ReactApexChart from 'react-apexcharts';

const SplineChart = ({title, data, from, to}) => {
    const lengths = data.map(a=>a.data.length);
    const index = lengths.indexOf(Math.max(...lengths));
    var date = new Date();
    from = new Date(from)
    to = new Date(to)

    let series = data
    let options = {
        chart: {
            height: 350,
            type: 'area'
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            type: 'datetime',
            categories: data[index]?.date,
            min: new Date(from).getTime(),
            max: new Date(to).getTime(),
        },
        title: {
            text: title,
            align: 'center'
        },
        tooltip: {
            x: {
                format: 'dd/MM/yy HH:mm'
            },
        }
    }

    return (
        <div>
            <ReactApexChart options={options} series={series} type="area" height={450} />
        </div>
    );
}

export default SplineChart;
