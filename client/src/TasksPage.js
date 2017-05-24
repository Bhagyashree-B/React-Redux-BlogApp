import React from 'react';
import TasksList from './TasksList';
import TaskFormModalPopup from './TaskFormModalPopup';
import { connect } from 'react-redux';
import { fetchtasks, deletetask } from './actions';

/**
  TaskPage consist Add task modal popup and TasksList which shows all the task.
  It fetches tasks and pass to its child component.
**/
class tasksPage extends React.Component {
  componentDidMount() {
    this.props.fetchtasks()
  }

  render() {
    const {store} = this.props
    return (
      <div>
      <div className="pull-right">  < TaskFormModalPopup store = {store}/> </div>
        <h1>Tasks List</h1>
        <TasksList tasks={this.props.tasks} deletetask={this.props.deletetask} />
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
  return {
    tasks: state.tasks
  }
}

export default connect(mapStateToProps, { fetchtasks, deletetask })(tasksPage);
