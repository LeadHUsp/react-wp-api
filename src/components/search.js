import React, { Component } from 'react'
import axios from 'axios'
import Sidebar from './layout/sidebar'
import Short from './includes/shortSearch'

export default class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      found: false,
    }
  }
  componentDidMount() {
    this.mounted = true
    this.getData()
    this.props.hideLoading()
    /* console.log(this.props) */
  }

  componentDidUpdate(prevProps) {
    console.log('update')
    if (prevProps.location.search !== this.props.location.search) {
      this.getData()
    }
  }

  getData() {
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/wp/v2/search${this.props.location.search}&per_page=6&type=post&subtype=post`
      )
      .then(response => {
        console.log(response)
        if (this.mounted) {
          if (response.data.length > 0) {
            this.setState({
              posts: response.data,
              found: true,
            })
          } else {
            this.setState({
              found: false,
            })
          }
        }
      })
      .catch(error => {
        console.error(error)
        this.props.redirectToError()
      })
  }

  componentWillUnmount() {
    this.mounted = false
  }
  renderPosts() {
    if (this.state.found) {
      const items = this.state.posts.map(post => {
        let display = <Short key={post.id} id={post.id} />
        return display
      })
      return items
    } else {
      return <h1>По Вашему запросу ничего не найдено</h1>
    }
  }
  render() {
    document.querySelector('title').innerText =
      process.env.REACT_APP_TITLE + ': Search results'

    return (
      <div className="container mt-4">
        <div className="row ">
          <div className="col-12 col-lg-8 d-flex flex-wrap">{this.renderPosts()}</div>
          <div className="col-12 col-lg-4">
            <Sidebar />
          </div>
        </div>
      </div>
    )
  }
}
