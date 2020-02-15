import React, { Component } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

export default class Categories extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categoryLinks: [],
    }
  }

  componentDidMount() {
    this.mounted = true
  }
  shouldComponentUpdate(nextProps) {
    if (this.props.cat !== nextProps.cat) {
      let catlinks = []
      nextProps.cat.map(id => {
        axios
          .get(`${process.env.REACT_APP_API_BASE_URL}/wp/v2/categories/${id}`)
          .then(response => {
            catlinks.push(
              <NavLink
                key={id}
                className="mr-2"
                to={`/category/${response.data.slug}`}
              >
                {response.data.name}
              </NavLink>
            )
            if (this.mounted) {
              this.setState({ categoryLinks: catlinks })
            }
          })
          .catch(error => {
            console.log(error)
          })
        return catlinks
      })
    }
    return true
  }

  componentWillUnmount() {
    this.mounted = false
  }
  renderCategories() {
    let links = this.state.categoryLinks.map(link => {
      return link
    })

    return links
  }
  render() {
    return <span className="nav-link">Category: {this.renderCategories()}</span>
  }
}
