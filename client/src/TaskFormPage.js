import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { savetask, fetchtask, updatetask } from './actions';
import TaskForm from './TaskForm';

class TaskFormPage extends React.Component {

  state = {
    redirect: false
  }

  componentDidMount = () => {
    const { match } = this.props;
    if (match.params._id) {
      this.props.fetchtask(match.params._id);
    }
  }

  savetask = ({_id, title, taskContent }) => {
    if (_id) {
      return this.props.updatetask({ _id, title, taskContent }).then(
        () => { this.setState({ redirect: true })},
      );
    } else {
      return this.props.savetask({ title, taskContent }).then(
        () => { this.setState({ redirect: true })},
      );
    }
  }

  render() {
    return (
      <div>
        {
          this.state.redirect ?
          <Redirect to="/tasks" /> :
          <TaskForm
            task={this.props.task}
            savetask={this.savetask}
          />
        }
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const { match } = props;
  if (match.params._id) {
    return {
      task: state.tasks.find(item => item._id === match.params._id)
    }
  }

  return { task: null };
}

export default connect(mapStateToProps, { savetask, fetchtask, updatetask })(TaskFormPage);
