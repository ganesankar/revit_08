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
        <Container>
          <div className="content-center brand">
            <h1 className="h1-seo">REVIT 2008</h1>
            <h3 className="d-none d-sm-block">JJCET 2008 IT BATCH COMMUNITY</h3>
            
            <Nav className="nav-pills-info nav-pills-icons" pills>
              <NavItem>
                <NavLink className="nav-link" to="/students">
                  <i className="tim-icons icon-atom" />
                  Students
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/staffs">
                  <i className="tim-icons icon-chat-33" />
                  Staffs
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/events" className="nav-link">
                  <i className="tim-icons icon-settings-gear-63" />
                  Events
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/links" className="nav-link">
                  <i className="tim-icons icon-settings-gear-63" />
                  Links
                </NavLink>
              </NavItem>
            </Nav>
          </div>
        </Container>
      </div>
    );
  }
}
