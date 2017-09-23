import React, {Component} from 'react'
import {connect} from 'react-redux'
import SaveIcon from 'react-icons/lib/fa/floppy-o'
import {updatePost,createPost} from '../actions'

class PostNew extends Component{

  render() {
    const {title,author,category,body}=this.props.currentPost
    return (
      <div className="posts col-9">
        <form className="new-post" onChange={event=>this.props.onUpdatePost({propertyName: event.target.name, value: event.target.value})}>
          <div>
            <label>Title:</label><br />
            <input name="title" type="text" value={title}/>
          </div>
          <div>
            <label>Author:</label><br />
            <input name="author"  type="text" value={author} />
          </div>
          <div>
            <label>Category:</label><br />
            <select name="category" value={category}>
              <option value="react">React</option>
              <option value="redux">Redux</option>
              <option value="udacity">Udacity</option>
            </select>
          </div>
          <div>
            <label>Body:</label><br />
            <textarea name="body" className="col-9" rows="10"
              value={body}
            />
          </div>
          <div>
            <button type="submit" onClick={event=>{event.preventDefault();console.log(this.props.currentPost);this.props.onCreatePost(this.props.currentPost)}}><SaveIcon/>Save</button>
          </div>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state){
  const{posts} = state
  return{
    currentPost: posts.editPost
  }
}

function mapDispatchToProps(dispatch){
  return{
      onUpdatePost: (data) => dispatch(updatePost(data)),
      onCreatePost: (data) => dispatch(createPost(data))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(PostNew)