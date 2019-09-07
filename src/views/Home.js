import React, { Component } from 'react' 
import { NavLink } from "react-router-dom";
import GoogleLogin from 'react-google-login';
import ContentEditable from './../components/ContentEditable'
import SettingsMenu from './../components/SettingsMenu'
import SettingsIcon from './../components/SettingsIcon'
import api from './../utils/api'
import sortByDate from './../utils/sortByDate'
import isLocalHost from './../utils/isLocalHost'

import { Container ,NavItem,
  
  Nav,} from "reactstrap";
export default class Home extends Component {
  state = {
    todos: [],
    showMenu: false
  }
  componentDidMount() {
    // Fetch all todos
    
  }

   responseGoogle = (response) => {
    let googleData;
    googleData = {
      googleID: response.profileObj.googleId,
      email: response.profileObj.email,
      password: "",
      username: response.profileObj.name,
      firstname: response.profileObj.givenName,
      lastname: response.profileObj.familyName,
      avatar: response.profileObj.imageUrl,
      accesstoken: response.accessToken
    };
    console.log(googleData);
  }
  
  
 
  
  render() {
    return (
      <div className='app'>
			<Container>
          <div className="content-center brand">
            <h1 className="h1-seo">REVIT 2008</h1>
            <h3 className="d-none d-sm-block">
            JJCET 2008 IT BATCH COMMUNITY
            </h3>
            <GoogleLogin
    clientId="157852765565-21eh7v2tvqv5r7t8fg28o6073kqt3so3.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={this.responseGoogle}
    onFailure={this.responseGoogle}
    cookiePolicy={'single_host_origin'}
  />
			  <Nav className="nav-pills-info nav-pills-icons" pills>
                <NavItem>
                  <NavLink               
                    className="nav-link"
                    to='/students' >
                  
                    <i className="tim-icons icon-atom" />
                    Students
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className="nav-link"
                   to='/staffs'
                  >
                    <i className="tim-icons icon-chat-33" />
                    Staffs
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                     to='/events' className="nav-link"
                  >
                    <i className="tim-icons icon-settings-gear-63" />
                    Events
                  </NavLink>
                </NavItem>
				  <NavItem>
                  <NavLink
                     to='/links' className="nav-link"
                  >
                    <i className="tim-icons icon-settings-gear-63" />
                    Links
                  </NavLink>
                </NavItem>
              </Nav>
          </div>
        </Container>

       
       
      </div>
    )
  }
}

