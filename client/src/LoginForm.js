import React, { Component } from 'react'

export default class LoginForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        email: "",
        password :"",
        authError: props.authError ? props.authError : {message : ""}
      }
      this.updateEmailState = this.updateEmailState.bind(this);
      this.updatePasswordState = this.updatePasswordState.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this)
   }

  componentWillReceiveProps ({authError}) {
    if(authError)
      this.setState({authError: authError})
  }

  /**
    handleSubmit a callback with login method which passes parameters to the container component
  **/
  handleSubmit() {
    try{
        const { email, password } = this.state;
        this.props.login({ email, password })
    }catch(ex){ }
  }

  resetPassword = () => {
    // resetPassword(this.email.value)
    //   .then(() => this.setState(setErrorMsg(`Password reset email sent to ${this.email.value}.`)))
    //   .catch((error) => this.setState(setErrorMsg(`Email address not found.`)))
  }

  updateEmailState(e) {
      this.setState({email: e.target.value});
   }

  updatePasswordState(e) {
      this.setState({password: e.target.value});
   }

  render () {
    return (
      <div className="col-sm-6 col-sm-offset-3">
        <h1> Login </h1>
        <form >
          <div className="form-group">
            <label>Email</label>
            <input name="email" ref="email" className="form-control email"value={this.state.email}
               onChange={this.updateEmailState}  placeholder="Email"/>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control password"
             value={this.state.password}
               onChange={this.updatePasswordState}
             placeholder="Password" />
          </div>
          {
            this.state.authError.message ?
            <div className="alert alert-danger" role="alert">
              <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
              <span className="sr-only">Error:</span>
              &nbsp;<span className="error-message">{this.state.authError.message}</span>
            </div> : ''
          }
        </form>
        <button type="button" onClick={this.handleSubmit.bind(this)} className="btn btn-primary loginbtn">Login</button>
      </div>
    )
  }
}
