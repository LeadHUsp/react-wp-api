import React, { Component } from 'react'
import { Pagination, PaginationItem } from 'reactstrap'
import { NavLink } from 'react-router-dom'

export default class Paginator extends Component {
  renderPrevButton() {
    if (this.props.page === 1) {
      return (
        <PaginationItem disabled>
          <NavLink className="page-link" aria-label="Previous" to="#">
            <span aria-hidden="true">&lsaquo;</span>
          </NavLink>
        </PaginationItem>
      )
    } else {
      let href = `/${this.props.slug}/${
        this.props.page * 1 - 1 !== 1 ? this.props.page * 1 - 1 : ''
      }`
      return (
        <PaginationItem>
          <NavLink className="page-link" aria-label="Previous" to={href}>
            <span aria-hidden="true">&lsaquo;</span>
          </NavLink>
        </PaginationItem>
      )
    }
  }
  renderNextButton() {
    if (this.props.page === this.props.total_pages) {
      return (
        <PaginationItem disabled>
          <NavLink className="page-link" aria-label="Next" to="#">
            <span aria-hidden="true">&rsaquo;</span>
          </NavLink>
        </PaginationItem>
      )
    } else {
      let href = `/${this.props.slug}/${this.props.page * 1 + 1}/`
      return (
        <PaginationItem>
          <NavLink className="page-link" aria-label="Next" to={href}>
            <span aria-hidden="true">&rsaquo;</span>
          </NavLink>
        </PaginationItem>
      )
    }
  }
  renderFirstButton() {
    if (this.props.page === 1) {
      return (
        <PaginationItem disabled>
          <NavLink className="page-link" aria-label="First" to="#">
            <span aria-hidden="true">&laquo;</span>
          </NavLink>
        </PaginationItem>
      )
    } else {
      let href = `/${this.props.slug}/`
      return (
        <PaginationItem>
          <NavLink className="page-link" aria-label="First" to={href}>
            <span aria-hidden="true">&laquo;</span>
          </NavLink>
        </PaginationItem>
      )
    }
  }
  renderLastButton() {
    if (this.props.page === this.props.total_pages) {
      return (
        <PaginationItem disabled>
          <NavLink className="page-link" aria-label="Last" to="#">
            <span aria-hidden="true"> &raquo;</span>
          </NavLink>
        </PaginationItem>
      )
    } else {
      let href = `/${this.props.slug}/${this.props.total_pages}`
      return (
        <PaginationItem>
          <NavLink className="page-link" aria-label="Last" to={href}>
            <span aria-hidden="true"> &raquo;</span>
          </NavLink>
        </PaginationItem>
      )
    }
  }
  rendersPageNumbers() {
    let pages = []
    if (this.props.page > 1 && this.props.page < this.props.total_pages) {
      pages = [this.props.page - 1, this.props.page, this.props.page * 1 + 1]
    } else if (
      this.props.page === this.props.total_pages &&
      this.props.total_pages > 2
    ) {
      pages = [this.props.page - 2, this.props.page - 1, this.props.page]
    } else if (this.props.page === 1 && this.props.total_pages > 2) {
      pages = [
        this.props.page,
        this.props.page * 1 + 1,
        this.props.page * 1 + 2,
      ]
    } else if (
      this.props.page === this.props.total_pages &&
      this.props.page !== 1
    ) {
      pages = [this.props.page - 1, this.props.page]
    } else if (this.props.total_pages <= 2) {
      pages = [this.props.page, this.props.page * 1 + 1]
    }
    let pageNumbers = pages.map(num => {
      let href = `/${this.props.slug}/${num !== 1 ? num : ''}`
      let active = num === this.props.page ? 'active' : ''
      return (
        <PaginationItem key={num} className={active}>
          <NavLink className="page-link" to={href}>
            {num}
          </NavLink>
        </PaginationItem>
      )
    })
    return pageNumbers
  }
  render() {
    return (
      <Pagination aria-label="Page navigation example">
        {this.renderFirstButton()}
        {this.renderPrevButton()}
        {this.rendersPageNumbers()}
        {this.renderNextButton()}
        {this.renderLastButton()}
      </Pagination>
    )
  }
}
