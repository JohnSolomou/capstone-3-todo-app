// src/pages/Login.js
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { signin } from "../helpers/auth";
import "../App.css";
export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      email: "",
      password: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ error: "" });
    try {
      await signin(this.state.email, this.state.password);
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  render() {
    return (
      <div id="login" data-testid="login-1">
        <Header></Header>
        {/* <h3 class="text-center text-white pt-5">Login form</h3> */}
        <div className="container">
          <div
            id="login-row"
            class="row justify-content-center align-items-center"
          >
            <div id="login-column" class="col-md-6">
              <div id="login-box" class="col-md-12">
                <form
                  id="login-form"
                  className="form "
                  autoComplete="off"
                  onSubmit={this.handleSubmit}
                >
                  <h1>
                    Login to To Do List
                    {/* <Link className="title" to="/"> </Link> */}
                  </h1>
                  <p className="lead">
                    Fill in the form below to login to your account.
                  </p>
                  <div className="form-group ">
                    <input
                      className="form-control"
                      placeholder="Email"
                      name="email"
                      type="email"
                      onChange={this.handleChange}
                      value={this.state.email}
                    ></input>
                  </div>
                  <div className="form-group">
                    <input
                      className="form-control"
                      placeholder="Password"
                      name="password"
                      onChange={this.handleChange}
                      value={this.state.password}
                      type="password"
                    ></input>
                  </div>
                  <div className="form-group">
                    {this.state.error ? (
                      <p className="text-danger">{this.state.error}</p>
                    ) : null}
                    <button className="btn btn-primary rounded-pill px-5">
                      Login
                    </button>
                  </div>
                  <hr></hr>
                  <p>
                    Don't have an account? <Link to="/signup">Sign up</Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
