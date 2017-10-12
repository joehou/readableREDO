import {combineReducers} from 'redux'
import sortBy from 'sort-by'
import * as types from '../actions/types'


function categories ( state = initialCategoriesState,action ) {
    switch(action.type){
        case types.LOAD_CATS_SUCCESS:
            return {
                ...state,
                categories: action.categories
            }
        case types.SELECT_CATEGORY:
            return {
                ...state,
                selectedCategory: action.category
            }
        default:
            return state
    }
}

function comments ( state = initialCommentsState,action){
  switch(action.type){
    case types.OPEN_CREATE_COMMENT_MODAL:
      return {
        ...state,
        commentsModalOpen:true
      }
    case types.OPEN_EDIT_COMMENT_MODAL:
      return {
        ...state,
        commentsModalOpen:true,
        selectedComment: action.comment.id,
        editComment: state.comments.filter(comment=> comment.id===action.comment.id)[0]
      }
    case types.UPDATE_EDIT_COMMENT:
      return {
        ...state,
        editComment: {...state.editComment, [action.update.propertyName]: action.update.value}
      }
    case types.LOAD_COMMENTS_SUCCESS:
        return {
          ...state,
          comments: action.comments
        }
    case types.UP_VOTE_COMMENT:
        return {
          ...state,
          comments: state.comments.map(comment=>{
            if (comment.id===action.comment.id){
              return {...comment,voteScore: comment.voteScore+1}
            }else{
              return comment
            }
          })
        }
    case types.DOWN_VOTE_COMMENT:
        return {
          ...state,
          comments: state.comments.map(comment=>{
            if (comment.id===action.comment.id){
              return {...comment,voteScore: comment.voteScore-1}
            }else{
              return comment
            }
          })
        }
    case types.DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter( comment=>comment.id!==action.comment.id)
      }
    case types.CREATE_EDIT_COMMENT:
      return {
        ...state,
        commentsModalOpen: false,
        comments: [...state.comments,action.comment]
      }
    case types.RESET_EDIT_COMMENT:
      return {
        ...state,
        editComment: blankComment,
        commentsModalOpen: false
      }
    case types.SAVE_EDIT_COMMENT:
      return{
        ...state,
        commentsModalOpen: false,
        editComment: blankComment,
        comments: state.comments.map(comment=>{
          if (comment.id === action.comment.id){
            return action.comment
          }else{
            return comment
          }
        })
      }
    default:
      return state
  }

}

function posts ( state = initialPostState,action ) {
    switch(action.type){
      case types.CREATE_EDIT_POST:
        return {
          ...state,
          editPost: {
            title: "",
            author: "",
            category: "",
            body: ""
          }
        }
      case types.CREATE_EDIT_POST:
        return {
          ...state,
          editPost: blankPost
        }
      case types.RESET_EDIT_POST:
        return {
          ...state,
          editPost: blankPost
        }
      case types.UPDATE_EDIT_POST:
        console.log( {...state.editPost} )
        return {
          ...state,
          editPost: {...state.editPost, [action.update.propertyName]: action.update.value}
        }
      case types.LOAD_POST_SUCCESS:
        return {
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
      case types.LOAD_EDIT_POST_SUCCESS:
        return {
          ...state,
          editPost: action.post
        }
      case types.LOAD_POSTS_SUCCESS:
        return {
            ...state,
            posts: action.posts
        }
      case types.SORT_BY_COLUMN:
        return {
            ...state,
            sortColumn: action.columnName,
        }
      case types.UP_VOTE:
        return {
          ...state,
          posts: state.posts.map(post=>{
              if (post.id===action.post.id){
                 return {...post,voteScore: post.voteScore+1}
              }else{
                  return post
              }
          })
        }
      case types.DOWN_VOTE:
        return {
          ...state,
          posts: state.posts.map(post=>{
            if (post.id===action.post.id){
              return {...post,voteScore: post.voteScore-1}
            }else{
              return post
            }
          })
        }
      case types.DELETE_POST:
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

const initialCommentsState = {
  comments: [],
  commentsModalOpen: false,
  editComment: {
    id: "",
    author: "",
    category: "",
    body: ""
  },
  selectedComment: null
}

const blankComment={
  id: "",
  author: "",
  category: "",
  body: ""
}

const blankPost={
  title: "",
  author: "",
  category: "react",
  body: ""
}

const initialPostState= {
  posts: [],
  sortColumn: "voteScore",
  selectedPost: null,
  editPost: blankPost
}

export default {categories,posts,comments}
