import React,{Component} from 'react'
import CommentItem from './CommentItem.js'
import NewIcon from 'react-icons/lib/fa/plus-square-o'



class CommentsList extends Component{
  render() {
    return !this.props.comments ?(
        <div>loading</div>
      ):(
      <div className="comments">
        <h2>Comments:({this.props.comments.length})
          <span>
            <NewIcon onClick={this.props.onOpenCreateCommentModal}/>
          </span>
        </h2>
        {this.props.comments.map(comment=>
          <CommentItem comment={comment}
                       key={comment.id}
                       onDownVoteComment={this.props.onDownVoteComment}
                       onUpVoteComment={this.props.onUpVoteComment}
                       onDeleteComment={this.props.onDeleteComment}
                       onOpenEditCommentModal={this.props.onOpenEditCommentModal}
          />
        )}
      </div>
    )
  }
}

export default CommentsList