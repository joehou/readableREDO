import React, {Component} from 'react'
import SaveIcon from 'react-icons/lib/fa/floppy-o'

class PostNew extends Component{
  render() {
    return (
      <div className="posts col-9">
        <form className="new-post">
          <div>
            <label>Title:</label><br />
            <input type="text" />
          </div>
          <div>
            <label>Author:</label><br />
            <input type="text" />
          </div>
          <div>
            <label>Category:</label><br />
            <select>
              <option>React</option>
              <option>Redux</option>
              <udacity>Udacity</udacity>
            </select>
          </div>
          <div>
            <label>Body:</label><br />
            <textarea className="col-9" rows="10"/>
          </div>
          <div>
            <button type="submit"><SaveIcon/>Save</button>
          </div>
        </form>
      </div>
    )
  }
}

export default PostNew