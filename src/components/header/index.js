import React from 'react'
import Link from 'gatsby-link'

import './_header.scss'

const Header = ({ children }) => (
  <header className="header">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="header-content">
            <span className="header-logo">
              <Link to="/">{children}</Link>
            </span>
            <nav className="header-nav">
              <ul className="header-nav-list">
                <li className="header-nav-list-item">
                  <Link to="/activities">Activities</Link>
                </li>
                <li className="header-nav-list-item">
                  <Link to="/faq">FAQ</Link>
                </li>
                <li className="header-nav-list-item">
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </header>
)

export default Header
