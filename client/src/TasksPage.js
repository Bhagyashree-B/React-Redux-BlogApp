import React from 'react';
import TasksList from './TasksList';
import TaskFormModalPopup from './TaskFormModalPopup';
import { connect } from 'react-redux';
import { fetchtasks, deletetask ,savetask } from './actions';

class tasksPage extends React.Component {
  state = {
    newData: []
  }

  componentDidMount() {
  //  console.log(" In componentDidMount")
    try{
     this.props.fetchtasks().then(data => {
      //  console.log(`parsed data from taskPPPPPPPPPPPP ${JSON.stringify(data)}`);
        this.setState({newData : data.tasks })
   })
    }catch(ex){
      console.log(ex)
    }
  }

  render() {
    const {store} = this.props
    return (
      <div>
      <div className="pull-right">  < TaskFormModalPopup store = {store} /> </div>
        <h1>tasks List</h1>
       <TasksList tasks={this.state.newData} deletetask={this.props.deletetask} />
      </div>
    );
  }
}

tasksPage.propTypes = {
  tasks: React.PropTypes.array.isRequired,
  fetchtasks: React.PropTypes.func.isRequired,
  deletetask: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
  newData : state.tasks
  //console.log("===============",  state.tasks)
  return {
    tasks: state.tasks

  }
}

export default connect(mapStateToProps, { fetchtasks, deletetask})(tasksPage);
