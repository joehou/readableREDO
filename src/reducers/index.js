import {combineReducers} from 'redux'
import sortBy from 'sort-by'
import  {SELECT_CATEGORY,LOAD_CATS_SUCCESS,LOAD_POSTS_SUCCESS,SORT_BY_COLUMN,UP_VOTE,DOWN_VOTE,DELETE_VOTE} from '../actions'


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
    sortColumn: "voteScore"
}

export default combineReducers({categories,posts})
