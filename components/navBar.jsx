import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = ({ user = '' }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">
        Vidly
      </a>
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
        <div className="navbar-nav">
          <a className="nav-item nav-link" href="/movies">
            Movies
          </a>

          <a className="nav-item nav-link" href="/customers">
            Customers
          </a>

          <a className="nav-item nav-link" href="/rentals">
            Rentals
          </a>
          {!user && (
            <React.Fragment>
              <a className="nav-item nav-link" href="/login">
                Login
              </a>
              <a className="nav-item nav-link" href="/register">
                Register
              </a>
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              <a className="nav-item nav-link" href="/profile">
                {user.name}
              </a>
              <a className="nav-item nav-link" href="/logout">
                Logout
              </a>
            </React.Fragment>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
