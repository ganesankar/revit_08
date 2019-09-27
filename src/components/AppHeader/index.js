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
      sessionUser : window.sessionStorage.getItem('revitGoogleID') || '' 

    };
  }
  componentDidMount() {
    // attach event listeners
    // window.sessionStorage.setItem("revitGoogleID", googleData.googleID);
    //window.sessionStorage.getItem('revitUserID')
    const alreadylogged = window.sessionStorage.getItem('revitGoogleID') || '' ;
    
   
    
    window.addEventListener("scroll", this.changeColor);
  }
  componentWillUnmount() {
    // remove event listeners
    window.removeEventListener("scroll", this.changeColor);
  }
  
  getrecordId = (todo) => {
    if (!todo.ref) {
      return null;
    }
    return todo.ref["@ref"].id;
  };
  updateUserLogin = (data) => {
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
      lastlogin : new Date().getTime() * 10000,
      total:0
    };
    this.setState({
      userlogin: true,
      userlogged: googleData
    });
   
    api
        .createSession(googleData)
        .then(response => {
          const returnId = this.getrecordId(response);
          if(returnId){
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
      <Navbar
        className={"fixed-top " + this.state.color}
        color-on-scroll="100"
        expand="lg"
      >
        <Container>
          <div className="navbar-translate">
            <NavbarBrand
              data-placement="bottom"
              to="/"
              rel="noopener noreferrer"
              title=""
            >
              <span>REVIT </span>
            </NavbarBrand>

            <button
              aria-expanded={this.state.collapseOpen}
              className="navbar-toggler navbar-toggler"
              onClick={this.toggleCollapse}
            >
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>
          </div>
          <Collapse
            className={"justify-content-end " + this.state.collapseOut}
            navbar
            isOpen={this.state.collapseOpen}
            onExiting={this.onCollapseExiting}
            onExited={this.onCollapseExited}
          >
            <div className="navbar-collapse-header">
              <Row>
                <Col className="collapse-brand" xs="6">
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    REVIT
                  </a>
                </Col>
                <Col className="collapse-close text-right" xs="6">
                  <button
                    aria-expanded={this.state.collapseOpen}
                    className="navbar-toggler"
                    onClick={this.toggleCollapse}
                  >
                    <i className="fa fa-times" aria-hidden="true"></i>
                  </button>
                </Col>
              </Row>
            </div>
            <Nav navbar>
              <NavItem className="p-0">
                <NavLink href="/">
                  <p className="">Home</p>
                </NavLink>
              </NavItem>{" "}
              <NavItem className="p-0">
                <NavLink href="/students">
                  <p className="">Students</p>
                </NavLink>
              </NavItem>
              <NavItem className="p-0">
                <NavLink href="/staffs">
                  <p className="">Staffs</p>
                </NavLink>
              </NavItem>
              <NavItem className="p-0">
                <NavLink href="/calendar">
                  <p className="">Events</p>
                </NavLink>
              </NavItem>
              <NavItem className="p-0">
                <NavLink href="/articles">
                  <p className="">Posts</p>
                </NavLink>
              </NavItem>
              <NavItem className="p-0">
                {this.state.userlogin ? (
                  <GoogleLogout
                    clientId="157852765565-21eh7v2tvqv5r7t8fg28o6073kqt3so3.apps.googleusercontent.com"
                    buttonText="Logout"
                    onLogoutSuccess={this.logout}
                    disabledStyle={true}
                    className="btn-neutral btn btn-default logoutBtn"
                  >
                    {" "}
                    {this.state.userlogged.username} | Logout
                  </GoogleLogout>
                ) : (
                  <GoogleLogin
                    clientId="157852765565-21eh7v2tvqv5r7t8fg28o6073kqt3so3.apps.googleusercontent.com"
                    buttonText="Login"
                    className="btn-neutral btn btn-default logoutBtn"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                    disabledStyle={true}
                    cookiePolicy={"single_host_origin"}
                  />
                )}
              </NavItem>
            </Nav>
          </Collapse>
          <div className="float-right"></div>
        </Container>
      </Navbar>
    );
  }
}
