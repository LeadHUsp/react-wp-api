import React, { Component } from 'react'
import axios from 'axios'
import Short from './includes/short'
import Swiper from 'swiper/js/swiper.esm.bundle'

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      promos: [],
      image: '',
    }
  }
  componentDidMount() {
    this.mounted = true
    this.getPostData()
    this.getPromoData()

    this.swiper = new Swiper('.row > .swiper-container', {
      grabCursor: true,
      slidesPerView: 1,
      speed: 500,
      observer: true,
      navigation: {
        nextEl: '.row > .swiper-container > .swiper-nav > .home-button-next',
        prevEl: '.row > .swiper-container > .swiper-nav > .home-button-prev',
      },
      pagination: {
        el: ' .swiper-pagination',
        type: 'fraction',
      },
    })
  }
  componentDidUpdate() {
    this.swiper.update()
  }
  componentWillUnmount() {
    this.mounted = false
    this.swiper.destroy()
  }
  //получаем данные последних постов, кроме постов промо
  getPostData() {
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/wp/v2/posts?per_page=3&page=1&orderby=date&order=desc&categories_exclude=14`
      )
      .then(response => {
        /* console.log(response) */
        if (this.mounted) {
          this.setState({
            posts: response.data,
          })
        }
        this.props.hideLoading()
      })
      .catch(error => {
        console.error(error)
        this.props.redirectToError()
      })
  }
  //получаем данные постов промо
  getPromoData() {
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/wp/v2/posts?per_page=3&page=1&orderby=date&order=desc&categories=14`
      )
      .then(response => {
        if (this.mounted) {
          this.setState({
            promos: response.data,
          })
        }
        this.props.hideLoading()
      })
      .catch(error => {
        console.error(error)
        this.props.redirectToError()
      })
  }

  render() {
    let home = 'home'
    let posts = this.state.posts.map(post => {
      return (
        <Short
          type={home}
          key={post.id}
          postObj={post}
          hideLoading={this.props.hideLoading}
        />
      )
    })
    let promoType = 'promo'
    let promos = this.state.promos.map(promo => {
      return (
        <Short
          type={promoType}
          key={promo.id}
          postObj={promo}
          hideLoading={this.props.hideLoading}
        />
      )
    })

    document.querySelector('title').innerText = process.env.REACT_APP_TITLE
    return (
      <>
        <div className="row">
          <div className="swiper-container">
            <div className="swiper-wrapper">{promos}</div>
            <div className="swiper-nav">
              <div className="home-button-prev">
                <i className="fas fa-chevron-left"></i>
              </div>
              <div className="home-button-next">
                <i className="fas fa-chevron-right"></i>
              </div>
              <div className="swiper-pagination"></div>
            </div>
          </div>
        </div>
        <div className="container mt-5">
          <div className="row">
            <div className="col-12 ">
              <div className="row"> {posts}</div>
            </div>
          </div>
        </div>
      </>
    )
  }
}
