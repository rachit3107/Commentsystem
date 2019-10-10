import React from 'react';
import queryString from 'query-string';
import CommentsSection from './CommentsSection'
import Service from './Service';

function AddComments(commentArray, comment) {
    commentArray.push(comment);
    return commentArray;
}

class PostSection extends React.Component {
    constructor(props) {
        super(props);
        this.path = window.location.pathname;
        let post;
        let user;
        if (window.location.search && window.location.search.length > 0) {
            let q = queryString.parse(window.location.search);
            post = q.post;
            user = q.user;
        }
        this.state = {
            data: '',
            postId: post,
            comments: [],
            author: {},
            user: user
        }
        this.addComment = this.addComment.bind(this);

    }
    async componentDidMount(){
        try{
          const serviced = new Service();
          let response = await serviced.getPostsData(this.state.postId);
          this.setState({
              data: response.data,
              comments: response.comments
          });
        }catch(err){
          console.log(err);
        }
    }
    addComment() {
        this.setState({ comments: AddComments(this.state.comments, <CommentsSection></CommentsSection>) })
    }
    render() {
        return (
            <div>
                <Post data={this.state.data}></Post>
                {this.state.comments.map((comment) => <CommentsSection user={this.state.user} postId={this.state.postId} content={comment}></CommentsSection>)}
                <button className='nm' onClick={this.addComment}>Comment</button>
            </div>
        );
    }
}

function Post(props) {
    return (
        <p>{props.data}</p>
    );
}

export default PostSection