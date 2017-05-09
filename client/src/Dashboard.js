import React, { Component } from 'react'
import {Doughnut} from 'react-chartjs-2';
import { connect } from 'react-redux';
import { fetchChartData } from './actions';
import { Link } from 'react-router-dom'

const categoryList = {
  arts_entertainment : "Arts & Entertainment",
  beauty_fitness : "Beauty & Fitness",
  books_literature : "Books & Literature",
  food_drink : "Food & Drink"
}

const data = {
 labels: [
    'Red',
    'Green',
    'Yellow',
    'Purple'
  ],
  datasets: [{
    data: [300, 50, 100],
    backgroundColor: [
    '#FF6384',
    '#36A2EB',
    '#FFCE56',
    '#800080'
    ],
    hoverBackgroundColor: [
    '#FF6300',
    '#36A2AB',
    '#FFCE00',
    '#522352'    
    ]
  }]
};

class Dashboard extends Component {
  componentDidMount() {
    this.props.fetchChartData();
  }

  render () {
    if(this.props.chartData.data) {
      data.labels = []
      data.datasets[0].data = []
      this.props.chartData.data.map( val => {
        if(categoryList[val.category])
          data.labels.push( categoryList[val.category] )
        else
          data.labels.push("Others")
          
        data.datasets[0].data.push(val.count)
      })
    }

    return (
      <div className="col-sm-12">
        <div id="bloggraph" className="col-sm-8">
          <h3>Task Chart based on category </h3>
          <h1></h1>
          <Doughnut data={data}	/>
        </div>
        <div id="bloggraph" className="col-sm-4">
          <h1></h1>
          <p>Total task count : { this.props.chartData.total }</p>
          <p><Link to="/tasks" className="">View Tasks</Link></p>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  chartData: React.PropTypes.object,
  fetchChartData: React.PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    chartData: state.chartData
  }
}

export default connect(mapStateToProps, { fetchChartData })(Dashboard);
