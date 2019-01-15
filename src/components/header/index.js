import React from 'react';
import Link, { navigateTo } from 'gatsby-link';
// eslint-disable-next-line no-unused-vars
import bootstrap from 'bootstrap';

export const handleSubmit = (event) => {
  event.preventDefault();
  navigateTo('/search');
  event.target.reset();
};

const Header = ({ children, handleSearch }) => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container">
      <Link className="navbar-brand" to="/">
        {children}
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div
          className="navbar-nav mr-auto"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
        >
          <Link className="nav-item nav-link" to="/activities">
            Activities
          </Link>
          <Link className="nav-item nav-link" to="/faq">
            FAQ
          </Link>
          <Link className="nav-item nav-link" to="/contact">
            Contact
          </Link>
        </div>
        <form onSubmit={handleSubmit} className="form-inline">
          <input
            onChange={handleSearch}
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button
            className="btn btn-outline-primary my-2 my-sm-0"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  </nav>
);

export default Header;
