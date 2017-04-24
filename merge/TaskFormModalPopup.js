import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { savetask, fetchtask, updatetask } from './actions';
import TaskForm from './TaskForm';
import {Modal , Button} from 'react-bootstrap';

class TaskFormModalPopup extends React.Component {

  state = {
    redirect: false,
    showModal: false
  }

  close = () => {
    this.setState({ showModal: false });
  }

  open = () => {
    this.setState({ showModal: true });
  }
  //
  // componentDidMount = () => {
  //   const { match } = this.props;
  //   if (match.params._id) {
  //     this.props.fetchtask(match.params._id);
  //   }
  // }

  savetask = ({_id, title, taskContent }) => {
    // if (_id) {
    //   return this.props.updatetask({ _id, title, taskContent }).then(
    //     () => { this.setState({ redirect: true })},
    //   );
    // } else {
      return this.props.savetask({ title, taskContent }).then(
        () => { this.close() },
      );
    // }
  }

  render() {
    return (
      <div>
        {

          <div>
            <Button bsStyle="primary" bsSize="large" onClick={this.open}> + </Button>
            <Modal show={this.state.showModal} onHide={this.close}>
              <Modal.Header closeButton>
                <Modal.Title>Add Task</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <TaskForm
                task={this.props.task}
                savetask={this.savetask}
              />
              </Modal.Body>

            </Modal>
         </div>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  // const { match } = props;
  // if (match.params._id) {
  //   return {
  //     task: state.tasks.find(item => item._id === match.params._id)
  //   }
  // }

  return { task: null };
}

export default connect(mapStateToProps, { savetask})(TaskFormModalPopup);
