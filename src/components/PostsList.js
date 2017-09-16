import React,{Component} from 'react'
import {loadCategories,loadPosts,loadPostsByCategory,selectCategory,sortByColumn,upVotePost,downVotePost,deletePost,selectPost} from '../actions'
import sortBy from 'sort-by'
import {connect} from 'react-redux'
import {withRouter,Link} from 'react-router-dom'
import NewIcon from 'react-icons/lib/fa/plus-square-o'
import PostItem from '../components/PostItem'

class PostList extends Component{
  render() {
    return(
      <div className="posts col-9">
        <div className="posts-header row">
          <h2>Posts<NewIcon/></h2>
          <select className="" onChange={event => this.props.sortByColumn(event.target.value)}>
            <option value="voteScore">Vote Score</option>
            <option value="timestamp">Time</option>
            <option value="Author">Author</option>
          </select>
        </div>
        {this.props.posts.map(post=>
          <PostItem post={post}
                    onDownVotePost={this.props.downVotePost}
                    onUpVotePost={this.props.upVotePost}
                    onSelectPost={this.props.selectPost}
                    onDeletePost={this.props.deletePost}
          />
        )}
      </div>
    )
  }

}

function mapStateToProps(state,ownProps) {
  const { posts} = state
  return {
    posts: posts.posts.filter(post=>!ownProps.match.params.category || post.category===ownProps.match.params.category).sort(sortBy("-"+posts.sortColumn))
  }
}

function mapDispatchToProps(dispatch){
  return{
    loadPosts: () => dispatch(loadPosts()),
    loadPostsByCategory: (category) => dispatch(loadPostsByCategory(category)),
    sortByColumn: (data)=> dispatch(sortByColumn(data)),
    upVotePost: (data)=> dispatch(upVotePost(data)),
    downVotePost: (data)=> dispatch(downVotePost(data)),
    deletePost: (data)=> dispatch(deletePost(data)),
    selectPost: (data)=>  dispatch(selectPost(data))
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(PostList))