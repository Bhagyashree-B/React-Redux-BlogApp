import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { authenticate } from './actions';
import LoginForm from './LoginForm';


 class Login extends Component {
  state  = {
    redirect: false,
    response:''
  }

  login = ({ email, password }) => {
      this.props.authenticate({ email, password }).then(data => {
        if(data.hasOwnProperty('success') && data.success === false)
          this.setState({ response : data})
    })
  }

  render() {
    return (
      <div>
        {
          this.state.redirect ?
          <Redirect to="/posts" /> :
          <LoginForm login={this.login} authError={this.state.response}/>
        }
      </div>
    );
  }
}
function mapStateToProps(state, props) {
  return {};
}

export default connect(mapStateToProps, { authenticate })(Login);
