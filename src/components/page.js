import React, { Component } from 'react'
import axios from 'axios'
import { Col } from 'reactstrap'

export default class Page extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      content: '',
    }
    this.getData = this.getData.bind(this)
  }
  getData() {
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/wp/v2/pages?slug=${this.props.match.params.slug}`
      )
      .then(response => {
        if (this.mounted) {
          this.setState({
            title: response.data[0].title.rendered,
            content: response.data[0].content.rendered,
          })
        }
        this.props.hideLoading()
      })
      .catch(error => {
        console.error(error)
        this.props.redirectToError()
      })
  }
  componentDidMount() {
    this.mounted = true
    this.getData()
  }
  componentDidUpdate(prevProps) {
    if (prevProps.match.params.slug !== this.props.match.params.slug) {
      this.getData()
    }
  }
  componentWillUnmount() {
    this.mounted = false
  }
  render() {
    return (
      <Col xs={12} className="px-0">
        <h1 className="mb-5 text-center"> {this.state.title} </h1>
        <div
          className="post-content"
          dangerouslySetInnerHTML={{
            __html: this.state.content,
          }}
        ></div>
      </Col>
    )
  }
}
