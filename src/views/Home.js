import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import { Container, NavItem, Nav } from "reactstrap";
import GrpIcon from "../components/common/icons/GrpIcon.js";
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
          <div className="content-center text-center ">
            <h1 className="h1-seo">
              <GrpIcon width={64} />
              {" REVIT '08 "}
            </h1>
            <h3 className="d-none d-sm-block">JJCET 2008 IT BATCH COMMUNITY</h3>
            <p>
              <blockquote>
                Welcome to the this mini alumni kind of portal. <br />
                We would look forward to your continued interaction and
                association to help improve more activity here.
              </blockquote>
            </p>

            <Nav className="row flex-center child-borders" pills>
              <NavLink className="paper-btn margin" to="/students">
                <i className="tim-icons icon-atom" />
                Students
              </NavLink>
              <NavLink className="paper-btn margin" to="/staffs">
                <i className="tim-icons icon-chat-33" />
                Staffs
              </NavLink>
              <NavLink to="/events" className="paper-btn margin">
                <i className="tim-icons icon-settings-gear-63" />
                Events
              </NavLink>
              <NavLink to="/links" className="paper-btn margin">
                <i className="tim-icons icon-settings-gear-63" />
                Links
              </NavLink>
            </Nav>
          </div>
        </Container>
      </div>
    );
  }
}
