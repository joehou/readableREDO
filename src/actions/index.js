import {fetchComments,fetchCategories,fetchPosts,postVote,deletePost,fetchPost,postEditPost,saveEditPost,commentVote,deleteComment,postEditComment,saveEditComment} from '../utils/api'
import { push } from 'react-router-redux'

export const SELECT_CATEGORY = 'SELECT_CATEGORY'
export const LOAD_CATS_SUCCESS = 'LOAD_CATS_SUCCESS'
export const LOAD_POSTS_SUCCESS= 'LOAD_POSTS_SUCCESS'
export const LOAD_POST_SUCCESS= 'LOAD_POST_SUCCESS'
export const SORT_BY_COLUMN = 'SORT_BY_COLUMN'
export const UP_VOTE = 'UP_VOTE'
export const DOWN_VOTE = 'DOWN_VOTE'
export const UP_VOTE_COMMENT = 'UP_VOTE_COMMENT'
export const DOWN_VOTE_COMMENT = 'DOWN_VOTE_COMMENT'
export const DELETE_POST = 'DELETE_POST'
export const SELECT_POST = 'SELECT_POST'
export const UPDATE_EDIT_POST = 'UPDATE_EDIT_POST'
export const CREATE_EDIT_POST = 'CREATE_EDIT_POST'
export const SAVE_EDIT_POST = 'SAVE_EDIT_POST'
export const LOAD_EDIT_POST_SUCCESS = 'LOAD_EDIT_POST_SUCCESS'
export const RESET_EDIT_POST = 'RESET_EDIT_POST'
export const LOAD_COMMENTS_SUCCESS = 'LOAD_COMMENTS_SUCCESS'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const OPEN_CREATE_COMMENT_MODAL ='OPEN_CREATE_COMMENT_MODAL'
export const OPEN_EDIT_COMMENT_MODAL = 'OPEN_EDIT_COMMENT_MODAL'
export const UPDATE_EDIT_COMMENT = 'UPDATE_EDIT_COMMENT'
export const CREATE_EDIT_COMMENT = "CREATE_EDIT_COMMENT"
export const RESET_EDIT_COMMENT = "RESET_EDIT_COMMENT"
export const SAVE_EDIT_COMMENT = "SAVE_EDIT_COMMENT"

export function selectCategory(category){
    return (dispatch) => {
        dispatch(setCategory(category))

    }
}
export function setCategory(category){
    return {
        type: SELECT_CATEGORY,
        category
    }
}

export function selectPost(post){
  return dispatch => {
    dispatch(setPost(post))
  }
}

export function setPost(post){
  return {
    type: SELECT_POST,
    post
  }
}

export function resetEditPost(){
  return dispatch=>
  dispatch({
    type: RESET_EDIT_POST
  })
}


export function updatePost(update){
  return dispatch=>{
    dispatch( {
        type: UPDATE_EDIT_POST,
        update
      }
    )
  }
}

export function savePost(post){
  return (dispatch) =>{
    return saveEditPost( post )
      .then(post=>{
        dispatch(savePostSuccess(post))}
      )
      .then(_=>{
          dispatch(push('/'))
        }
      )
  }
}

export function savePostSuccess(post){
  return {
    type: SAVE_EDIT_POST,
    post
  }
}

export function createPost(post){
  return (dispatch) =>{
    return postEditPost( post )
      .then(post=>{
        dispatch(CreatePostSuccess(post))}
      )
      .then(_=>{
        dispatch(push('/'))
        }
      )
  }
}

export function CreatePostSuccess(post){
  return {
    type: CREATE_EDIT_POST,
    post
  }
}

export function sortByColumn(columnName){
    return {
        type: SORT_BY_COLUMN,
        columnName
    }
}

export function loadCategories() {
    return (dispatch) => {
        return fetchCategories().then(cats => {
            dispatch(loadCategoriesSuccess(cats))
        }).catch(error=>{
            throw(error)
        })
    }
}

export function loadCategoriesSuccess(categories) {
    return {type: LOAD_CATS_SUCCESS,categories}
}

export function loadPostSuccess(post){
  return {type: LOAD_POST_SUCCESS,post}
}

export function loadPost(post) {
  return (dispatch) => {
    return fetchPost(post).then(post => {
      dispatch(loadPostSuccess(post))
    }).catch(error=>{
      throw(error)
    })
  }
}

export function loadEditPostSuccess(post){
  return {type: LOAD_EDIT_POST_SUCCESS,post}
}

export function loadEditPost(post) {
  return (dispatch) => {
    return fetchPost(post).then(post => {
      dispatch(loadEditPostSuccess(post))
    }).catch(error=>{
      throw(error)
    })
  }
}

export function loadComments(post) {
  return (dispatch) => {
    return fetchComments(post).then(comments=>{
      dispatch(loadCommentsSuccess(comments))
    }).catch( error =>{
      throw(error)
    })
  }
}

export function loadCommentsSuccess(comments){
  return {type:LOAD_COMMENTS_SUCCESS,comments}
}


export function loadPosts() {
    return (dispatch) => {
        return fetchPosts().then(posts => {
            dispatch(loadPostsSuccess(posts.filter(post =>post.deleted ===false)))
         }).catch(error=>{
            throw(error)
        })
    }
}

export function loadPostsByCategory(category){
    return (dispatch) => {
        return fetchPosts(category).then(posts => {
            dispatch(loadPostsSuccess(posts.filter(post =>post.deleted ===false)))
        }).catch(error=>{
            throw(error)
        })
    }
}

export function loadPostsSuccess(posts) {
    return {type: LOAD_POSTS_SUCCESS,posts}
}

export function upVotePost(post) {
  return (dispatch) => {
    return postVote(post,'upVote' ).then(post=>{
        dispatch(upVoteSuccess(post))
    }).catch(error=>{
        throw(error)
    })
  }
}

export function downVotePost(post) {
  return (dispatch) => {
    return postVote(post,'downVote' ).then(post=>{
      dispatch(downVoteSuccess(post))
    }).catch(error=>{
      throw(error)
    })
  }
}

export function upVoteSuccess(post){
  return { type: UP_VOTE, post }
}

export function downVoteSuccess(post){
  return { type: DOWN_VOTE,  post }
}

export function removePost(postToDelete) {
    return (dispatch) => {
        return deletePost(postToDelete).then(_=>{
            dispatch(removePostSuccess(postToDelete))
        }).catch(error=>{throw(error)})
    }
}

export function removePostSuccess(post){
  return { type: DELETE_POST, post}
}




export function upVoteComment(comment) {
  return (dispatch) => {
    return commentVote(comment,'upVote' ).then(comment=>{
      dispatch(upVoteCommentSuccess(comment))
    }).catch(error=>{
      throw(error)
    })
  }
}

export function downVoteComment(comment) {
  return (dispatch) => {
    return commentVote(comment,'downVote' ).then(comment=>{
      dispatch(downVoteCommentSuccess(comment))
    }).catch(error=>{
      throw(error)
    })
  }
}

export function upVoteCommentSuccess(comment){
  return { type: UP_VOTE_COMMENT, comment }
}

export function downVoteCommentSuccess(comment){
  return { type: DOWN_VOTE_COMMENT,  comment }
}

export function removeComment(commentToDelete) {
  return (dispatch) => {
    return deleteComment(commentToDelete).then(_=>{
      dispatch(removeCommentSuccess(commentToDelete))
    }).catch(error=>{throw(error)})
  }
}

export function removeCommentSuccess(comment){
  return {type: DELETE_COMMENT, comment}
}


export function openCreateCommentModal(){
  return dispatch=>
    dispatch({
      type:  OPEN_CREATE_COMMENT_MODAL
    })
}

export function openEditCommentModal(comment){
  return dispatch=>
    dispatch({
      type:  OPEN_EDIT_COMMENT_MODAL,
      comment
    })
}

export function updateComment(update){
  return dispatch=>{
    dispatch( {
        type: UPDATE_EDIT_COMMENT,
        update
      }
    )
  }
}


export function createComment(comment){
  comment.comment={...comment.comment, parentId: comment.post}
  return (dispatch) =>{
    if (comment.comment.id===""){
      return postEditComment( comment.comment)
        .then(comment=>{
          dispatch(createCommentSuccess(comment))}
        )
    }else{
      console.log("this is an edit")
      return saveEditComment( comment.comment)
        .then(comment=>{
          dispatch(saveCommentSuccess(comment))}
        )
    }
  }
}

export function createCommentSuccess(comment){
  return {
    type: CREATE_EDIT_COMMENT,
    comment
  }
}

export function saveCommentSuccess(comment){
  return {
    type: SAVE_EDIT_COMMENT,
    comment
  }
}

export function resetEditComment(){
  return dispatch=>
    dispatch({
      type: RESET_EDIT_COMMENT
    })
}