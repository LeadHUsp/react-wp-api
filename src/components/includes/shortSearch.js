import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'

export default class shortSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.id,
      title: '',
      slug: '',
      image: '',
      excerpt: '',
      date: '',
    }
  }
  componentDidMount() {
    this.mounted = true
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/wp/v2/posts/${this.props.id}`)
      .then(response => {
        /*  console.log(response) */
        if (this.mounted) {
          this.setState({
            title: response.data.title.rendered,
            slug: '/post/' + response.data.slug,
            excerpt: response.data.excerpt.rendered,
            date: response.data.date,
          })
        }
        axios
          .get(
            `${process.env.REACT_APP_API_BASE_URL}/wp/v2/media/${response.data.featured_media}`
          )
          .then(response => {
            if (this.mounted) {
              this.setState({
                image: response.data.media_details.sizes.full.source_url,
              })
            }
          })
          .catch(function(error) {
            console.error(error)
          })
      })
      .catch(error => {
        console.error(error)
      })
  }
  componentWillUnmount() {
    this.mounted = false
  }
  render() {
    let date = new Date(this.state.date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    return (
      <div className=" col-12 col-sm-6 pb-4 short-post">
        <div className="short-post-thumbnail">
          <NavLink className="card-link" to={this.state.slug}>
            <img className="post-image" src={this.state.image} alt={this.state.title} />
          </NavLink>
        </div>
        <div className="short-post-content">
          <p className="post-date my-3">{date}</p>
          <NavLink className="card-link" to={this.state.slug}>
            <h2 dangerouslySetInnerHTML={{ __html: this.state.title }}></h2>
          </NavLink>
          <div dangerouslySetInnerHTML={{ __html: this.state.excerpt }}></div>
        </div>
      </div>
    )
  }
}
