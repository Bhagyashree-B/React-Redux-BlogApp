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
    if (match.params.id) {
      this.props.fetchtask(match.params.id);
    }
  }

  savetask = ({id, title, taskContent }) => {
    if (id) {
      return this.props.updatetask({ id, title, taskContent }).then(
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
  if (match.params.id) {
    return {
      task: state.tasks.find(item => item.id === match.params.id)
    }
  }
  return { task: null };
}

export default connect(mapStateToProps, { savetask, fetchtask, updatetask })(TaskFormPage);
