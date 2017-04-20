import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { savepost, fetchpost, updatepost } from './actions';
import PostForm from './PostForm';

class PostFormPage extends React.Component {

  state = {
    redirect: false
  }

  componentDidMount = () => {
    const { match } = this.props;
    if (match.params._id) {
      this.props.fetchpost(match.params._id);
    }
  }

  savepost = ({_id, title, postContent }) => {
    if (_id) {
      return this.props.updatepost({ _id, title, postContent }).then(
        () => { this.setState({ redirect: true })},
      );
    } else {
      return this.props.savepost({ title, postContent }).then(
        () => { this.setState({ redirect: true })},
      );
    }
  }

  render() {
    return (
      <div>
        {
          this.state.redirect ?
          <Redirect to="/posts" /> :
          <PostForm
            post={this.props.post}
            savepost={this.savepost}
          />
        }
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const { match } = props;
  if (match.params._id) {
    return {
      post: state.posts.find(item => item._id === match.params._id)
    }
  }

  return { post: null };
}

export default connect(mapStateToProps, { savepost, fetchpost, updatepost })(PostFormPage);
