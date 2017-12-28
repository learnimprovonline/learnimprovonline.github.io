import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import Header from '../components/header'

import './index.css'

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet
      title="Learn Improv Online"
      meta={[
        { name: 'description', content: 'Free improv warm-ups and exercises with high-quality written descriptions, animated instructionals, and video examples. Start learning now!' },
        { name: 'keywords', content: 'improv, learn improv, learn improv online' },
      ]}
    />
    <Header>
      Learn Improv Online
    </Header>
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '0px 1.0875rem 1.45rem',
        paddingTop: 0,
      }}
    >
      {children()}
    </div>
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
