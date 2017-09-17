import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Route, Switch,Link,withRouter} from 'react-router-dom'
import {loadCategories,loadPosts,loadPostsByCategory,selectCategory,sortByColumn} from './actions'
import FaLeanpub from 'react-icons/lib/fa/leanpub'
import './App.css';
import sortBy from 'sort-by'
import CategoryList from './components/CategoryList'
import PostsList from './components/PostsList'

class App extends Component {

  componentDidMount() {
      this.props.loadCategories();
      this.props.loadPosts()
      console.log("app mounting")
  }

    render() {
    const {categories,selectedCategory,posts}  =this.props
    const {selectCategory,sortByColumn} = this.props
    return (
      <div className="App">
          <div className="header">
              <div className="grid row">
              <h1 className='logo col-3'><FaLeanpub size={30}/> Readable</h1>
              <ul className="navigation col-9">
                <li><Link to="/">Home</Link></li>
                  <li><a href="#">About</a></li>
                  <li><a href="#">Contact</a></li>
              </ul>
              </div>
          </div>
          <div className="grid">
              <div className="main row">
                  <CategoryList categories={categories} selectedCategory={selectedCategory} onSelectCategory={selectCategory} />
                  <Route exact path='/' component = {PostsList}/>
                  <Route path='/:category' component = {PostsList}/>
         </div>
          </div>
      </div>
    );
  }
}

function mapStateToProps(state,ownProps) {
    const { categories,posts} = state
    return {
        selectedCategory: categories.selectedCategory,
        categories: categories.categories,
        posts: posts.posts.slice().sort(sortBy("-"+posts.sortColumn))
    }
}

function mapDispatchToProps(dispatch){
    return{
        loadCategories: ()=>dispatch(loadCategories()),
        loadPosts: () => dispatch(loadPosts()),
        loadPostsByCategory: (category) => dispatch(loadPostsByCategory(category)),
        selectCategory: (data)=> dispatch(selectCategory(data)),
        sortByColumn: (data)=> dispatch(sortByColumn(data))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))