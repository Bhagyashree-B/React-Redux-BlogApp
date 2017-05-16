import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchChartData } from './actions';
import { Link } from 'react-router-dom'
import ReactHighcharts from 'react-highcharts';
import Highcharts from 'highcharts';

const categoryList = {
  arts_entertainment : "Arts & Entertainment",
  beauty_fitness : "Beauty & Fitness",
  books_literature : "Books & Literature",
  food_drink : "Food & Drink"
}

let dataBycategory = {
  chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Tasks - Categories Chart'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.y}</b>'
    },
    credits: {
        enabled: false
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.y}',
                style: {
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                }
            }
        }
    },
    credits: {
        enabled: false
    },
    series: [{
        name: 'Tasks',
        colorByPoint: true,
        data: []
    }]
};

let allData = {
  chart: {
        type: 'column'
    },
    title: {
        text: 'Tasks - Users Chart'
    },
    xAxis: {
        categories: []
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Number of tasks'
        },
        stackLabels: {
            enabled: true,
            style: {
                fontWeight: 'bold',
                color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
            }
        }
    },
    tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: 'Tasks: {point.y}'
    },
    plotOptions: {
        column: {
            stacking: 'normal',
            dataLabels: {
                enabled: false,
                color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
            }
        }
    },
    credits: {
        enabled: false
    },
    series: [{
        name: 'Users',
        data: [ ]
    }]
};

const chartOptions = {
    showAllTooltips: true,
}

class Dashboard extends Component {
  componentDidMount() {
    this.props.fetchChartData();
  }

  render () {
    if(this.props.chartData.dataBycategory) {
      dataBycategory.series[0].data = []
      this.props.chartData.dataBycategory.data.map( val => {
        let name
        if(categoryList[val.category])
          name = categoryList[val.category]
        else
          name = "Others"

        dataBycategory.series[0].data.push({ name: name, y :val.count })
      })
    }

    if(this.props.chartData.allData) {
      allData.xAxis.categories = []
      allData.series[0].data = []
      this.props.chartData.allData.map( val => {
        allData.xAxis.categories.push(val.userName)  
        allData.series[0].data.push(Number(val.count))
      })
    }

    return (
      <div className="col-sm-12">
        <div id="bloggraph" className="col-sm-8">
          <br></br>
          { this.props.chartData.dataBycategory && this.props.chartData.dataBycategory.total ? 
            <ReactHighcharts config = {dataBycategory}></ReactHighcharts> : "No task added yet." }
        </div>
        <div id="bloggraph" className="col-sm-4">
          <br></br>
          <p>Total task count : { this.props.chartData.dataBycategory ? this.props.chartData.dataBycategory.total : 0 }</p>
          <p><Link to="/tasks" className="">View Tasks</Link></p>
        </div>

        <div id="bloggraph" className="col-sm-8">
          <br></br>
          <br></br>
          <br></br>
          <ReactHighcharts id="test2" config = {allData}></ReactHighcharts>
          <br></br>
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
