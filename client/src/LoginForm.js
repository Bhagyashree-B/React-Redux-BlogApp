import React, { Component } from 'react'
// import { login, resetPassword } from '../helpers/auth'

function setErrorMsg(error) {
  return {
    loginMessage: error
  }
}

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
   }
 
  handleSubmit = (e) => {
    e.preventDefault()
    const { email, password } = this.state;
    this.props.login({ email, password })
        // .catch((err) => err.response.json().then(({errors}) => this.setState({ errors, loading: false })));
    // login(this.email.value, this.pw.value)
    //   .catch((error) => {
    //       this.setState(setErrorMsg('Invalid username/password.'))
    //     });
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
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input className="form-control"value={this.state.email} 
               onChange={this.updateEmailState}  placeholder="Email"/>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control"
             value={this.state.password} 
               onChange={this.updatePasswordState} 
             placeholder="Password" />
          </div>
          {
            this.state.loginMessage &&
            <div className="alert alert-danger" role="alert">
              <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
              <span className="sr-only">Error:</span>
              &nbsp;{this.state.loginMessage} <a href="#" onClick={this.resetPassword} className="alert-link">Forgot Password?</a>
            </div>
          }
          <button type="submit" className="btn btn-primary loginbtn">Login</button>
        </form>
      </div>
    )
  }
}

LoginForm.propTypes = {
  email: React.PropTypes.string.isRequired ,
  password: React.PropTypes.string.isRequired 
};

LoginForm.defaultProps = {
  email: "",
  password :"" 
}
