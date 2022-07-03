import React from 'react';
import {Line} from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto';

function LineChart(props) {
    let UserData = props.data;
    const cond_data = UserData.filter(item=> item[props.condition_label] === props.condition );
    const x_label = props.x;
    const y_label = props.y;
    const x_data = cond_data.map((data) => data[x_label]);
    const y_data = cond_data.map((data) => data[y_label]);
    let chartData = {
        labels : x_data,
        datasets:[{
            data:y_data,
            label:props.label,
            borderColor:props.color,
            borderWidth:2,
        }],
    }

    const option = {
        responsive: true,maintainAspectRatio: false
    };

    return <Line 
        data={chartData}
        options={option}
    />
}

export default LineChart;