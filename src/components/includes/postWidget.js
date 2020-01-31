import React, { Component } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

export default class PostWidget extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: this.props.postObj.title.rendered,
      slug: '/post/' + this.props.postObj.slug,
      image: '',
      author: '',
    }
    this.getData = this.getData.bind(this)
  }

  componentDidMount() {
    this.mounted = true
    this.getData()
  }
  getData() {
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/wp/v2/media/${this.props.postObj.featured_media}`
      )
      .then(response => {
        if (this.mounted) {
          this.setState({
            image: response.data.media_details.sizes.thumbnail.source_url,
          })
        }
      })
      .catch(function(error) {
        console.error(error)
      })
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/wp/v2/users/${this.props.postObj.author}`
      )
      .then(response => {
        if (this.mounted) {
          this.setState({
            author: response.data,
          })
        }
      })
      .catch(function(error) {
        console.error(error)
      })
  }
  componentWillUnmount() {
    this.mounted = false
  }

  render() {
    return (
      <div className="widget-post">
        <div className="widget-post-thumb">
          <img src={this.state.image} alt="" />
        </div>
        <div className="widget-post-content">
          <NavLink to={this.state.slug} className="widget-post-title">
            <h6>{this.state.title}</h6>
          </NavLink>
          <NavLink
            to={`/author/${this.state.author.slug}`}
            className="widget-post-author"
          >
            by {this.state.author.name}
          </NavLink>
        </div>
      </div>
    )
  }
}
