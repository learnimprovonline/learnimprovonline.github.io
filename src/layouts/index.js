import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql } from 'graphql'
import Header from '../components/header'
import Footer from '../components/footer'

import '../../sass/style.scss'
import './_layouts.scss'

class TemplateWrapper extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchTerm: '',
    }

    this.handleSearch = this.handleSearch.bind(this)
  }

  handleSearch(event) {
    const searchTerm = event.target.value
    this.setState({ searchTerm })
  }

  render() {
    const { children, data } = this.props

    return (
      <Fragment>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: data.site.siteMetadata.description },
            { name: 'keywords', content: data.site.siteMetadata.keywords },
          ]}
        />
        <Header handleSearch={this.handleSearch}>{data.site.siteMetadata.title}</Header>
        <div className="body-content-height">
          {children({ ...this.props, ...this.state })}
        </div>
        <Footer />
      </Fragment>
    )
  }
}

TemplateWrapper.propTypes = {
  children: PropTypes.func,
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        keywords: PropTypes.string,
      }),
    }),
  }),
}

export default TemplateWrapper

export const query = graphql`
  query HeaderQuery {
    site {
      siteMetadata {
        title
        description
        keywords
      }
    }
  }
`
