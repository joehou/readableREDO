import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Route, Switch,Link,withRouter} from 'react-router-dom'
import * as actions from './actions'
import FaLeanpub from 'react-icons/lib/fa/leanpub'
import './App.css';
import sortBy from 'sort-by'
import CategoryList from './components/CategoryList'
import PostsList from './components/PostsList'
import PostView from './components/PostView'
import PostNew from './components/PostNew'

class App extends Component {

  componentDidMount() {
      this.props.loadCategories()
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
                <Switch>
                  <Route exact path='/' component = {PostsList} />
                  <Route path='/posts/new' component = {PostNew} />
                  <Route path='/:post/edit' component = {PostNew} />
                  <Route path='/:category/:post' component={PostView} />
                  <Route path='/:category' component = {PostsList} />
                </Switch>
         </div>
          </div>
      </div>
    );
  }
}

function mapStateToProps({categories,posts}) {

    return {
        selectedCategory: categories.selectedCategory,
        categories: categories.categories,
        posts: posts.posts.slice().sort(sortBy("-"+posts.sortColumn))
    }
}

export default withRouter(connect(mapStateToProps, actions)(App))
