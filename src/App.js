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
    showMenu: false
  };
  componentDidMount() {
    // Fetch all todos
  }

  render() {
    return (
      <div className="app bgrgreen">
        <AppHeader />

        <BrowserRouter>
          <div className="landing-page ">
            <div className=" wrapper">
              <div className="main-panel">
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/students" component={Students} />
                  <Route exact path="/student/:sid" component={Student} />
                  <Route exact path="/staffs" component={Staffs} />
                  <Route exact path="/calendar" component={Calendar} />
                  <Route exact path="/articles" component={Articles} />
                  <Route exact path="/userlogged" component={Session} />
                </Switch>
              </div>
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
