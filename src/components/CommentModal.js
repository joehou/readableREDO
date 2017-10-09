import React,{Component} from 'react'
import Modal from 'react-modal'

class CommentModal extends Component {
  render(){
    console.log(this.props.currentComment.body)
    return (
      <Modal isOpen={this.props.commentsModalOpen}>
        <h2 id="heading">H1</h2>
        <div id="full_description">
          <form className="new-post" onChange={event=>this.props.onUpdateComment({propertyName: event.target.name, value: event.target.value})}>
            <div>
              <label>Body:</label><br />
              <textarea name="body" className="col-9" rows="10"
                value={this.props.currentComment.body}
              />
            </div>
            <div>
              <label>Author:</label><br />
              <input name="author" type="text"
                value={this.props.currentComment.author}
              />
            </div>
            <div>
              <button type="submit" onClick={event=>{
                event.preventDefault()
                this.props.onCreateComment({
                  post: this.props.selectedPost,
                  comment: this.props.currentComment
                })}}>Save</button>
              <button type="reset" onClick={event=>{
                event.preventDefault()
                this.props.resetEditComment()
              }} >Cancel</button>
            </div>
          </form>
        </div>
      </Modal>
    )
  }
}

export default CommentModal