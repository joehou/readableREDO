import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Route,Switch,Link,withRouter} from 'react-router-dom'
import {loadPost,upVotePost,downVotePost,deletePost} from '../actions'
import PostItem from './PostItem'

class PostView extends Component {

  componentDidMount() {
    console.log("this is from mount")
    this.props.loadPost(this.props.match.params.post)

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
        </div>
      )
  }
}

function mapStateToProps(state,ownProps) {
  const { posts } = state
  return {
    post: posts.posts.filter(post=> post.id===posts.selectedPost)[0],
    selectedPost: posts.selectedPost
  }
}

function mapDispatchToProps(dispatch,ownProps){
  return{
    loadPost: (data)=> dispatch(loadPost(data)),
    upVotePost: (data)=> dispatch(upVotePost(data)),
    downVotePost: (data)=> dispatch(downVotePost(data)),
    deletePost: (data)=> dispatch(deletePost(data))
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(PostView))