import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './components/home'
import Header from './components/layout/header'
import Footer from './components/layout/footer'
import Category from './components/category'
import Post from './components/post'
import Page from './components/page'
import Author from './components/author'
import Search from './components/search'
import Error from './components/error'
import { Zoom } from 'react-preloaders'
import './assets/scss/style.scss'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      is_sticky: false,
      search: '',
    }
    this.hideLoading = this.hideLoading.bind(this)
    this.redirectToError = this.redirectToError.bind(this)
  }
  componentDidMount() {}

  hideLoading() {
    this.setState({
      loading: false,
    })
  }

  redirectToError() {
    window.location.href = '/404'
  }
  changeInput(event) {
    this.setState({
      search: event.target.value,
    })
  }

  render() {
    return (
      <React.Fragment>
        <Router>
          <Header />
          <div className="container-fluid pb-5">
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <Home
                    {...props}
                    hideLoading={this.hideLoading}
                    redirectToError={this.redirectToError}
                  />
                )}
              />
              <Route
                path="/category/:slug/:page"
                render={props => (
                  <Category
                    {...props}
                    hideLoading={this.hideLoading}
                    redirectToError={this.redirectToError}
                  />
                )}
              />
              <Route
                path="/author/:slug/:page"
                render={props => (
                  <Author
                    {...props}
                    hideLoading={this.hideLoading}
                    redirectToError={this.redirectToError}
                  />
                )}
              />
              <Route
                path="/category/:slug"
                render={props => (
                  <Category
                    {...props}
                    hideLoading={this.hideLoading}
                    redirectToError={this.redirectToError}
                  />
                )}
              />
              <Route
                path="/author/:slug"
                render={props => (
                  <Author
                    {...props}
                    hideLoading={this.hideLoading}
                    redirectToError={this.redirectToError}
                  />
                )}
              />
              <Route
                path="/post/:slug"
                render={props => (
                  <Post
                    {...props}
                    hideLoading={this.hideLoading}
                    redirectToError={this.redirectToError}
                  />
                )}
              />
              <Route
                path="/search"
                render={props => (
                  <Search
                    {...props}
                    hideLoading={this.hideLoading}
                    redirectToError={this.redirectToError}
                  />
                )}
              />
              <Route
                exact
                path="/404"
                render={props => (
                  <Error
                    {...props}
                    hideLoading={this.hideLoading}
                    redirectToError={this.redirectToError}
                  />
                )}
              />
              <Route
                exact
                path="/:slug"
                render={props => (
                  <Page
                    {...props}
                    hideLoading={this.hideLoading}
                    redirectToError={this.redirectToError}
                  />
                )}
              />
              <Route
                path="*"
                render={props => (
                  <Error
                    {...props}
                    hideLoading={this.hideLoading}
                    redirectToError={this.redirectToError}
                  />
                )}
              />
            </Switch>
          </div>
        </Router>
        <Footer />
        <Zoom color={'#8c03fc'} time={800} customLoading={this.state.loading} />
      </React.Fragment>
    )
  }
}
