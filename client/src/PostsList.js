import React from 'react';
import PostCard from './PostCard';

export default function PostsList({ posts, deletepost }) {
  const emptyMessage = (
    <p>There are no posts yet in your collection.</p>
  );

  const PostsList = (
    <div className="ui four cards">
      { posts.map(post => <PostCard post={post} key={post._id} deletepost={deletepost} />) }
    </div>
  );

  return (
    <div>
      {posts.length === 0 ? emptyMessage : PostsList}
    </div>
  );
}

PostsList.propTypes = {
  posts: React.PropTypes.array.isRequired,
  deletepost: React.PropTypes.func.isRequired
}
