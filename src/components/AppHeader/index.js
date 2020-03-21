import React, { Component } from "react";
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col
} from "reactstrap";

import { ToastsContainer, ToastsStore } from "react-toasts";
import api from "../../utils/api";
import { GoogleLogin, GoogleLogout } from "react-google-login";

export default class AppHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseOpen: false,
      userlogin: false,
      userlogged: {},
      color: "navbar-transparent",
      left: false,
      sessionUser: window.sessionStorage.getItem("revitGoogleID") || ""
    };
  }
  componentDidMount() {
    // attach event listeners
    // window.sessionStorage.setItem("revitGoogleID", googleData.googleID);
    //window.sessionStorage.getItem('revitUserID')
    const alreadylogged = window.sessionStorage.getItem("revitGoogleID") || "";

    window.addEventListener("scroll", this.changeColor);
  }
  componentWillUnmount() {
    // remove event listeners
    window.removeEventListener("scroll", this.changeColor);
  }

  getrecordId = todo => {
    if (!todo.ref) {
      return null;
    }
    return todo.ref["@ref"].id;
  };
  updateUserLogin = data => {
    this.setState({
      userlogin: true,
      userlogged: data
    });
  };
  changeColor = () => {
    if (
      document.documentElement.scrollTop > 99 ||
      document.body.scrollTop > 99
    ) {
      this.setState({
        color: "bg-info"
      });
    } else if (
      document.documentElement.scrollTop < 100 ||
      document.body.scrollTop < 100
    ) {
      this.setState({
        color: "navbar-transparent"
      });
    }
  };
  toggleCollapse = () => {
    document.documentElement.classList.toggle("nav-open");
    this.setState({
      collapseOpen: !this.state.collapseOpen
    });
  };

  responseGoogle = response => {
    console.log(response);
    let googleData;
    googleData = {
      googleID: response.profileObj.googleId,
      email: response.profileObj.email,
      password: "",
      username: response.profileObj.name,
      firstname: response.profileObj.givenName,
      lastname: response.profileObj.familyName,
      avatar: response.profileObj.imageUrl,
      accesstoken: response.accessToken,
      lastlogin: new Date().getTime() * 10000,
      total: 0
    };
    this.setState({
      userlogin: true,
      userlogged: googleData
    });

    api
      .createSession(googleData)
      .then(response => {
        const returnId = this.getrecordId(response);
        if (returnId) {
          window.sessionStorage.setItem("revituserID", returnId);
          window.sessionStorage.setItem("revitGoogleID", googleData.googleID);
        }
        ToastsStore.success(`User Login Updated!`);
      })
      .catch(e => {
        console.log("An API error occurred", e);
        ToastsStore.error(`User Login Update Failed!`);
      });
    console.log(googleData);
  };

  logout = () => {
    this.setState({
      userlogin: false,
      userlogged: {}
    });
  };
  render() {
    return (
      <nav class="border fixed split-nav">
        <div class="nav-brand">
          <h3>
            <a href="/#">REVIT</a>
          </h3>
        </div>
        <div class="collapsible">
          <input id="collapsible1" type="checkbox" name="collapsible1" />
          <button>
            <label for="collapsible1">
              <div class="bar1"></div>
              <div class="bar2"></div>
              <div class="bar3"></div>
            </label>
          </button>
          <div class="collapsible-body">
            <ul class="inline">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/students">students</a>
              </li>
              <li>
                <a href="/staffs">staffs</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
