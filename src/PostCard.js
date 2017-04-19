import React from 'react';
import { Link } from 'react-router-dom';

export default function postCard({ post, deletepost }) {
  return (
    <div className="ui card">

      <div className="content">
        <div className="header">{post.title}</div>
      </div>
      <div className="content">
        <div className="header">{post.postContent} </div>
      </div>
      <div className="extra content">
        <div className="ui two buttons">
          <Link to={`/post/${post._id}`} className="ui basic button green">Edit</Link>
          <div className="ui basic button red" onClick={() => deletepost(post._id)}>Delete</div>
        </div>
      </div>
    </div>
  );
}

postCard.propTypes = {
  post: React.PropTypes.object.isRequired,
  deletepost: React.PropTypes.func.isRequired
}
