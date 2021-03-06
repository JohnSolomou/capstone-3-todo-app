import React, { Component } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "bootstrap/dist/css/bootstrap.css";

import "../App.css";
export default class HomePage extends Component {
  render() {
    return (
      <div data-testid="home-1">
        <Header></Header>
        <section>
          <div className="text-center">
            <h2>Organize it all </h2>
            <h2> With a To Do List </h2>
            <p>
              Don't have an account?{" "}
              <a className="btn btn-primary" href="/Signup" role="button">
                Sign Up
              </a>
            </p>
            <img className="photo" src="images/todo checklist.png" alt="..." />
          </div>
        </section>
        <Footer></Footer>
      </div>
    );
  }
}
