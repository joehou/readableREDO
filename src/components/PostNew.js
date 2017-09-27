import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Switch,Route} from 'react-router-dom'
import {updatePost,createPost,savePost,loadEditPost,resetEditPost} from '../actions'
import PostForm from '../components/PostForm'

class PostNew extends Component{

  componentDidMount(){
    if  (this.props.match.params.post){
      this.props.loadSelectedPost(this.props.match.params.post)
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
                        onUpdatePost={this.props.onUpdatePost}
                        onCreatePost={this.props.onCreatePost }
              />
            </div>
          }

          />
          <Route path="/:post/edit" render ={_=><div>
            <PostForm currentPost={this.props.currentPost}
                      showDetails={false}
                      onUpdatePost={this.props.onUpdatePost}
                      onCreatePost={this.props.onSavePost}
            />
          </div>} />
        </switch>

      </div>
    )
  }
}

function mapStateToProps(state,ownProps){
  const{posts} = state
  console.log(ownProps.match.params.post)
  return{
    currentPost: posts.editPost
  }
}

function mapDispatchToProps(dispatch){
  return{
    loadSelectedPost: (data) => dispatch(loadEditPost(data)),
    onUpdatePost: (data) => dispatch(updatePost(data)),
    onCreatePost: (data) => dispatch(createPost(data)),
    onSavePost: (data) => dispatch(savePost(data)),
    resetEditPost: (data) => dispatch(resetEditPost())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(PostNew)