import React from 'react';
import classnames from 'classnames';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class taskForm extends React.Component {
  state = {
    _id: this.props.task ? this.props.task._id : null,
    title: this.props.task ? this.props.task.title : '',
    // startDate : this.props.task ? this.props.task.startDate : '',
    // dueDate :this.props.task ? this.props.task.dueDate : '',
    startDate: moment(),
    dueDate : moment(),
    taskContent: this.props.task ? this.props.task.taskContent : '',
    errors: {},
    loading: false
  }

  // componentWillReceiveProps = (nextProps) => {
  //   this.setState({
  //     _id: nextProps.task._id,
  //     title: nextProps.task.title,
  //     taskContent: nextProps.task.taskContent
  //   });
  // }

  handleChange = (e) => {
    if (!!this.state.errors[e.target.name]) {
      let errors = Object.assign({}, this.state.errors);
      delete errors[e.target.name];
      this.setState({
        [e.target.name]: e.target.value,
        errors
      });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  }

  handlestartDateChange = (date) => {
   this.setState({
     startDate: date
   });
 }

 handledueDateChange = (date) => {
  this.setState({
    dueDate: date
  });
}

  handleSubmit = (e) => {
    e.preventDefault();

    // validation
    let errors = {};
    if (this.state.title === '') errors.title = "Can't be empty";
    if (this.state.taskContent === '') errors.taskContent = "Can't be empty";
    if (this.state.startDate == null) errors.startDate = "Can't be empty";
    if (this.state.dueDate == null) errors.dueDate = "Can't be empty";
    this.setState({ errors });
    const isValid = Object.keys(errors).length === 0

    if (isValid) {
      const { _id, title, startDate , dueDate , taskContent } = this.state;
      this.setState({ loading: true });
      this.props.savetask({ _id, title, startDate , dueDate , taskContent  })
        .catch((err) => err.response.json().then(({errors}) => this.setState({ errors, loading: false })));
    }
  }

  render() {
    const form = (
      <form className={classnames('ui', 'form', { loading: this.state.loading })} onSubmit={this.handleSubmit}>

        {!!this.state.errors.global && <div className="ui negative message"><p>{this.state.errors.global}</p></div>}

        <div className={classnames('field', { error: !!this.state.errors.title})}>
          <label htmlFor="title">Title</label>
          <input
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
            id="title"
          />
          <span>{this.state.errors.title}</span>
        </div>

        <div className="col-md-6">
          <div className={classnames('field', { error: !!this.state.errors.startDate})}>
            <label htmlFor="startDate">Start Date</label>
                    <DatePicker selected={this.state.startDate} onChange={this.handlestartDateChange}  />;
            <span>{this.state.errors.startDate}</span>
          </div>
       </div>
       <div className="col-md-6">
          <div className={classnames('field', { error: !!this.state.errors.dueDate})}>
            <label htmlFor="dueDate">Due Date</label>
                    <DatePicker selected={this.state.dueDate} onChange={this.handledueDateChange}  />;
            <span>{this.state.errors.dueDate}</span>
          </div>
        </div>

        <div className={classnames('field', { error: !!this.state.errors.taskContent})}>
          <label htmlFor="taskContent">Description</label>
          <input
            name="taskContent"
            value={this.state.taskContent}
            onChange={this.handleChange}
            id="taskContent"
          />
          <span>{this.state.errors.taskContent}</span>
        </div>
        
        <div className="field">
          <button className="ui primary button">Save</button>
        </div>
      </form>
    );
    return (
      <div>
        { form }
      </div>
    );
  }
}

// taskForm.defaultProps = {
//   _id : null,
//   title : '',
//   taskContent : ''
// };
export default taskForm;
