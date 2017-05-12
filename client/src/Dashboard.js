import React, { Component } from 'react'
import {Doughnut, Bar} from 'react-chartjs-2';
import { connect } from 'react-redux';
import { fetchChartData } from './actions';
import { Link } from 'react-router-dom'

const categoryList = {
  arts_entertainment : "Arts & Entertainment",
  beauty_fitness : "Beauty & Fitness",
  books_literature : "Books & Literature",
  food_drink : "Food & Drink"
}

let dataBycategory = {
 labels: [ ],
 datasets: [{
    data: [],
    backgroundColor: [ "#2ecc71", "#3498db", "#95a5a6", "#9b59b6", "#f1c40f", "#e74c3c", "#34495e",
      '#FF6384', '#36A2EB', '#FFCE56', '#800080' ],
 }]
};

let allData = {
  labels: [],
  datasets: [
    {
      label: 'No. of Tasks for user',
      backgroundColor: 'rgba(27, 165, 255, 0.4)',
      borderColor: 'rgba(27, 165, 255, 1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(98, 247, 102, 0.4)',
      hoverBorderColor: 'rgba(98, 247, 102, 1)',
      data: []
    }
  ]
};

const chartOptions = {
    showAllTooltips: true,
}

class Dashboard extends Component {
  componentDidMount() {
    this.props.fetchChartData();
  }

  render () {
    dataBycategory.labels = []
    dataBycategory.datasets[0].data = []
    allData.labels = []
    allData.datasets[0].data = []

    if(this.props.chartData.dataBycategory) {
      this.props.chartData.dataBycategory.data.map( val => {
        if(categoryList[val.category])
          dataBycategory.labels.push( categoryList[val.category] )
        else
          dataBycategory.labels.push("Others")
          
        dataBycategory.datasets[0].data.push(val.count)
      })
    }

    if(this.props.chartData.allData) {
      this.props.chartData.allData.map( val => {
        allData.labels.push(val.userName)  
        allData.datasets[0].data.push(val.count)
      })
    }

    return (
      <div className="col-sm-12">
        <div id="bloggraph" className="col-sm-8">
          <h3>Tasks - Categories </h3>
          <h1></h1>
          { this.props.chartData.dataBycategory && this.props.chartData.dataBycategory.total ? 
            <Doughnut data={dataBycategory} options={chartOptions}/> : "No task added yet." }
        </div>
        <div id="bloggraph" className="col-sm-4">
          <h1></h1>
          <p>Total task count : { this.props.chartData.dataBycategory ? this.props.chartData.dataBycategory.total : 0 }</p>
          <p><Link to="/tasks" className="">View Tasks</Link></p>
        </div>

        <div id="bloggraph" className="col-sm-8">
          <h1></h1>
          <h1></h1>
          <h1></h1>
          <h3>Tasks - Users</h3>
          <h1></h1>
          <Bar data={allData} options={chartOptions}/>
          <h1></h1>
        </div>
      </div>
    )
  }

  componentWillMount() {
    Chart.pluginService.register({
      beforeRender: function (chart) {
        if (chart.config.options.showAllTooltips) {
          chart.pluginTooltips = [];
          chart.config.data.datasets.forEach(function (dataset, i) {
            chart.getDatasetMeta(i).data.forEach(function (sector, j) {
              chart.pluginTooltips.push(new Chart.Tooltip({
                _chart: chart.chart,
                _chartInstance: chart,
                _data: chart.data,
                _options: chart.options.tooltips,
                _active: [sector]
              }, chart));
            });
          });
          // turn off normal tooltips
          chart.options.tooltips.enabled = false;
        }
      }, afterDraw: function (chart, easing) {
        if (chart.config.options.showAllTooltips) {
          // we don't want the permanent tooltips to animate, so don't do anything till the animation runs atleast once
          if (!chart.allTooltipsOnce) {
            if (easing !== 1) return;
            chart.allTooltipsOnce = true;
          }
          chart.options.tooltips.enabled = true;
          Chart.helpers.each(chart.pluginTooltips, function (tooltip) {
            tooltip.initialize();
            tooltip.update(); // we don't actually need this since we are not animating tooltips
            tooltip.pivot();
            tooltip.transition(easing).draw();
          });
          chart.options.tooltips.enabled = false;
        }
      }
    });
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
