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

export function fetchPost (post) {
    return fetch(`${api}/posts/${post}`, {headers})
      .then(res => res.json())
      .then(post=> post)
}

export function fetchPosts (category) {
    if (!category){
     console.log("fetching posts for all")
     return fetch(`${api}/posts`, { headers })
        .then(res => res.json())
        .then(posts => posts)
    }else{
        console.log("fetching posts for ", category)
        return fetch(`${api}/${category}/posts`, {headers})
            .then(res => res.json())
            .then(posts=> posts)
    }
}

export function postVote(post,option){
  return fetch (`${api}/posts/${post.id}`, {method:'POST',headers:{...headers,'Content-Type': 'application/json'},body:JSON.stringify({option} )})
    .then( res => res.json())
    .then( post => post)
}

export function deleteVote(post){
  return fetch (`${api}/posts/${post.id}`, {method:'DELETE',headers:{...headers,'Content-Type': 'application/json'}})
}

export function postEditPost(post){
  //here we add the missing information?
  post= {...post,id:Math.random().toString(36).substr(-20),timestamp:Date.now()}
  console.log(post);
  return fetch (`${api}/posts/`, {method:'POST',headers:{...headers,'Content-Type': 'application/json'},body:JSON.stringify(post )})
    .then( res => res.json())
    .then( post => post)
}