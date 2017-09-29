import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Route,Switch,Link,withRouter} from 'react-router-dom'
import {loadPost,loadComments,upVotePost,downVotePost,deletePost,upVoteComment,downVoteComment,deleteComment} from '../actions'
import PostItem from './PostItem'
import CommentsList from './CommentsList'
import sortBy from 'sort-by'


class PostView extends Component {

  componentDidMount() {
    console.log("this is from mount")
    this.props.loadPost(this.props.match.params.post)
    this.props.loadComments(this.props.match.params.post)
  }

  render() {
    return !this.props.post ?(
        <div>loading</div>
      )
      :(
        <div className="col-9 selected-post">
          <PostItem post={this.props.post}
                    onDownVotePost={this.props.downVotePost}
                    onUpVotePost={this.props.upVotePost}
                    onSelectPost={this.props.selectPost}
                    onDeletePost={this.props.deletePost}
          />
          <CommentsList comments={this.props.comments}
                        onDownVoteComment={this.props.downVoteComment}
                        onUpVoteComment={this.props.upVoteComment}
                        onDeleteComment={this.props.deleteComment}
          />
        </div>
      )
  }
}

function mapStateToProps(state,ownProps) {
  const { posts,comments } = state
  return {
    post: posts.posts.filter(post=> post.id===posts.selectedPost)[0],
    selectedPost: posts.selectedPost,
    comments: comments.comments.sort(sortBy("-"+posts.sortColumn))
  }
}

function mapDispatchToProps(dispatch,ownProps){
  return{
    loadPost: (data)=> dispatch(loadPost(data)),
    upVotePost: (data)=> dispatch(upVotePost(data)),
    downVotePost: (data)=> dispatch(downVotePost(data)),
    deletePost: (data)=> dispatch(deletePost(data)),
    loadComments: (data)=> dispatch(loadComments(data)),
    upVoteComment: (data)=> dispatch(upVoteComment(data)),
    downVoteComment: (data)=> dispatch(downVoteComment(data)),
    deleteComment: (data)=> dispatch(deleteComment(data))
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(PostView))