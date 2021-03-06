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
    this.setState({ showModal: false });
    if(process.env.NODE_ENV !== "test")
      $('#myModal').modal('hide')
  }

  open = () => {
    this.setState({ showModal: true });
  }

  /**
    Calls the savetask action with all data coming from its child component's method
  **/
  savetask = ({ title, status, category, startDate , dueDate , taskContent }) => {
      return this.props.savetask({ title, status, category, startDate , dueDate , taskContent }).then(
        () => { this.close() },
      );
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
