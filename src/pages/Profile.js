// src/pages/Profile.js
import React, { Component } from "react";
import Header2 from "../components/Header2";
import Footer from "../components/Footer";
import firestore from "../firebase-config";
import { getAuth } from "firebase/auth";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: getAuth().currentUser,
      notes: [],
      content: "",
      note: {},
      name: "",
      location: "",
      date: new Date(),
      list: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.submitData = this.submitData.bind(this);
    this.updateDoc = this.updateDoc.bind(this);
    this.DeleteDoc = this.DeleteDoc.bind(this);
    this.getList = this.getList.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.currentTarget;
    console.log("name, value +++", name, value);
    if (name === "name") {
      this.setState({ name: value });
    } else if (name === "location") {
      this.setState({ location: value });
    }
    //  else if (name === "date") {
    //   this.setState({ date: value });
    // }
    console.log("========", e);
  }

  async submitData(e) {
    e.preventDefault();
    await firestore
      .collection("user")
      .add({
        name: this.state.name,
        location: this.state.location,
        date: this.state.date,
      })
      .then((docRef) => {
        console.log("data added +++", docRef);
      })
      .catch((e) => console.log("add error", e));
    this.getList();
  }
  handleDateChange(date) {
    console.log(date);
    this.setState({ date: date });
  }

  updateDoc(e, id) {
    e.preventDefault();
    firestore.doc(`user/${id}`).update({
      name: this.state.name,
      location: this.state.location,
      date: this.state.date,
    });
    this.getList();
  }
  DeleteDoc(e, id) {
    e.preventDefault();
    firestore.doc(`user/${id}`).delete({
      name: this.state.name,
      location: this.state.location,
      date: this.state.date,
    });
    this.getList();
  }

  getOnlyDate(dateVal) {
    let res = dateVal;
    console.log("=========", dateVal);
    let tempArr = dateVal.split(",");
    if (tempArr.length > 1) {
      res = tempArr[0];
    }

    return res;
  }

  getList() {
    let list = [];

    let today = new Date();

    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    let todayStart = today.setHours(0, 0, 0, 0);
    // let todayd = todayStart.toLocaleString();
    let tomorrowStart = tomorrow.setHours(0, 0, 0, 0);

    firestore
      .collection("user")
      .get()
      .then((snapshot) => {
        console.log("snapshot +++", snapshot);
        snapshot.docs.forEach((doc) => {
          console.log("user data doc +++", doc.id, doc.data());

          let data = doc.data();
          let data_id = doc.id;

          console.log(data.date.seconds);
          let dataDate = new Date(data.date.seconds * 1000);
          let fireStoreDate = dataDate.getTime();
          console.log(dataDate.toLocaleString());
          if (fireStoreDate >= todayStart && fireStoreDate < tomorrowStart) {
            list.push({
              id: data_id,
              name: data.name,
              location: data.location,
              date: this.getOnlyDate(dataDate.toLocaleString()),
            });
          }
        });

        console.log("result of list");
        console.log(list);

        this.setState({
          notes: [...list],
        });
      });
  }

  componentDidMount() {
    this.getList();
  }

  render() {
    return (
      <div className="todo-list  ">
        <Header2></Header2>

        <div>
          Login in as: <strong>{this.state.user.email}</strong>
        </div>
        <div className="row">
          <input
            required
            type="text"
            name="name"
            id="name"
            placeholder="add a todo "
            onChange={(e) => this.handleChange(e)}
          />
          <input
            required
            type="text"
            name="location"
            id="location"
            placeholder="add location "
            onChange={(e) => this.handleChange(e)}
          />
          <DatePicker
            selected={this.state.date}
            onChange={(date) => this.handleDateChange(date)}
          ></DatePicker>
        </div>
        <div className="row">
          <button
            className="btn btn-success"
            type="button"
            onClick={(e) => this.submitData(e)}
          >
            Add to list
          </button>
        </div>
        <div className="row ">
          {this.state.notes.length &&
            this.state.notes.map((user) => {
              return (
                <div class="card todo-list color" key={this.state.notes.id}>
                  <div class="card-body">
                    <h5 class="card-title"> To Do Item</h5>

                    <input type="checkbox" className="" />
                    <p class="card-text">To Do: {user?.name}</p>

                    <p class="card-text">Location: {user?.location}</p>

                    <p class="card-text">Date:{user?.date}</p>
                  </div>

                  <div d-grid gap-2 d-md-flex justify-content-md-end>
                    <button
                      type="button"
                      className="  justify-content-center btn-primary me-md-2"
                      onClick={(e) => this.updateDoc(e, user.id)}
                    >
                      Update
                    </button>
                    <button
                      justify-content-center
                      type="button"
                      className=" btn-danger "
                      onClick={(e) => this.DeleteDoc(e, user.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
        <Footer></Footer>
      </div>
    );
  }
}
