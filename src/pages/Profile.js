// src/pages/Profile.js
import React, { Component } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { auth, firestore } from "../services/firebase";
import "bootstrap/dist/css/bootstrap.css";

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: auth.currentUser,
      notes: [],
      content: "",
      note: {},
      name: "",
      location: "",
      date: "",
      list: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitData = this.submitData.bind(this);
    this.updateDoc = this.updateDoc.bind(this);
    this.DeleteDoc = this.DeleteDoc.bind(this);
    this.getList = this.getList.bind(this);
    // this.createNote = this.createNote.bind(this);
    // this.editNote = this.editNote.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.currentTarget;
    console.log("name, value +++", name, value);
    if (name === "name") {
      this.setState({ name: value });
    } else if (name === "location") {
      this.setState({ location: value });
    } else if (name === "date") {
      this.setState({ date: value });
    }
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
  getList() {
    let list = [];

    //
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
    }
    let date = today.getDate();
    if (date < 10) {
      date = "0" + date;
    }

    let strToday = month + "" + date + "" + year;

    // result means 11272021

    firestore
      .collection("user")
      .where("date", "==", strToday)
      .get()
      .then((snapshot) => {
        console.log("snapshot +++", snapshot);
        snapshot.docs.forEach((doc) => {
          console.log("user data doc +++", doc.id, doc.data());

          let data = doc.data();
          let data_id = doc.id;
          list.push({
            id: data_id,
            name: data.name,
            location: data.location,
            date: data.date,
          });
        });

        console.log("result of list");
        console.log(list);
        // snapshot.forEach((doc) => {
        //   console.log("user data doc +++", doc.id, doc.data());

        //   let data = doc.data();
        //   let data_id = doc.id;
        //   list.push({
        //     id: data_id,
        //     name: data.name,
        //     location: data.location,
        //     date: data.date,
        //   });
        // });

        // in react it is good than other
        // this.setState{
        //   notes: list
        // }
        this.setState({
          notes: [...list],
        });
        // this.setState({ notes: list });
      });
  }

  componentDidMount() {
    this.getList();

    // update
    // firestore.doc("user/{docId}").update({ name: 'updatedValue});
  }
  // getPickup() {
  //   const db = firebase.database();
  //   const events = db.child("events");
  //   const query = events.orderByChild("name");

  //   query.on("value", (snap) => {
  //     //render data to html
  //   });
  // }

  render() {
    return (
      <div className="todo-list">
        <Header></Header>
        {/* {this.state.notes.map((note) => {
          return <div key={note.note_id}>{note.content}</div>;
        })} */}
        {/* // I cannot hear you well so could you type on zoom chat? HERE IS
        EXAMPLE OF LIST
        {this.state.notes.map((note, index) => {
          return (
            <div key={index}>
              {note.location}
              <br />
              {note.name}
              <br />
              {note.date}
            </div>
          );
        })} */}
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
          <input
            required
            type="text"
            name="date"
            id="date"
            placeholder="add date "
            onChange={(e) => this.handleChange(e)}
          />
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
                <>
                  <div>
                    <p className="todo-item">
                      <input type="checkbox" className="" />
                      <p>To Do: {user?.name}</p>

                      <p>Location: {user?.location}</p>

                      <p>Date:{user?.date}</p>
                    </p>
                  </div>
                  <div d-grid gap-2 d-md-flex justify-content-md-end>
                    <button
                      type="button"
                      className="  btn-primary me-md-2"
                      onClick={(e) => this.updateDoc(e, user.id)}
                    >
                      update
                    </button>
                    <button
                      type="button"
                      className=" btn-danger "
                      onClick={(e) => this.DeleteDoc(e, user.id)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              );
            })}
        </div>
        <Footer></Footer>
      </div>
    );
  }
}
