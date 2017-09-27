import React, {Component} from 'react'
import SaveIcon from 'react-icons/lib/fa/floppy-o'

class PostForm extends Component{

  render() {
    const {title,author,category,body}=this.props.currentPost
    console.log("rendering", this.props.currentPost)
    return(
      <form className="new-post" onChange={event=>this.props.onUpdatePost({propertyName: event.target.name, value: event.target.value})}>
        <div>
          <label>Title:</label><br />
          <input name="title" type="text" value={title}/>
        </div>
        {this.props.showDetails?
          <div>
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
          </div>
        :null}


        <div>
          <label>Body:</label><br />
          <textarea name="body" className="col-9" rows="10"
                    value={body}
          />
        </div>
        <div>
          <button type="submit" onClick={event=>{ event.preventDefault()
            this.props.onCreatePost(this.props.currentPost)}}
          >
            <SaveIcon/>Save
          </button>
        </div>
      </form>
    )
  }
}

export default PostForm