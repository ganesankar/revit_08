import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import ContentEditable from './components/ContentEditable'
import AppHeader from './components/AppHeader'
import SettingsMenu from './components/SettingsMenu'
import SettingsIcon from './components/SettingsIcon'
import api from './utils/api'
import sortByDate from './utils/sortByDate'
import isLocalHost from './utils/isLocalHost'
import './App.css'


import Home from "./views/Home";
import Students from "./views/Students";

export default class App extends Component {
  state = {
    todos: [],
    showMenu: false
  }
  componentDidMount() {
    // Fetch all todos
   
  }
  
  
  render() {
    return (
      <div className='app'>

        <AppHeader />

        <BrowserRouter>
          <div className="landing-page ">
          <div className=" wrapper">
            <div className="main-panel">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/students" component={Students} />
              </Switch>
            </div>
           
          </div>
          </div>
        </BrowserRouter>
        
      </div>
    )
  }
}

function removeOptimisticTodo(todos) {
  // return all 'real' todos
  return todos.filter((todo) => {
    return todo.ref
  })
}

function getTodoId(todo) {
  if (!todo.ref) {
    return null
  }
  return todo.ref['@ref'].id
}
