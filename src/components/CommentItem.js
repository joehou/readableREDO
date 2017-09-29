import React,{Component} from 'react'
import UpArrow from 'react-icons/lib/fa/angle-up'
import DownArrow from 'react-icons/lib/fa/angle-down'
import EditIcon from 'react-icons/lib/fa/edit'
import TrashIcon from 'react-icons/lib/fa/trash'
import {Link} from 'react-router-dom'


class CommentItem extends Component{
  render() {
    let {comment} = this.props
    let {onDownVoteComment,onUpVoteComment,onDeleteComment} =this.props
    return (
      <div className="comment">
        <div className="post-control col-1">
          <h4>SCORE</h4>
          <p className="score">{comment.voteScore}</p>
          <p>
            <span><DownArrow onClick={event=> onDownVoteComment(comment)}/></span>
            <span><UpArrow onClick={event=> onUpVoteComment(comment)}/></span>
          </p>
        </div>

        <p>{comment.body}</p>
        <div>
          <span><EditIcon/></span>
          <span><TrashIcon/></span>
        </div>

        <span className="author">Posted by {comment.author} at {new Date(comment.timestamp).toISOString().slice(0, 10)}</span>
      </div>
    )
  }
}

export default CommentItem