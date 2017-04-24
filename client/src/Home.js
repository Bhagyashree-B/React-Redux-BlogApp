import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Home extends Component {
  render() {
    // return <div>home</div>
    return (
          this.props.isAuthenticated ?
          <Redirect to="/dashboard" /> :
          <Redirect to="/login" />
    );
  }
}

function mapStateToProps(state, props) {
  return { isAuthenticated : state.user.isAuthenticated ? true : false };
}

export default connect(mapStateToProps)(Home);