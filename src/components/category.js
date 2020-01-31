import React, { Component } from 'react'
import axios from 'axios'
import Short from './includes/short'
import Paginator from './includes/pagination'
import Sidebar from './layout/sidebar'

export default class Category extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      descr: '',
      title: '',
      slug: '',
      page: this.props.match.params.page || 1,
      total_pages: 1,
    }
    this.getData = this.getData.bind(this)
  }

  componentDidMount() {
    this.mounted = true
    this.getData()
  }
  getData() {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/wp/v2/categories?slug=${this.props.match.params.slug}`)
      .then(response => {
        if (this.mounted) {
          this.setState({
            descr: response.data[0].description,
            title: response.data[0].name,
            slug: response.data[0].slug,
          })
        }
        let categoryID = response.data[0].id
        axios
          .get(`${process.env.REACT_APP_API_BASE_URL}/wp/v2/posts?per_page=${process.env.REACT_APP_WP_PER_PAGE}&page=${this.state.page}&categories=${categoryID}`)
          .then(response => {
            if (this.mounted) {
              this.setState({
                posts: response.data,
                total_pages: response.headers['x-wp-totalpages'],
              })
            }
            this.props.hideLoading()
          })
          .catch(function(error) {
            console.error(error)
            this.props.redirectToError()
          })
      })
      .catch(function(error) {
        console.error(error)
        this.props.redirectToError()
      })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.slug !== this.props.match.params.slug) {
      this.getData()
      this.setState({
        page: 1,
      })
    }
    if (prevProps.match.params.page !== this.props.match.params.page) {
      this.setState({
        page: this.props.match.params.page || 1,
      })
      this.getData()
    }
  }
  componentWillUnmount() {
    this.mounted = false
  }
  render() {
    /* let category = 'category' */
    let posts = this.state.posts.map(post => {
      return <Short type={'category'} key={post.id} postObj={post} />
    })
    document.querySelector('title').innerText = process.env.REACT_APP_TITLE + ': ' + this.state.title
    return (
      <div className="container mt-4">
        <div className="row ">
          <div className="col-12 col-lg-8">
            <h1> {this.state.title} </h1> <p> {this.state.descr} </p> <hr />
            <div className="row">{posts}</div>
            {this.state.total_pages > 1 && <Paginator page={this.state.page} total_pages={this.state.total_pages} slug={'category/' + this.state.slug} getData={this.getData} />}
          </div>
          <div className="col-12 col-lg-4">{<Sidebar />}</div>
        </div>
      </div>
    )
  }
}
