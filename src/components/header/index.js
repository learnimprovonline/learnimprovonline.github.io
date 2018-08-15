import React from 'react'
import Link from 'gatsby-link'

import './_header.scss'

const Header = ({ children }) => (
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <Link className="navbar-brand" to="/">{children}</Link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <Link className="nav-item nav-link" to="/activities">Activities</Link>
          <Link className="nav-item nav-link" to="/faq">FAQ</Link>
          <Link className="nav-item nav-link" to="/contact">Contact</Link>
        </div>
      </div>
    </div>
  </nav>
)

export default Header
