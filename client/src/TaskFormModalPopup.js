import React from 'react';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';
import { savetask} from './actions';
import TaskForm from './TaskForm';
// import {Modal , Button} from 'react-bootstrap';

class TaskFormModalPopup extends React.Component {
  state = {
    redirect: false,
    showModal: false
  }

  close = () => {
    console.log("        Click to close modal popup");
    this.setState({ showModal: false });
  }

  open = () => {
    console.log("        Click to open modal popup");
    this.setState({ showModal: true });
  }
  
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
      // console.log('In CONTAINERS save task')
     this.props.savetask({ title, taskContent }).then( data => {
          console.log(`        Perform action on save task ${JSON.stringify(data.type)}`)
          this.close()
      });
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
                        <h4 className="modal-title">Modal Header</h4>
                      </div>
                      <div className="modal-body">
                      <TaskForm task={this.props.task} savetask={this.savetask}/>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
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
