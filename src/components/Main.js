import React,{Component} from 'react'
import { connect } from 'react-redux'
import {selectCategory} from '../actions'

import CategoryList from '../components/CategoryList'


class Main extends Component {
  render() {
    return(
      <div className="main row">
        <CategoryList categories={this.props.categories} />
        <div className="posts col-9">
          <h2>Posts</h2>
          <div className="post">
            <p>
              <b>Monitor the impact of your code changes. Measure performance, track errors,</b>
              <br/>and analyze your application.
            </p>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({posts}) {
  return {
    selectedCategory: posts.selectedCategory,
    categories: posts.categories,
    posts: posts.posts
  }
}

export default withRouter(connect(mapStateToProps)(Main))