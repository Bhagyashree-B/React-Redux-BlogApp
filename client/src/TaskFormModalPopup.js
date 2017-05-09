import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { savetask, fetchtask, updatetask } from './actions';
import TaskForm from './TaskForm';
import {Modal , Button} from 'react-bootstrap';

class TaskFormModalPopup extends React.Component {

  state = {
    redirect: false,
    showModal: this.props.task ? true : false
  }

  close = () => {
    this.setState({ showModal: false });
  }

  open = () => {
    this.setState({ showModal: true });
  }

  savetask = ({ title, category, startDate , dueDate , taskContent }) => {
    // if (_id) {
    //   return this.props.updatetask({ _id, title, taskContent }).then(
    //     () => { this.setState({ redirect: true })},
    //   );
    // } else {
      return this.props.savetask({ title, category, startDate , dueDate , taskContent }).then(
        () => { this.close() },
      );
    // }
  }

  render() {
    const closeBTN = this.props.task ? "" : ( <Button bsStyle="primary" bsSize="large" onClick={this.open}> + </Button> )
    return (
      <div>
        {
          <div>
            { closeBTN }
            <Modal show={this.state.showModal} onHide={this.close}>
              <Modal.Header closeButton>
                <Modal.Title>Add Task</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <TaskForm
                task={this.props.task}
                savetask={this.savetask}
                cancel={this.close}
              />
              </Modal.Body>
            </Modal>
         </div>
        }
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const { match } = props;
  if (match && match.params.id) {
    return {
      task: state.tasks.find(item => item.id === match.params.id)
    }
  }

  return { task: null };
}

export default connect(mapStateToProps, { savetask})(TaskFormModalPopup);
