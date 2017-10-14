const api = "http://localhost:5001"

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
      token = localStorage.token = Math.random().toString(36).substr(-8)
console.log('token: ',token)


const headers = {
    'Accept': 'application/json',
    'Authorization': '8hxvct1p'
}

export const fetchCategories = () => (
    fetch(`${api}/categories`, { headers })
        .then(res => res.json())
        .then(data => data.categories)
)

export function fetchComments(post){
  return fetch(`${api}/posts/${post}/comments`,{headers})
    .then(res =>res.json())
    .then(comments=>comments)
}

export function fetchCommentsCount(post){
  return fetch(`${api}/posts/${post.id}/comments`,{headers})
    .then(res =>res.json())
    .then(comments=>comments)
    .then(comments=>comments.length)
}

export function fetchPost (post) {
    return fetch(`${api}/posts/${post}`, {headers})
      .then(res => res.json())
      .then(post=> post)
}

export function fetchPosts (category) {
    if (!category){
     return fetch(`${api}/posts`, { headers })
        .then(res => res.json())
        .then(posts =>{
          return Promise.all(posts.map(post=> fetchCommentsCount(post).then(count=> {post.commentCount=count;return post}) )).then(val=>{console.log(val);return val})
        })
    }else{
        console.log("fetching posts for ", category)
        return fetch(`${api}/${category}/posts`, {headers})
            .then(res => res.json())
            .then(posts=> posts)
    }
}

export function commentVote(comment,option){
  return fetch (`${api}/comments/${comment.id}`, {method:'POST',headers:{...headers,'Content-Type': 'application/json'},body:JSON.stringify({option} )})
    .then( res => res.json())
    .then( comment => comment)
}



export function postVote(post,option){
  return fetch (`${api}/posts/${post.id}`, {method:'POST',headers:{...headers,'Content-Type': 'application/json'},body:JSON.stringify({option} )})
    .then( res => res.json())
    .then( post => post)
}

export function deletePost(post){
  return fetch (`${api}/posts/${post.id}`, {method:'DELETE',headers:{...headers,'Content-Type': 'application/json'}})
}

export function deleteComment(comment){
  return fetch (`${api}/comments/${comment.id}`, {method:'DELETE',headers:{...headers,'Content-Type': 'application/json'}})
}

export function postEditPost(post){
  post= {...post,id:Math.random().toString(36).substr(-20),timestamp:Date.now()}
  return fetch (`${api}/posts/`, {method:'POST',headers:{...headers,'Content-Type': 'application/json'},body:JSON.stringify(post )})
    .then( res => res.json())
    .then( post => post)
}


export function saveEditPost(post){
  return fetch (`${api}/posts/${post.id}`, {method:'PUT',headers:{...headers,'Content-Type': 'application/json'},body:JSON.stringify(post )})
    .then( res => res.json())
    .then( post => post)
}


export function postEditComment(comment){
  comment= {...comment,id:Math.random().toString(36).substr(-20),timestamp:Date.now()}
  return fetch (`${api}/comments/`, {method:'POST',headers:{...headers,'Content-Type': 'application/json'},body:JSON.stringify(comment )})
    .then( res => res.json())
    .then( comment => comment)
}

export function saveEditComment(comment){
  return fetch (`${api}/comments/${comment.id}`, {method:'PUT',headers:{...headers,'Content-Type': 'application/json'},body:JSON.stringify(comment )})
    .then( res => res.json())
    .then( post => post)
}
