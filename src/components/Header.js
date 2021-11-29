// Our <Header> component also render different links depending on the authenticated state.

// src/component/Header.js
import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../services/firebase";
import "bootstrap/dist/css/bootstrap.css";
function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <Link className="navbar-brand m-2" to="/">
          HomePage
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
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavAltMarkup"
        >
          {auth.currentUser ? (
            <div className="navbar-nav">
              <Link className="nav-item nav-link" to="/profile">
                To Do List
              </Link>
              <button
                className=" btn-outline-dark "
                onClick={() => auth.signOut()}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="navbar-nav">
              <Link className="nav-item nav-link" to="/login">
                Sign In
              </Link>
              <Link className="nav-item nav-link" to="/signup">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;