import React, { Component } from 'react'

// function setErrorMsg(error) {
//   return {
//     loginMessage: error
//   }
// }

export default class LoginForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        email: "",
        password :"",
        loginMessage: null
      }
      this.updateEmailState = this.updateEmailState.bind(this);
      this.updatePasswordState = this.updatePasswordState.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this)
   }

  handleSubmit() {
    //e.preventDefault()
    try{
        const { email, password } = this.state;
        console.log("        Updated state for username and password in handleSubmit => " + this.state.email + "  " + this.state.password )
        this.props.login({ email, password })
    }catch(ex){
        console.log(ex)
    }
  }

  resetPassword = () => {
    // resetPassword(this.email.value)
    //   .then(() => this.setState(setErrorMsg(`Password reset email sent to ${this.email.value}.`)))
    //   .catch((error) => this.setState(setErrorMsg(`Email address not found.`)))
  }

  updateEmailState(e) {
    // console.log(e.target.name)
      this.setState({email: e.target.value});
      console.log("        Update state for username => " + e.target.value )
   }

  updatePasswordState(e) {
      this.setState({password: e.target.value});
      console.log("        Update state for password => " + e.target.value )
   }

  render () {
    return (
      <div className="col-sm-6 col-sm-offset-3">
        <h1> Login </h1>
        <form >
          <div className="form-group">
            <label>Email</label>
            <input name="email" className="form-control email"value={this.state.email}
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
            this.state.loginMessage &&
            <div className="alert alert-danger" role="alert">
              <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
              <span className="sr-only">Error:</span>
              &nbsp;{this.state.loginMessage}
            </div>
          }
        </form>
        <button type="button" onClick={this.handleSubmit.bind(this)} className="btn btn-primary loginbtn">Login</button>
      </div>
    )
  }
}
