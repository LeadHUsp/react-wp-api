import React, { Component } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

export default class Short extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: this.props.postObj.title.rendered,
      slug: '/post/' + this.props.postObj.slug,
      image: '',
      excerpt: this.props.postObj.excerpt.rendered,
      author: '',
    }
    this.getData = this.getData.bind(this)
  }

  componentDidMount() {
    this.mounted = true
    this.getData()
    this.date = new Date(this.props.postObj.date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }
  getData() {
    if (this.props.type === 'home' || this.props.type === 'category') {
      axios
        .get(
          `${process.env.REACT_APP_API_BASE_URL}/wp/v2/media/${this.props.postObj.featured_media}`
        )
        .then(response => {
          if (this.mounted) {
            this.setState({
              image: response.data.media_details.sizes.full.source_url,
            })
          }
          axios
            .get(
              `${process.env.REACT_APP_API_BASE_URL}/wp/v2/users/${this.props.postObj.author}`
            )
            .then(response => {
              if (this.mounted) {
                this.setState({
                  author: response.data.slug,
                })
              }
            })
            .catch(function(error) {
              console.error(error)
            })
        })
        .catch(function(error) {
          console.error(error)
        })
    } else {
      axios
        .get(
          `${process.env.REACT_APP_API_BASE_URL}/wp/v2/media/${this.props.postObj.featured_media}`
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
    }
  }
  componentWillUnmount() {
    this.mounted = false
  }

  render() {
    switch (this.props.type) {
      case 'category':
        return (
          <div className=" col-12 col-sm-6 pb-4 short-post">
            <div className="short-post-thumbnail">
              <NavLink className="card-link" to={this.state.slug}>
                <img className="post-image" src={this.state.image} alt={this.state.title} />
              </NavLink>
            </div>
            <div className="short-post-content">
              <p className="post-date my-3">{this.date}</p>
              <NavLink className="card-link" to={this.state.slug}>
                <h2 dangerouslySetInnerHTML={{ __html: this.state.title }}></h2>
              </NavLink>
              <div dangerouslySetInnerHTML={{ __html: this.state.excerpt }}></div>
            </div>
            <NavLink className="short-post-link" to={`/author/${this.state.author}`}>
              <span>by </span>
              {this.state.author}
            </NavLink>
          </div>
        )
      case 'promo':
        return (
          <div className="swiper-slide" key={this.props.id}>
            <div className="slide-post-thumbnail">
              <div
                className="thumbnail-wrapper"
                style={{ backgroundImage: `url(${this.state.image})` }}
              ></div>
            </div>
            <div className="slide-post-content">
              <p className="post-date">{this.date}</p>
              <h2>{this.props.postObj.title.rendered}</h2>
              <div
                className="mb-lg-4"
                dangerouslySetInnerHTML={{
                  __html: this.props.postObj.excerpt.rendered,
                }}
              ></div>
              <NavLink className="promo-link-post" to={`/post/${this.props.postObj.slug}`}>
                Read More
              </NavLink>
            </div>
          </div>
        )
      default:
        return (
          <div className=" col-12 pb-4 short-post ">
            <div className="short-post-thumbnail home-short-thumbnail">
              <NavLink className="card-link" to={this.state.slug}>
                <img className="post-image" src={this.state.image} alt={this.state.title} />
              </NavLink>
            </div>
            <div className="short-post-content home-short-content">
              <p className="post-date my-3">{this.date}</p>
              <NavLink className="card-link" to={this.state.slug}>
                <h2>{this.state.title}</h2>
              </NavLink>
              <div dangerouslySetInnerHTML={{ __html: this.state.excerpt }}></div>
            </div>
          </div>
        )
    }
  }
}
