import React,{Component} from 'react'
import {loadCategories,loadPosts,loadPostsByCategory,selectCategory,sortByColumn,upVotePost,downVotePost,deletePost} from '../actions'
import sortBy from 'sort-by'
import {connect} from 'react-redux'
import {withRouter,Link} from 'react-router-dom'
import UpArrow from 'react-icons/lib/fa/angle-up'
import DownArrow from 'react-icons/lib/fa/angle-down'
import EditIcon from 'react-icons/lib/fa/edit'
import TrashIcon from 'react-icons/lib/fa/trash'
import NewIcon from 'react-icons/lib/fa/plus-square-o'


class PostList extends Component{

  componentDidMount(){
    console.log("PostList mounted")
  }

  render() {
    console.log(this.props.posts)
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
          <div className="post">
            <div className="post-control col-1">
              <h3>SCORE</h3>
              <p className="score">{post.voteScore}</p>
              <p>
                <span onClick={event=> this.props.downVotePost(post)}><DownArrow/></span>
                <span onClick={event=> this.props.upVotePost(post)}><UpArrow/></span>
              </p>
            </div>
            <div className="post-content">
              <div className="post-header">
                <h2>{post.title}</h2>
                <div>
                  <Link to={`/${post.id}/edit`}><EditIcon/></Link>
                  <span to={`/${post.id}/delete`} onClick={event=> this.props.deletePost(post)}><TrashIcon/></span>
                </div>
              </div>
              <p>{post.body}</p>
              <p className="author">Posted by {post.author} at {new Date(post.timestamp).toISOString().slice(0, 10)}</p>
            </div>
          </div>
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
    deletePost: (data)=> dispatch(deletePost(data))
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(PostList))