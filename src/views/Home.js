import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import { Container, NavItem, Nav } from "reactstrap";
export default class Home extends Component {
  state = {
    todos: [],
    showMenu: false
  };
  componentDidMount() {
    // Fetch all todos
  }

  render() {
    return (
      <div className="app">
        <div className="full-page lock-page">
          <div className="content">
            <div className="container">
              <div className="ml-auto mr-auto col-md-6 col-lg-4">
                <div className="card-lock card-white text-center card">
                  <div className="card-header"></div>
                  <div className="card-body">
                    <h4 className="card-title"> Access Restriceted !</h4>
                  </div>
                  <div className="card-footer"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
