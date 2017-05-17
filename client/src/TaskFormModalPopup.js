import React from 'react';
import { connect } from 'react-redux';
import { savetask} from './actions';
import TaskForm from './TaskForm';

class TaskFormModalPopup extends React.Component {
  state = {
    redirect: false,
    showModal: this.props.task ? true : false
  }

  close = () => {
    console.log("        Click to close modal popup");
    this.setState({ showModal: false });
    $('#myModal').modal('hide')
  }

  open = () => {
    console.log("        Click to open modal popup");
    this.setState({ showModal: true });
  }

  savetask = ({ title, category, startDate , dueDate , taskContent }) => {
    console.log("In savetask modal opopup \n ");
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
    return (
      <div>
        {
          <div>
              <button id="modalBtn" type="button" className="btn btn-info btn-lg modalBtn" onClick={this.open} data-toggle="modal" data-target="#myModal"> + </button>
              <div className="modal fade" id="myModal" role="dialog">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <button type="button" className="close" data-dismiss="modal">&times;</button>
                      <h4 className="modal-title">New Task</h4>
                    </div>
                    <div className="modal-body">
                    <TaskForm task={this.props.task} savetask={this.savetask} cancel={this.close}/>
                    </div>
                    <div className="modal-footer">
                    </div>
                  </div>
                </div>
              </div>
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
