import React,{Componenet} from 'react'
import UpArrow from 'react-icons/lib/fa/angle-up'
import DownArrow from 'react-icons/lib/fa/angle-down'
import EditIcon from 'react-icons/lib/fa/edit'
import TrashIcon from 'react-icons/lib/fa/trash'
import {Link} from 'react-router-dom'

function PostItem(props){
  let {post} = props
  let {onDownVotePost,onUpVotePost,onSelectPost,onDeletePost} =props
  return(
    <div className="post">
      <div className="post-control col-1">
        <h3>SCORE</h3>
        <p className="score">{post.voteScore}</p>
        <p>
          <span onClick={event=> onDownVotePost(post)}><DownArrow/></span>
          <span onClick={event=> onUpVotePost(post) }><UpArrow/></span>
        </p>
      </div>
      <div className="post-content">
        <div className="post-header">
          <h2><Link to={`/${post.category}/${post.id}`} onClick={_=>onSelectPost(post)}>{post.title}</Link></h2>
          <div>
            <Link to={`/${post.id}/edit`}><EditIcon/></Link>
            <span to={`/${post.id}/delete`} onClick={event=> onDeletePost(post)}><TrashIcon/></span>
          </div>
        </div>
        <p>{post.body}</p>
        <span className="author">Posted by {post.author} at {new Date(post.timestamp).toISOString().slice(0, 10)}</span>
      </div>
    </div>
  )
}

export default PostItem