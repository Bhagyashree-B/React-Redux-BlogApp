import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link, Redirect, Switch } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { logoutUser } from './actions';

import Login from './Login';
import Home from './Home';
import Dashboard from './Dashboard'
import TasksPage from './TasksPage';
import TaskFormPage from './TaskFormPage';
import TaskFormModalPopup from './TaskFormModalPopup';

function PrivateRoute ({component: Component, isAuthenticated, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => isAuthenticated === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

function PublicRoute ({component: Component, isAuthenticated, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => isAuthenticated === false
        ? <Component {...props} />
        : <Redirect to='/' />}
    />
  )
}

const ActiveLink = ({ label, to, activeOnlyWhenExact }) => (
  <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => (
    <Link className={match ? 'active item' : 'item'} to={to}>{label}</Link>
  )} />
);

class App extends Component {
  state = {
    loading: false,
  }

  render() {
    return <BrowserRouter>
    {
      this.state.loading === true ? <h1>Loading</h1> : (
        <div>
        { this.props.isAuthenticated ?
          <nav className="navbar navbar-default navbar-static-top">
            <div className="container">
              <div className="navbar-header">
                <Link to="/" className="navbar-brand">Discuss.io</Link>
              </div>
              <ul className="nav navbar-nav pull-right">
                <li>
                  <ActiveLink activeOnlyWhenExact to="/dashboard" label="Dashboard" />
                </li>
                <li>
                  <ActiveLink activeOnlyWhenExact to="/tasks" label="Tasks" />
                </li>
                <li>
                  {this.props.isAuthenticated
                    ? <button
                        style={{border: 'none', background: 'transparent'}}
                        onClick={() => {
                          // logout()
                          this.props.logoutUser()
                        }}
                        className="navbar-brand">Logout</button>
                    : <span>
                        <Link to="/login" className="navbar-brand">Login</Link>
                      </span>}
                </li>
              </ul>
            </div>
        </nav> : <h1></h1> }
          <div className="container">
            <div className="row">
              <Switch>
                <Route path='/' exact component={Home} />              
                <PublicRoute isAuthenticated={this.props.isAuthenticated} path='/login' component={Login} />
                <PrivateRoute isAuthenticated={this.props.isAuthenticated} path="/dashboard" component={Dashboard} />
                <PrivateRoute exact isAuthenticated={this.props.isAuthenticated} path="/tasks" component={TasksPage} />
                <PrivateRoute isAuthenticated={this.props.isAuthenticated} path="/tasks/new" component={TaskFormModalPopup} />
                <PrivateRoute isAuthenticated={this.props.isAuthenticated} path="/task/:id" component={TaskFormModalPopup} />
                <Route render={() => <h3>No Match</h3>} />
              </Switch>
            </div>
          </div>
        </div>
      )
    }
    </BrowserRouter>
  }
}

function mapStateToProps(state, props) {
  return { isAuthenticated : state.user.token ? true : false };
}

export default connect(mapStateToProps, { logoutUser })(App);