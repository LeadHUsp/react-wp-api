import React, { Component } from 'react'
import axios from 'axios'
import Categories from './includes/categories'
import { NavLink } from 'react-router-dom'
import Swiper from 'swiper/js/swiper.esm.bundle'

export default class Post extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      excerpt: '',
      content: '',
      image: '',
      date: '',
      author: {},
      categories: [],
    }
  }

  componentDidMount() {
    this.postMounted = true
    this.init = true
    this.getData()
  }
  componentDidUpdate(prevState) {
    if (document.querySelector('#root').hasChildNodes('.swiper-slide') && this.init) {
      this.swiper = new Swiper(
        '#root > .container-fluid > .single-post > .text-dark > .post-content > .swiper-container',
        {
          grabCursor: true,
          slidesPerView: 1,
          speed: 500,
          observer: true,
          navigation: {
            nextEl: ' .swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        }
      )
      this.init = false
    }
  }
  componentWillUnmount() {
    this.postMounted = false
  }
  getData() {
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/wp/v2/posts?slug=${this.props.match.params.slug}`
      )
      .then(response => {
        /* console.log(response) */
        let media = response.data[0].featured_media
        if (this.postMounted) {
          this.setState({
            categories: response.data[0].categories,
            title: response.data[0].title.rendered,
            excerpt: response.data[0].excerpt.rendered,
            content: response.data[0].content.rendered,
            date: response.data[0].date,
          })
        }

        axios
          .get(`${process.env.REACT_APP_API_BASE_URL}/wp/v2/users/${response.data[0].author}`)
          .then(response => {
            if (this.postMounted) {
              this.setState({
                author: response.data,
              })
            }
          })
          .catch(error => {
            console.error(error)
            this.props.redirectToError()
          })
        axios
          .get(`${process.env.REACT_APP_API_BASE_URL}/wp/v2/media/${media}`)
          .then(response => {
            if (this.postMounted) {
              this.setState({
                image: response.data.media_details.sizes.full.source_url,
              })
            }
            this.props.hideLoading()
          })
      })
      .catch(error => {
        console.error(error)
        this.props.redirectToError()
      })
  }

  render() {
    let excerptText = this.state.excerpt.split('&hellip;')[0]
    let date = new Date(this.state.date)
    document.querySelector('title').innerText = this.state.title

    return (
      <article className="single-post container">
        <div
          style={{
            backgroundImage: `url(${this.state.image})`,
          }}
          className="py-5 header-post"
        >
          <h1> {this.state.title} </h1>
        </div>
        <main className="py-3 text-dark">
          <div
            className="lead"
            dangerouslySetInnerHTML={{
              __html: excerptText,
            }}
          ></div>
          <hr />
          <div
            className="post-content"
            dangerouslySetInnerHTML={{
              __html: this.state.content,
            }}
          ></div>
        </main>
        <div className="text-black-50">
          <hr />
          <div className="d-flex justify-content-between align-items-center">
            <Categories cat={this.state.categories} />
            <i>
              <NavLink to={`/author/${this.state.author.slug}`}>
                {this.state.author.name}
              </NavLink>
              , {date.toLocaleString()}
            </i>
          </div>
        </div>
      </article>
    )
  }
}
