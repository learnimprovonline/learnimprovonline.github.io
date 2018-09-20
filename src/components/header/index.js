import React from 'react'
import Link from 'gatsby-link'
// eslint-disable-next-line no-unused-vars
import bootstrap from 'bootstrap'

const Header = ({ children, handleSearch }) => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container">
      <Link className="navbar-brand" to="/">{children}</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav mr-auto">
          <Link className="nav-item nav-link" to="/activities">Activities</Link>
          <Link className="nav-item nav-link" to="/faq">FAQ</Link>
          <Link className="nav-item nav-link" to="/contact">Contact</Link>
        </div>
        <form className="form-inline">
          <input
            onChange={handleSearch}
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <Link className="btn btn-outline-primary my-2 my-sm-0" to="/search">Search</Link>
        </form>
      </div>
    </div>
  </nav>
)

export default Header
