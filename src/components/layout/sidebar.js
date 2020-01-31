import React, { Component } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import PostWidget from '../includes/postWidget'

export default class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: [],
      last_posts: [],
    }
  }
  componentDidMount() {
    this.mounted = true
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/wp/v2/categories?exclude=1`)
      .then(response => {
        if (this.mounted) {
          this.setState({
            categories: response.data,
          })
        }
      })
      .catch(error => {
        console.error(error)
      })

    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/wp/v2/posts?per_page=4&page=1&orderby=date&order=desc`)
      .then(response => {
        if (this.mounted) {
          this.setState({
            last_posts: response.data,
          })
        }
      })
      .catch(error => {
        console.error(error)
      })
  }

  componentWillUnmount() {
    this.postMounted = false
  }
  renderCaregories() {
    const items = this.state.categories.map(category => {
      return (
        <li key={category.id}>
          <NavLink to={`/category/${category.slug}`} className="widget-link">
            <span>
              <i className="far fa-folder"></i> &nbsp;
              {category.name}
            </span>
            <span>({category.count})</span>
          </NavLink>
        </li>
      )
    })
    return (
      <div className="widget-area">
        <div className="widget-title">
          <h6>Categories</h6>
        </div>
        <ul>{items}</ul>
      </div>
    )
  }
  renderLastPost() {
    const items = this.state.last_posts.map(post => {
      return <PostWidget key={post.id} postObj={post} />
    })
    return (
      <div className="widget-area">
        <div className="widget-title">
          <h6>latest posts</h6>
        </div>
        <ul>{items}</ul>
      </div>
    )
  }
  render() {
    return (
      <aside>
        {this.renderCaregories()}
        {this.renderLastPost()}
      </aside>
    )
  }
}
