import React, {Component} from 'react'
import {connect} from 'react-redux'
import SaveIcon from 'react-icons/lib/fa/floppy-o'
import {updatePost} from '../actions'

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
            <input name="author"  type="text" />
          </div>
          <div>
            <label>Category:</label><br />
            <select name="category">
              <option>React</option>
              <option>Redux</option>
              <option>Udacity</option>
            </select>
          </div>
          <div>
            <label>Body:</label><br />
            <textarea name="body" className="col-9" rows="10"/>
          </div>
          <div>
            <button type="submit"><SaveIcon/>Save</button>
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
      onUpdatePost: (data) => dispatch(updatePost(data))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(PostNew)