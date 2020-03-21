import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AppHeader from "./components/AppHeader";
import "./App.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import Home from "./views/Home";
import Students from "./views/Students";
import Student from "./views/Student";
import Staffs from "./views/Staffs";
import Articles from "./views/Articles";
import Calendar from "./views/Calendar";
import Session from "./views/Session";

export default class App extends Component {
  state = {
    showMenu: false,
    routes: [
      {
        path: "/",
        title: "Home",
        loginReq: false,
        loginActive: false,
        component: Home,
        id: 3
      },
      {
        path: "/Students",
        title: "Students",
        loginReq: true,
        loginActive: true,
        component: Students,
        id: 5
      },
      {
        path: "/Staffs",
        title: "Staffs",
        loginReq: true,
        loginActive: true,
        component: Staffs,
        id: 7
      },
      {
        path: "/Articles",
        title: "Articles",
        loginReq: true,
        loginActive: true,
        component: Articles,
        id: 9
      },
      {
        path: "/Calendar",
        title: "Calendar",
        loginReq: true,
        loginActive: true,
        component: Calendar,
        id: 33
      }
    ]
  };
  componentDidMount() {
    // Fetch all todos
  }

  render() {
    return (
      <div className="app bgrgreen">
        <AppHeader menu={this.state.routes} />

        <BrowserRouter>
          <div className="landing-page ">
            <div className=" wrapper">
              <div className="main-panel">
                <Switch>
                  {this.state.routes.map(route => (
                    <Route
                      key={route.id}
                      path={route.path}
                      exact
                      component={route.component}
                    />
                  ))}
                </Switch>
              </div>
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
