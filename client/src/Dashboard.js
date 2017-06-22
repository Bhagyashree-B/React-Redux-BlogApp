import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchChartData } from './actions';
import { Link } from 'react-router-dom'
import {PieChart, BarChart} from 'react-d3-components';

export const statusList = {
  to_be_done : "To Be Done",
  inprogress : "In Progress",
  completed : "Completed"
}

class Dashboard extends Component {
  componentDidMount() {
    this.props.fetchChartData();
  }

  render () {
    var dataBycategory = {
                            label: 'Tasks - Status Chart',
                            values: []
                        };
    var allData = [{
                    label: 'User - Tasks(In progress) Chart',
                    values: [{x: 'User - Tasks(In progress) Chart', y: 10}]
                }];
    /**
      Shows a graph based on the status of task
    **/
    if(this.props.chartData.dataBycategory) {
      dataBycategory.values = []
      this.props.chartData.dataBycategory.data.map( val => {
        let name
        if(statusList[val.status])
          name = statusList[val.status] + " : " + val.count
        else
          name = "Others" + " : " + val.count

        dataBycategory.values.push({ x: name, y :val.count })
      })
    }

    /**
      Shows a graph based on the each user's tasks count
    **/
    if(this.props.chartData.allData) {
      allData[0].values = []
      this.props.chartData.allData.map( val => {
        allData[0].values.push({ x : val.userName +" : "+ Number(val.count), y : Number(val.count)})
      })
    }
 
    var sort = null; // d3.ascending, d3.descending, func(a,b) { return a - b; }, etc...

    return (
      <div className="col-sm-12">
       <div id="pie_chart" className="col-sm-8">
          <br></br>
          <h3 className="text-center">Tasks - Status Chart</h3>
          { this.props.chartData.dataBycategory && this.props.chartData.dataBycategory.total ?
            <PieChart data={dataBycategory} width={800} height={400} margin={{top: 30, bottom: 10, left: 100, right: 100}} 
            sort={sort} />
            : "No task added yet." }
        </div>

        <div id="" className="col-sm-4">
          <br></br>
          <p>Total task count : { this.props.chartData.dataBycategory ? this.props.chartData.dataBycategory.total : 0 }</p>
          <p><a className="tasks-link" href="/tasks">View Tasks</a></p>
        </div>

       <div id="bar_chart" className="col-sm-8">
          <br></br>
          <h3 className="text-center">User - Tasks(In progress) Chart</h3>
          { this.props.chartData.allData && this.props.chartData.allData.length ?
            <BarChart data={allData} width={800} height={400} margin={{top: 40, bottom: 50, left: 50, right: 50}}/>
            : "No user has added any task yet." }
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