import React from 'react';
import queryString from 'query-string';
import Service from './Service';

class Reply extends React.Component {
    constructor(props) {
        super(props);
        this.path = window.location.pathname;
        if (window.location.search && window.location.search.length > 0) {
            let q = queryString.parse(window.location.search);
        }
        this.state = {
            data: this.props.content.commentData,
            comments: [],
            isAuthor: false,
            cannotEdit: true,
            commentId: this.props.content.commentId,
            canSubmit: false
        }
        this.handleCommentChange = this.handleCommentChange.bind(this);
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
        this.addComment = this.addComment.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }
    async componentDidMount() {
        try {
            let serviced = new Service();
            if (!this.props.content.commentId) {
                this.setState({
                    cannotEdit: false
                })
                return;
            }
            let data = await serviced.getCommentData(this.state.commentId);
            this.setState({
                comments: data
            })
            if (this.props.content.user == this.props.user) {
                this.setState({
                    isAuthor: true
                })
            }
        } catch (err) {
            console.log(err);
        }
    }
    handleCommentChange(e) {
        this.setState({ data: e.target.value })
    }
    async handleCommentSubmit() {
        try {
            const serviced = new Service();
            if (this.state.commentId) {
                let data = {
                    data: this.state.data
                }
                await serviced.editComment(data, this.state.commentId);
                this.setState({
                    cannotEdit: true,
                })
                alert('Comment Edited');
                return;
            }
            let datas = {
                parentObject: this.props.parentcommentId,
                content: this.state.data,
                user: this.props.user
            }
            let response = await serviced.postComment(datas, this.props.postId);
            this.setState({
                commentId: response,
                cannotEdit: true,
                isAuthor: true,
            })
            alert('Comment Saved');
        } catch (err) {
            console.log(err);
        }
    }

    addComment() {
        this.setState({ comments: [...this.state.comments, <Reply parentcommentId={this.state.commentId}></Reply>] })
        alert('Hey');
    }
    handleEdit() {
        this.setState({
            cannotEdit: false
        })
    }
    render() {
        return (
            <div>
                <textarea className='text' value={this.state.data} onChange={this.handleCommentChange} disabled={this.state.cannotEdit}></textarea><br />
                <button className='btn' disabled={!this.state.data} onClick={this.handleCommentSubmit}>Submit</button>
                <button className='btn' disabled={!this.state.isAuthor} onClick={this.handleEdit}>Edit</button>
                <button className='btn' disabled={!this.state.data } onClick={this.addComment}>Reply</button>
                <div style={{ marginLeft: '50px' }}>
                    {this.state.comments.map((comment) => <Reply user={this.props.user} parentcommentId={this.state.commentId} content={comment}></Reply>)}
                </div>
            </div>
        );
    }
}

export default Reply