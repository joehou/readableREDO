import {fetchCategories,fetchPosts,postVote,deleteVote,fetchPost,postEditPost} from '../utils/api'
import { push } from 'react-router-redux'




export const SELECT_CATEGORY = 'SELECT_CATEGORY'
export const LOAD_CATS_SUCCESS = 'LOAD_CATS_SUCCESS'
export const LOAD_POSTS_SUCCESS= 'LOAD_POSTS_SUCCESS'
export const LOAD_POST_SUCCESS= 'LOAD_POST_SUCCESS'
export const SORT_BY_COLUMN = 'SORT_BY_COLUMN'
export const UP_VOTE = 'UP_VOTE'
export const DOWN_VOTE = 'DOWN_VOTE'
export const DELETE_VOTE = 'DELETE_VOTE'
export const SELECT_POST = 'SELECT_POST'
export const UPDATE_EDIT_POST = 'UPDATE_EDIT_POST'
export const CREATE_EDIT_POST = 'CREATE_EDIT_POST'



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

export function updatePost(update){
  return dispatch=>{
    dispatch( {
        type: UPDATE_EDIT_POST,
        update
      }
    )
  }
}

export function createPost(post){
  return (dispatch) =>{
    return postEditPost( post ).then(post=>{
      dispatch(CreatePostSuccess(post))})
      .then(_=>{
        console.log("dispatchingPush")
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

export function deletePost(postToDelete) {
    return (dispatch) => {
        return deleteVote(postToDelete).then(_=>{
            dispatch(deleteVoteSuccess(postToDelete))
        }).catch(error=>{throw(error)})
    }
}

export function deleteVoteSuccess(post){
  return { type: DELETE_VOTE, post}
}