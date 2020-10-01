import React from 'react';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <Link
              to="/"
              className="nav-link active"
              id="home-tab"
              data-toggle="tab"
              href="#home"
              role="tab"
              aria-controls="home"
              aria-selected="true"
            >
              Home
            </Link>
          </li>
          <li className="nav-item" role="presentation">
            <Link
              to="/about"
              className="nav-link"
              id="profile-tab"
              data-toggle="tab"
              href="#profile"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
            >
              About
            </Link>
          </li>
          <li className="nav-item" role="presentation">
            <Link
              to="/contact"
              className="nav-link"
              id="contact-tab"
              data-toggle="tab"
              href="#contact"
              role="tab"
              aria-controls="contact"
              aria-selected="false"
            >
              Contact
            </Link>
          </li>
        </ul>
      </React.Fragment>
    );
  }
}

export default Navbar;
