import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Route,Switch,Link,withRouter} from 'react-router-dom'
import * as actions from '../actions'
import PostItem from './PostItem'
import CommentsList from './CommentsList'
import CommentModal from './CommentModal.js'
import sortBy from 'sort-by'
import Modal from 'react-modal'


class PostView extends Component {

  componentDidMount() {
    this.props.loadPost(this.props.match.params.post)
    this.props.loadComments(this.props.match.params.post)
  }

  render() {
    return !this.props.post  ?(
        <div>loading</div>
      )
      :(
         <div className="col-9 selected-post">
           {Object.keys(this.props.post).length ===0 && <h1>404 post deleted</h1>}
           {Object.keys(this.props.post).length !==0 && <div>
             <PostItem post={this.props.post}
              onDownVotePost={this.props.downVotePost}
              onUpVotePost={this.props.upVotePost}
              onSelectPost={this.props.selectPost}
              onDeletePost={this.props.removePost}
            />
            <CommentsList comments={this.props.comments}
              onDownVoteComment={this.props.downVoteComment}
              onUpVoteComment={this.props.upVoteComment}
              onDeleteComment={this.props.removeComment}
              onOpenCreateCommentModal={this.props.openCreateCommentModal}
              onOpenEditCommentModal={this.props.openEditCommentModal}
            />
            <CommentModal
              commentsModalOpen = {this.props.commentsModalOpen}
              onUpdateComment = {this.props.updateComment}
              resetEditComment = {this.props.resetEditComment}
              onCreateComment = {this.props.createComment}
              currentComment = {this.props.currentComment}
              selectedPost={this.props.selectedPost}
            />
           </div>}
        </div>
      )
  }
}

function mapStateToProps({posts,comments}) {
  return {
    post: posts.posts.filter(post=> post.id===posts.selectedPost)[0],
    selectedPost: posts.selectedPost,
    comments: comments.comments.sort(sortBy("-"+posts.sortColumn)),
    commentsModalOpen: comments.commentsModalOpen,
    currentComment: comments.editComment
  }
}

export default withRouter(connect(mapStateToProps,actions)(PostView))