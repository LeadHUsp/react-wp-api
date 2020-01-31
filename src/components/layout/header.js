import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import SearchBar from '../includes/searchBar'
import axios from 'axios'
import logo from '../../logo.svg'

export default class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      menu: [], //пустой массив в который будет сохранено основное меню, полученное от сервера
      social_menu: [], //пустой массив в который будет сохранено меню социальных ссылок, полученное от сервера
      is_open: false, // переключение меню в мобильном виде
    }
    this.toggle = this.toggle.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.mounted = true
    //делаем запрос к серверу и получаем массив основного меню
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/menus/v1/menus/api-menu`)
      .then(response => {
        if (this.mounted) {
          this.setState({ menu: response.data.items })
        }
      })
      .catch(function(error) {
        console.log(error)
      })
    //делаем запрос к серверу и получаем массив меню социальных ссылок
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/menus/v1/menus/social-links`)
      .then(response => {
        if (this.mounted) {
          this.setState({ social_menu: response.data.items })
        }
      })
      .catch(function(error) {
        console.log(error)
      })
    this.stikyNav()
  }
  //функция переключения дроп меню
  dropToggle(event) {
    event.preventDefault()
    document.querySelector('.drop-down-menu').classList.toggle('drop-down-show')
  }
  //функция переключения меню в мобильном виде
  toggle() {
    this.setState({ is_open: !this.state.is_open })
  }
  //функция отрисовки элементов основного меню
  renderNavItems() {
    const items = this.state.menu.map(item => {
      let display = ''
      if (!item.child_items) {
        let href = item.url.replace(process.env.REACT_APP_WP_BASE_URL, '')
        display = (
          <li className="nav-item" key={item.ID}>
            <NavLink exact to={href} className="nav-link">
              {item.title}
            </NavLink>
          </li>
        )
      } else {
        let subItems = item.child_items.map(subItem => {
          let href = subItem.url.replace(process.env.REACT_APP_WP_BASE_URL, '')
          return (
            <NavLink className="nav-link" to={href} key={subItem.ID}>
              {subItem.title}
            </NavLink>
          )
        })
        display = (
          <li
            className="nav-item drop-down"
            onClick={this.dropToggle}
            key={item.ID}
          >
            <button className="drop-down-toggle">{item.title} </button>
            <div className="drop-down-menu">{subItems}</div>
          </li>
        )
      }
      return display
    })
    return <ul className="main-nav">{items}</ul>
  }
  //функция отрисовки элементов меню социальных ссылок
  renderSocialNav() {
    const items = this.state.social_menu.map(item => {
      return (
        <li className="nav-item-social" key={item.ID}>
          <a href={item.url} className="nav-link-social">
            <i className={`fab fa-${item.title}`}></i>
          </a>
        </li>
      )
    })
    return <ul className="social-nav">{items}</ul>
  }
  //функция изменения меню при скроле
  stikyNav() {
    let nav = document.querySelector('.nav-bar')
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 40) {
        nav.style.cssText = `width: ${document.body.clientWidth}px; position: fixed;`
        nav.classList.add('sticky')
      } else {
        nav.classList.remove('sticky')
        nav.style.cssText = ''
      }
    })
  }
  handleSubmit(event) {}
  componentWillUnmount() {
    this.mounted = false
  }
  render() {
    return (
      <header>
        <nav className="nav-bar">
          <NavLink className="navbar-brand" to="/">
            <img src={logo} alt="logo" className="logo" />
          </NavLink>
          <div
            className={`hamburger ${this.state.is_open ? 'close' : ''}`}
            onClick={this.toggle}
          >
            <span className="bar bar1"></span>
            <span className="bar bar2"></span>
            <span className="bar bar3"></span>
            <span className="bar bar4"></span>
          </div>
          <div
            className={`nav-bar-collapse ${
              this.state.is_open ? 'menu-show' : ''
            }`}
          >
            <div className="d-flex justify-content-center d-lg-none">
              <img src={logo} alt="logo" className="logo" />
            </div>
            {this.renderNavItems()}
            {<SearchBar />}
            {this.renderSocialNav()}
          </div>
        </nav>
      </header>
    )
  }
}
