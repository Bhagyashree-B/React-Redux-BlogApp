import React from 'react';
import classnames from 'classnames';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import './css/TaskCard.css';

const categoryList = {
  arts_entertainment : "Arts & Entertainment",
  beauty_fitness : "Beauty & Fitness",
  books_literature : "Books & Literature",
  food_drink : "Food & Drink"
}

class taskForm extends React.Component {
  state = {
    id: this.props.task ? this.props.task.id : null,
    title: this.props.task ? this.props.task.title : '',
    category : this.props.task ? this.props.task.category : Object.keys(categoryList)[0],
    startDate: moment(),
    dueDate : moment(),
    taskContent: this.props.task ? this.props.task.taskContent : '',
    errors: {},
    loading: false
  }

  // handleChange = (e) => {
  //   if (!!this.state.errors[e.target.name]) {
  //     let errors = Object.assign({}, this.state.errors);
  //     delete errors[e.target.name];
  //     this.setState({
  //       [e.target.name]: e.target.value,
  //       errors
  //     });
  //   } else {
  //     this.setState({ [e.target.name]: e.target.value });
  //   }
  // }
  updateTitleState = (e) => {
      this.setState({title: e.target.value});
      console.log("        Update title => " + e.target.value )
   }

  updateDescriptionState = (e) => {
      this.setState({taskContent: e.target.value});
      console.log("        Update taskContent => " + e.target.value )
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

  handleSelectChange = (e) => { 
    this.setState({
      category : e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    // validation
    let errors = {};
    if (this.state.title === '') errors.title = "Can't be empty";
    if (this.state.taskContent === '') errors.taskContent = "Can't be empty";
    if (this.state.category == null) errors.category = "Can't be empty";
    if (this.state.startDate == null) errors.startDate = "Can't be empty";
    if (this.state.dueDate == null) errors.dueDate = "Can't be empty";
    this.setState({ errors });
    const isValid = Object.keys(errors).length === 0

    if (isValid) {
      const { title, category , startDate , dueDate , taskContent } = this.state;
    
        this.setState({ loading: true });
        this.props.savetask({ title, category, startDate , dueDate , taskContent  })
          .catch((err) => err.response.json().then(({errors}) => this.setState({ errors, loading: false })));
    
    }
  }

  handleCancel = () => {
    this.props.cancel()
  }

  render() {
    let options = [];
    for( var i in categoryList )
      options.push(<option value={i}>{categoryList[i]}</option>)
    const form = (
      <form className={classnames('ui', 'form', { loading: this.state.loading })} onSubmit={this.handleSubmit}>

        {!!this.state.errors.global && <div className="ui negative message"><p>{this.state.errors.global}</p></div>}

        <div className={classnames('field', { error: !!this.state.errors.title})}>
          <label htmlFor="title">Title</label>
          <input
            name="title"
            value={this.state.title}
            onChange={this.updateTitleState}
            id="title"
          />
          <span>{this.state.errors.title}</span>
        </div>
        <div className={classnames('field', { error: !!this.state.errors.category})}>
          <label htmlFor="category">category</label>
            <select name="category" className="form-control" onChange={this.handleSelectChange}>
              {options}
            </select>
      </div>
      <div className="row">
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
        </div>
        <div className={classnames('field', { error: !!this.state.errors.taskContent})}>
          <label htmlFor="taskContent">Description</label>
          <input
            name="taskContent"
            value={this.state.taskContent}
            onChange={this.updateDescriptionState}
            id="taskContent"
          />
          <span>{this.state.errors.taskContent}</span>
        </div>

        <div className="field text-center">
          <button onClick={this.handleCancel} className="ui button">Cancel</button>
          <button type="submit" className="ui primary button">Save</button>
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

export default taskForm;
