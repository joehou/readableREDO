import React,{Component} from 'react'
import * as actions from '../actions'
import sortBy from 'sort-by'
import {connect} from 'react-redux'
import {withRouter,Link} from 'react-router-dom'
import NewIcon from 'react-icons/lib/fa/plus-square-o'
import PostItem from '../components/PostItem'

class PostList extends Component{

  componentDidMount(){
    this.props.loadPosts()
  }

  render() {
    return(
      <div className="posts col-9">
        <div className="posts-header row">
          <h2>Posts
            <Link to='/posts/new'><NewIcon/></Link>
          </h2>
          <select className="" onChange={event => this.props.sortByColumn(event.target.value)}>
            <option value="voteScore">Vote Score</option>
            <option value="timestamp">Time</option>
            <option value="Author">Author</option>
          </select>
        </div>
        {this.props.posts.map(post=>
          <PostItem key={post.id} post={post}
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

function mapStateToProps({posts},ownProps) {
  return {
    posts: posts.posts.filter(post=>!ownProps.match.params.category || post.category===ownProps.match.params.category).sort(sortBy("-"+posts.sortColumn))
  }
}



export default withRouter(connect(mapStateToProps,actions)(PostList))