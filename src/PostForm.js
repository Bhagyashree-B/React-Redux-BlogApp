import React from 'react';
import classnames from 'classnames';

class postForm extends React.Component {
  state = {
    _id: this.props.post ? this.props.post._id : null,
    title: this.props.post ? this.props.post.title : '',
    postContent: this.props.post ? this.props.post.postContent : '',
    errors: {},
    loading: false
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      _id: nextProps.post._id,
      title: nextProps.post.title,
      postContent: nextProps.post.postContent
    });
  }

  handleChange = (e) => {
    if (!!this.state.errors[e.target.name]) {
      let errors = Object.assign({}, this.state.errors);
      delete errors[e.target.name];
      this.setState({
        [e.target.name]: e.target.value,
        errors
      });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    // validation
    let errors = {};
    if (this.state.title === '') errors.title = "Can't be empty";
    if (this.state.postContent === '') errors.postContent = "Can't be empty";
    this.setState({ errors });
    const isValid = Object.keys(errors).length === 0

    if (isValid) {
      const { _id, title, postContent } = this.state;
      this.setState({ loading: true });
      this.props.savepost({ _id, title, postContent })
        .catch((err) => err.response.json().then(({errors}) => this.setState({ errors, loading: false })));
    }
  }

  render() {
    const form = (
      <form className={classnames('ui', 'form', { loading: this.state.loading })} onSubmit={this.handleSubmit}>
        <h1>Add new post</h1>

        {!!this.state.errors.global && <div className="ui negative message"><p>{this.state.errors.global}</p></div>}

        <div className={classnames('field', { error: !!this.state.errors.title})}>
          <label htmlFor="title">Title</label>
          <input
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
            id="title"
          />
          <span>{this.state.errors.title}</span>
        </div>

        <div className={classnames('field', { error: !!this.state.errors.postContent})}>
          <label htmlFor="postContent">Content</label>
          <input
            name="postContent"
            value={this.state.postContent}
            onChange={this.handleChange}
            id="postContent"
          />
          <span>{this.state.errors.postContent}</span>
        </div>

      
        <div className="field">
          <button className="ui primary button">Save</button>
        </div>
      </form>
    );
    return (
      <div>
        { form }
      </div>
    );
  }
}


export default postForm;
