import React, { Component } from 'react';
import './App.css';
import Service from './Service';
import queryString from 'query-string';

class Posts extends Component {
  constructor(props) {
    super(props);
    let user;
    if (window.location.search && window.location.search.length > 0) {
      let q = queryString.parse(window.location.search);
      user = q.user;
    }
    this.state = {
      posts: [],
      user: user
    }
    this.handleView = this.handleView.bind(this);
  }

  async componentDidMount() {
    try {
      const serviced = new Service();
      let newposts = await serviced.getPosts();
      this.setState({
        posts: JSON.parse(newposts)
      })
    } catch (err) {
      console.log(err);
    }
  }
  handleView(e, postId) {
    window.open(`http://localhost:3000/?p=dashboard&post=${postId}&user=${this.state.user}`, "_self");
  }

  render() {
    return (
      <div className="App">
        {this.state.posts.map((post, index) =>
          <div>
            <p>{index}. {post.title}</p>
            <button onClick={e => this.handleView(e, post.Id)}>Comment</button>
          </div>
        )}
      </div>
    );
  }
}

export default Posts;
