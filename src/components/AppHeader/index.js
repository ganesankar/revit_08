import React, { Component } from "react";

import { ToastsContainer, ToastsStore } from "react-toasts";
import api from "../../utils/api";
import { GoogleLogin, GoogleLogout } from "react-google-login";

export default class AppHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseOpen: false,
      userlogin: false,
      userActivated: false,
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
        console.log("response", response);
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
    const { userActivated } = this.state;
    const { menu } = this.props;
    return (
      <nav class="border fixed split-nav">
        <div class="nav-brand">
          <h3>
            <a href="/">REVIT</a>
          </h3>
        </div>

        {userActivated ? (
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
                {menu &&
                  menu.map((m, i) => {
                    return (
                      <div key={i} className="sm-12 md-6 lg-6 col">
                        <li>
                          <a href={m.path}> {m.title}</a>
                        </li>
                      </div>
                    );
                  })}
              </ul>
            </div>
          </div>
        ) : (
          <div className="pull-right margin">
            <GoogleLogin
              clientId="157852765565-21eh7v2tvqv5r7t8fg28o6073kqt3so3.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
          </div>
        )}
      </nav>
    );
  }
}
