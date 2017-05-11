import React from 'react';
import classnames from 'classnames';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

export default class taskForm extends React.Component {

state = {
    _id: this.props.task ? this.props.task._id : null,
    title: this.props.task ? this.props.task.title : '',
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

//   handleChange = (e) => {
//     console.log("B4  ",this.state)
//     if (!!this.state.errors[e.target.name]) {
//       let errors = Object.assign({}, this.state.errors);
//       delete errors[e.target.name];
//       this.setState({
//         [e.target.name]: e.target.value,
//         errors
//       });
//         console.log("handleChange" ,  e.target.value  )
//     } else {
//       this.setState({ [e.target.name]: e.target.value });
//         console.log("handleChange else" ,  e.target.value )
//     }
// console.log("After ", this.state)
//   }

  updateTitleState = (e) => {
      this.setState({title: e.target.value});
      console.log("        Update title => " + e.target.value )
   }

  updatePasswordState = (e) => {
      this.setState({taskContent: e.target.value});
      console.log("        Update taskContent => " + e.target.value )
   }

  handlestartDateChange = (date) => {
    //  console.log(date)
    this.setState({
      startDate: date
    });
 }

 handledueDateChange = (date) => {
    this.setState({
      dueDate: date
    });
}

  handleSubmit() {
    // e.preventDefault();
    console.log("        Updated states for adding task  => " , this.state.title +"  "+ this.state.taskContent)
    // validation
    let errors = {};
    if (this.state.title === '') errors.title = "Can't be empty";
    if (this.state.taskContent === '') errors.taskContent = "Can't be empty";
    if (this.state.startDate == null) errors.startDate = null;
    if (this.state.dueDate == null) errors.dueDate = null;
    this.setState({ errors });

    const isValid = Object.keys(errors).length === 0
    // console.log("isValid = " + errors.title  +"  "+  isValid);
    if (isValid) {
    //  console.log("Goes to handleSubmit");
      const { _id, title, taskContent } = this.state;
      try {
          this.props.savetask({ _id, title, taskContent  })
          this.setState({ loading: true });
      }catch(err){
          // err.response.json().then(({errors}) => this.setState({ errors, loading: false }))
          this.setState({ loading: false })
      }
    }
  }

  render() {
    return (
      <div>
        {
          <form className={classnames('ui', 'form', { loading: this.state.loading })} >
            {!!this.state.errors.global && <div className="ui negative message"><p>{this.state.errors.global}</p></div>}
            <div className={classnames('field', { error: !!this.state.errors.title})}>
              <label htmlFor="title">Title</label>
              <input
                name="title"
                value={this.state.title}
                onChange={this.updateTitleState}
                id="title"
                className="title"
              />
              <span>{this.state.errors.title}</span>
            </div>

            <div className="col-md-6">
              <div className={classnames('field', { error: !!this.state.errors.startDate})}>
                <label htmlFor="startDate">Start Date</label>
                        <DatePicker dateFormat="YYYY/MM/DD" selected={this.state.startDate} onChange={this.handlestartDateChange}  />;
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
                onChange={this.updatePasswordState}
                id="taskContent"
                className="taskContent"
              />
              <span>{this.state.errors.taskContent}</span>
            </div>

            <div className="field">
              <button  type="button" onClick={this.handleSubmit.bind(this) } className="ui primary button saveTaskBtn" >Save</button>
            </div>
          </form>}
      </div>
    );
  }
}

// taskForm.defaultProps = {
//   _id : null,
//   title : '',
//   taskContent : ''
// };
