import {combineReducers} from 'redux'
import sortBy from 'sort-by'
import  {LOAD_COMMENTS_SUCCESS,SELECT_CATEGORY,LOAD_CATS_SUCCESS,LOAD_POSTS_SUCCESS,SORT_BY_COLUMN,UP_VOTE,
  DOWN_VOTE,DELETE_POST,SELECT_POST,LOAD_POST_SUCCESS,UPDATE_EDIT_POST,CREATE_EDIT_POST,LOAD_EDIT_POST_SUCCESS
  ,RESET_EDIT_POST,SAVE_EDIT_POST,UP_VOTE_COMMENT ,DOWN_VOTE_COMMENT,DELETE_COMMENT} from '../actions'


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

function comments ( state = initialCommentsState,action){
  switch(action.type){
    case LOAD_COMMENTS_SUCCESS:
        return {
          ...state,
          comments: action.comments
        }
    case UP_VOTE_COMMENT:
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
    case DOWN_VOTE_COMMENT:
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
    case DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter( comment=>comment.id!==action.comment.id)
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
      case CREATE_EDIT_POST:
        return {
          ...state,
          editPost: blankPost
        }
      case RESET_EDIT_POST:
        return {
          ...state,
          editPost: blankPost
        }
      case UPDATE_EDIT_POST:
        console.log( {...state.editPost} )
        return {
          ...state,
          editPost: {...state.editPost, [action.update.propertyName]: action.update.value}
        }
      case LOAD_POST_SUCCESS:
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
          })
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
        }
      case DELETE_POST:
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
  comments: []
}


const blankPost={
  title: "",
  author: "",
  category: "",
  body: ""
}

const initialPostState= {
  posts: [],
  sortColumn: "voteScore",
  selectedPost: null,
  editPost: blankPost
}

export default {categories,posts,comments}
