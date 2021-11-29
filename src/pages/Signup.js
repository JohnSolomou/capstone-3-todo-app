import React, { Component } from "react";
import { Link } from "react-router-dom";
import { signup } from "../helpers/auth";
import Header from "../components/Header";
import "../App.css";
export default class SignUp extends Component {
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
      await signup(this.state.email, this.state.password);
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  render() {
    return (
      <div id="login">
        <Header></Header>
        {/* <h3 class="text-center text-white pt-5">Sign up form</h3> */}
        <div className="container">
          <div
            id="login-row"
            class="row justify-content-center align-items-center"
          >
            <div id="login-column" class="col-md-6">
              <div id="login-box" class="col-md-12">
                <form
                  id="login-form"
                  className="form"
                  autoComplete="off"
                  onSubmit={this.handleSubmit}
                >
                  <h1>
                    Sign Up to To Do List
                    {/* <Link className="title" to="/">
                      {" "}
                    </Link> */}
                  </h1>
                  <p className="lead">
                    Fill in the form below to create an account.
                  </p>
                  <div className="form-group">
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
                      Sign up
                    </button>
                  </div>
                  <hr></hr>
                  <p>
                    Already have an account? <Link to="/login">Login</Link>
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
