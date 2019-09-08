import React, { Component } from "react";
import UserItemCard from "./../components/item/userItemCard";
import api from "./../utils/api";
import isLocalHost from "./../utils/isLocalHost";

export default class Student extends Component {
  state = {    
    student: {}
  };
  componentDidMount() {
    // Fetch all todos
	  const uid = this.props.match.params.sid;
	  console.log('uid', uid);
    api.readStudent(uid).then(replists => {
      if (replists.message === "unauthorized") {
        if (isLocalHost()) {
          alert(
            "FaunaDB key is not unauthorized. Make sure you set it in terminal session where you ran `npm start`. Visit http://bit.ly/set-fauna-key for more info"
          );
        } else {
          alert(
            "FaunaDB key is not unauthorized. Verify the key `FAUNADB_SERVER_SECRET` set in Netlify enviroment variables is correct"
          );
        }
        return false;
      }

      console.log("student response", replists);
      this.setState({
        student: replists.data 
      });
    });
  }
  render() {
    return (
      <div className="app">
        <div className="container">
          <UserItemCard
           
           student={this.state.student}
          />
      </div></div>
    );
  }
}




