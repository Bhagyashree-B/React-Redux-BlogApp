import React from 'react';
import PostsList from './PostsList';
import { connect } from 'react-redux';
import { fetchposts, deletepost } from './actions';

class postsPage extends React.Component {
  componentDidMount() {
    this.props.fetchposts();
  }

  render() {
    return (
      <div>
        <h1>posts List</h1>

        <PostsList posts={this.props.posts} deletepost={this.props.deletepost} />
      </div>
    );
  }
}

postsPage.propTypes = {
  posts: React.PropTypes.array.isRequired,
  fetchposts: React.PropTypes.func.isRequired,
  deletepost: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    posts: state.posts
  }
}

export default connect(mapStateToProps, { fetchposts, deletepost })(postsPage);
