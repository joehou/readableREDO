import {combineReducers} from 'redux'
import sortBy from 'sort-by'
import  {SELECT_CATEGORY,LOAD_CATS_SUCCESS,LOAD_POSTS_SUCCESS,SORT_BY_COLUMN,UP_VOTE,DOWN_VOTE,DELETE_VOTE,SELECT_POST,LOAD_POST_SUCCESS,UPDATE_EDIT_POST,CREATE_EDIT_POST,LOAD_EDIT_POST_SUCCESS,RESET_EDIT_POST } from '../actions'


function categories ( state = initialCategoriesState,action ) {
    switch(action.type){
        case LOAD_CATS_SUCCESS:
            return {
                ...state,
                categories: action.categories
            }
        case SELECT_CATEGORY:
            return {
                ...state,
                selectedCategory: action.category
            }
        default:
            return state
    }
}

function posts ( state = initialPostState,action ) {
    switch(action.type){
      case CREATE_EDIT_POST:
        return {
          ...state,
          editPost: {
            title: "",
            author: "",
            category: "",
            body: ""
          }
        }
      case RESET_EDIT_POST:
        return {
          ...state,
          editPost: {
            title: "",
            author: "",
            category: "",
            body: ""
          }
        }
      case UPDATE_EDIT_POST:
        console.log( {...state.editPost} )
        return {
          ...state,
          editPost: {...state.editPost, [action.update.propertyName]: action.update.value}
        }
      case LOAD_POST_SUCCESS:  //this should be modified to contain the ID of the selected post
        return {               //and posts state should be update with the info from the ajax call
          ...state,
          posts: state.posts.length ===0
            ? [action.post] :
            state.posts.map(post=>{
            if (post.id===action.post.id){
              return action.post
            }else{
              return post
            }
          }),
          selectedPost: action.post.id
        }
      case LOAD_EDIT_POST_SUCCESS:
        return {
          ...state,
          editPost: action.post
        }
      case LOAD_POSTS_SUCCESS:
        return {
            ...state,
            posts: action.posts
        }
      case SORT_BY_COLUMN:
        return {
            ...state,
            sortColumn: action.columnName,
        }
      case UP_VOTE:
        return {
          ...state,
          posts: state.posts.map(post=>{
              if (post.id===action.post.id){
                 return {...post,voteScore: post.voteScore+1}
              }else{
                  return post
              }
          })  // would this change the state of selected post?
          //, selectedPost: (state.selectedPost && state.selectedPost.id ===action.post.id )?
          //   {...state.selectedPost,voteScore: state.selectedPost.voteScore+1 }:
          //   state.selectedPost
        }
      case DOWN_VOTE:
        return {
          ...state,
          posts: state.posts.map(post=>{
            if (post.id===action.post.id){
              return {...post,voteScore: post.voteScore-1}
            }else{
              return post
            }
          })
          //, selectedPost: (state.selectedPost && state.selectedPost.id) ===action.post.id ?
          //   {...state.selectedPost,voteScore: state.selectedPost.voteScore-1 }:
          //   state.selectedPost
        }
      case DELETE_VOTE:
          return {
            ...state,
            posts: state.posts.filter( post=>post.id!==action.post.id)
          }
        default:
            return state
    }
}

const initialCategoriesState= {
  selectedCategory: null,
  categories: [],
  comments: []
}

const initialPostState= {
  posts: [],
  sortColumn: "voteScore",
  selectedPost: null,
  editPost: {
    title: "",
    author: "",
    category: "",
    body: ""
  }
}

export default {categories,posts}
