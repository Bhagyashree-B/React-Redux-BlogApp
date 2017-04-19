import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import PostsPage from './PostsPage';
import PostFormPage from './PostFormPage';
import './App.css';

const ActiveLink = ({ label, to, activeOnlyWhenExact }) => (
  <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => (
    <Link className={match ? 'active item' : 'item'} to={to}>{label}</Link>
  )} />
);

class App extends Component {
  render() {
    return (
      <div className="ui container">
        <div className="ui three item menu">
          <ActiveLink activeOnlyWhenExact to="/" label="Home" />
          <ActiveLink activeOnlyWhenExact to="/posts" label="posts" />
          <ActiveLink activeOnlyWhenExact to="/posts/new" label="Add New post" />
        </div>

        <Route exact path="/posts" component={PostsPage} />
        <Route path="/posts/new" component={PostFormPage} />
        <Route path="/post/:_id" component={PostFormPage} />
      </div>
    );
  }
}

export default App;
