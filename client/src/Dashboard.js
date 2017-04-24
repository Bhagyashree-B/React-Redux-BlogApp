import React, { Component } from 'react'
import {Doughnut} from 'react-chartjs-2';

const data = {
  labels: [
    'Red',
    'Green',
    'Yellow'
  ],
  datasets: [{
    data: [300, 50, 100],
    backgroundColor: [
    '#FF6384',
    '#36A2EB',
    '#FFCE56'
    ],
    hoverBackgroundColor: [
    '#FF6384',
    '#36A2EB',
    '#FFCE56'
    ]
  }]
};

export default class Dashboard extends Component {
  render () {
    return (
      <div id="bloggraph" className="col-sm-4">
        <h1>Graph</h1>
        <Doughnut data={data} />
      </div>
    )
  }
}