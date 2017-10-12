import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Switch,Route} from 'react-router-dom'
import * as actions from '../actions'
import PostForm from '../components/PostForm'

class PostNew extends Component{

  componentDidMount(){
    if  (this.props.match.params.post){
      this.props.loadEditPost(this.props.match.params.post)
    }else{
      this.props.resetEditPost()
    }
  }

  render() {
    return !this.props.currentPost ?(
        <div>loading</div>
      )
  :(
      <div className="posts col-9">
        <switch>
          <Route path="/posts/new" render ={_=>
            <div>Creating new
              <PostForm currentPost={this.props.currentPost}
                        showDetails={true}
                        onUpdatePost={this.props.updatePost}
                        onCreatePost={this.props.createPost }
              />
            </div>
          }

          />
          <Route path="/:post/edit" render ={_=><div>
            <PostForm currentPost={this.props.currentPost}
                      showDetails={false}
                      onUpdatePost={this.props.updatePost}
                      onCreatePost={this.props.savePost}
            />
          </div>} />
        </switch>

      </div>
    )
  }
}

function mapStateToProps({posts},ownProps){
  return{
    currentPost: posts.editPost
  }
}


export default connect(mapStateToProps,actions)(PostNew)